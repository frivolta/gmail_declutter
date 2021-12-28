import {GmailSetup} from "./Gmail.setup";
import {gmail_v1} from "googleapis";

export class GmailService extends GmailSetup {
    constructor() {
        super();
    }

    /**
     * Get emails
     */
    public async getGmailEmails(): Promise<gmail_v1.Schema$Message[]> {
        try {
            if (!this.gmail) {
                throw new Error("[GMAIL_SERVICE]>>>Email settings not valid")
            }
            const res = await this.gmail.users.messages.list({userId: "me"})
            return res?.data?.messages ? res.data.messages : [];
        } catch (e) {
            throw new Error("[GMAIL_SERVICE]>>>Unable to get GmailEmails")
        }
    }

    /**
     * Get single email header
     * @param id
     */
    public async getGmailEmail(id: string) {
        try {
            if (!this.gmail) {
                throw new Error("[GMAIL_SERVICE]>>>Email settings not valid")
            }
            const res = await this.gmail.users.messages.get({
                userId: "me",
                id
            })
            return res.data.payload?.headers ? res.data.payload.headers : null
        } catch (e) {
            throw new Error("[GMAIL_SERVICE]>>>Unable to get GmailEmail")
        }
    }
}