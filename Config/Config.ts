import {Settings} from "../Settings/Settings.interface";
import * as dotenv from "dotenv";

export class Config {
    private static config: Config
    private settings: Settings = {CLIENT_ID: "", CLIENT_SECRET: "", REDIRECT_URIS: ""}

    private constructor() {
        dotenv.config();
        this.setup();
    }

    private setup(): void {
        if (process.env.CLIENT_SECRET && process.env.CLIENT_ID && process.env.REDIRECT_URIS) {
            console.log("Getting config")

            this.settings.CLIENT_SECRET = process.env.CLIENT_SECRET;
            this.settings.CLIENT_ID = process.env.CLIENT_ID;
            this.settings.REDIRECT_URIS = process.env.REDIRECT_URIS;
        }
    }

    public static getConfig(): Config {
        if (!this.config) {
            this.config = new Config();
            return this.config
        }
        return this.config
    }

    public getSettings(): Settings{
        return this.settings;
    }
}