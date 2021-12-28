import {Settings} from "./Settings.interface/Settings.interface";
import * as dotenv from "dotenv";

export class Config {
    private static config: Config
    private settings: Settings = {CLIENT_ID: "", CLIENT_SECRET: "", REDIRECT_URIS: "", TOKEN_PATH: ""}

    private constructor() {
        dotenv.config();
        this.setup();
    }

    private setup(): void {
        if (process.env.CLIENT_SECRET && process.env.CLIENT_ID && process.env.REDIRECT_URIS && process.env.TOKEN_PATH) {
            console.log("[CONFIG]>>Getting config")
            this.settings.CLIENT_SECRET = process.env.CLIENT_SECRET;
            this.settings.CLIENT_ID = process.env.CLIENT_ID;
            this.settings.REDIRECT_URIS = process.env.REDIRECT_URIS;
            this.settings.TOKEN_PATH = process.env.TOKEN_PATH
        }else{
            console.log("[CONFIG]>>Invalid .env file")
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