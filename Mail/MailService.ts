import fs from 'fs';
import {Settings} from "../Settings/Settings.interface";
import {chat_v1, gmail_v1, google, healthcare_v1alpha2} from "googleapis";
import path from "path";
import {Mail} from "./Mail";
import Gmail = gmail_v1.Gmail;
import { GaxiosResponse } from 'gaxios';
import Schema$MessagePartHeader = gmail_v1.Schema$MessagePartHeader;


interface RawHeader {
    name: string;
    value: string;
}

export interface EmailIds {
    id: string;
    threadId: string;
}

interface EmailResponse {
    data: { messages: EmailIds[] }
}

export class MailService {
    public oAuth2Client: any;
    public gmail?: Gmail
    private readonly TOKEN_PATH = path.resolve(__dirname, "token.json");
    private readonly settings: Settings;

    //@ToDo: Generate new token

    public constructor(settings: Settings) {
        this.settings = settings;
        this.authorize();
    }

    public async setCredentials() {
        try {
            if (!this.oAuth2Client) {
                console.error("[MAIL]>>Cannot setting token, oAuth2Client not defined")
                return;
            }
            console.info("[MAIL]>>Setting token to client")
            const token = await this.getToken();
            console.info("[MAIL]>>Got token", token)
            this.oAuth2Client.setCredentials(token)
        } catch (e) {
            throw new Error("[MAIL]>>Unable to retrieve token: " + e)
        }
    }

    public setGmail() {
        this.gmail = google.gmail({version: 'v1', auth: this.oAuth2Client})
        return this.gmail
    }

    /**
     * Get emails and returns an array of emails ids
     */

    public async getEmails(): Promise<gmail_v1.Schema$Message[]> {
        if (!this.gmail) {
            throw new Error("Email settings not valid")
        }
        try {
            const res = await this.gmail.users.messages.list({
                userId: 'me'
            })
            if(!res.data.messages){
                return []
            }
            return res.data.messages
        }catch{
            throw new Error("Couldn't get your emails")
        }
    }

    public async getEmail(id: string) {
        if (!this.gmail) {
            throw new Error("Email settings not valid")
        }
        try{
            const headers = await this.gmail.users.messages.get({
                userId: "me",
                id
            })
            return headers?.data?.payload?.headers ? this.mailFromHeader(headers.data.payload.headers): new  Error("Email does not have headers");
        }catch {
            throw new  Error("Cannot get your email")
        }
    }


    /**
     * Create Mail object from headers
     * @param headers
     * @private
     */
    private mailFromHeader(headers: Schema$MessagePartHeader[]) {
        const unsubscribeLink = headers.find((h:any) => h.name === "List-Unsubscribe")
        const fromEmailAndAuthor = headers.find((h:any) => h.name === "From")
        if (!unsubscribeLink || !fromEmailAndAuthor) {
            console.info("Not a subscription email")
            return
        }
        if(unsubscribeLink.hasOwnProperty("value") && fromEmailAndAuthor.hasOwnProperty("value")) {
            return new Mail(unsubscribeLink.value || "", fromEmailAndAuthor.value || "");
        }
    }

    private authorize() {
        try {
            console.info("[MAIL]>>Starting authorization", this.settings.CLIENT_SECRET);
            this.oAuth2Client = new google.auth.OAuth2(this.settings.CLIENT_ID, this.settings.CLIENT_SECRET, JSON.parse(this.settings.REDIRECT_URIS)[0])
            console.info("[MAIL]>>", this.oAuth2Client);
        } catch (e) {
            console.error("[MAIL]>>Authorization failed")
        }
    }

    private getToken() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.TOKEN_PATH, (err, token: any) => {
                err ? reject(err) : resolve(JSON.parse(token))
            })
        })
    }


}