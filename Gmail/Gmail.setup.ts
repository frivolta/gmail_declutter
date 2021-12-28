import {Config} from "../Config/Config";
import {Settings} from "../Config/Settings.interface/Settings.interface";
import {gmail_v1, google} from "googleapis";
import fs from "fs";
import Gmail = gmail_v1.Gmail;

export class GmailSetup {
    private settings: Settings
    private oAuth2Client:any;
    public gmail?: Gmail;

    constructor() {
        this.settings = Config.getConfig().getSettings();
    }

    /**
     * Authorization Section
     */
    private async authorize() {
        try {
            this.oAuth2Client = new google.auth.OAuth2(this.settings.CLIENT_ID, this.settings.CLIENT_SECRET, JSON.parse(this.settings.REDIRECT_URIS)[0])
            console.info("[GMAIL_SETUP]>>AuthClient built");
        } catch (e) {
            console.error("[GMAIL_SETUP]>>Authorization failed", e)
        }
    }

    public setGmail() {
        this.gmail = google.gmail({version: 'v1', auth: this.oAuth2Client})
        return this.gmail
    }

    public async setCredentials() {
        try {
            await this.authorize();
            if (!this.oAuth2Client) {
                console.error("[GMAIL_SETUP]>>Cannot setting token, oAuth2Client not defined")
                return;
            }
            console.info("[GMAIL_SETUP]>>Setting token to client")
            const token = await this.getToken();
            console.info("[GMAIL_SETUP]>>Got token")
            this.oAuth2Client.setCredentials(token)
        } catch (e) {
            throw new Error("[GMAIL_SETUP]>>Unable to retrieve token: " + e)
        }
    }

    private getToken() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.settings.TOKEN_PATH, (err, token: any) => {
                err ? reject(err) : resolve(JSON.parse(token))
            })
        })
    }
}