import {GmailService} from "../Gmail/Gmail.service";
import {Mail} from "./Mail";
import {MailListStructure} from "../MailList/MailList.structure";
import EventEmitter from "events";

export class MailController extends EventEmitter {
    private mailsList: MailListStructure = new MailListStructure();

    constructor(private gmailService: GmailService) {
        super()
    }

    public async generateMailsList() {
        const emails = await this.gmailService.getGmailEmails();
        await Promise.all(emails.map(async ({id}) => {
            if (!id) {
                console.info("[MAIL_CONTROLLER]>>> Id not found")
                return null
            }
            const emailHeaders = await this.gmailService.getGmailEmail(id)
            if (emailHeaders) {
                const unsubscribeLink = emailHeaders.find(h => h.name === 'List-Unsubscribe')?.value
                const from = emailHeaders.find(h => h.name === "From")?.value
                if (unsubscribeLink && from) {
                    this.mailsList.add(from, new Mail(id, unsubscribeLink, from))
                }
            }
        }))
        this.emit("list-generated", this.mailsList)
        return this.mailsList;
    }

    public getMailsList() {
        return this.mailsList;
    }

}