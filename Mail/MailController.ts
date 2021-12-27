import {MailService} from "./MailService";
import {Mail} from "./Mail";

export class MailController {
    private mailService: MailService;
    public emails: Map<string, Mail> = new Map();

    constructor(mailService:MailService) {
        this.mailService = mailService
    }

    public async getLists(){
        const emails = await this.getEmails();
        emails.forEach(async (email)=>{
            if(email.id){
                const mail = await this.getEmail(email.id)
                if(mail instanceof Mail) {
                    this.emails.set(email.id, mail)
                }
            }
        })
    }

    getEmails(){
        return this.mailService.getEmails()
    }

    getEmail(id:string){
        return this.mailService.getEmail(id)
    }

}