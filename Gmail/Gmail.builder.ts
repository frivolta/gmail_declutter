import {GmailSetup} from "./Gmail.setup";
import {GmailService} from "./Gmail.service";

export class GmailBuilder{
    public static async build(){
        const gmailService = new GmailService();
        await gmailService.setCredentials();
        gmailService.setGmail();
        return gmailService;
    }
}