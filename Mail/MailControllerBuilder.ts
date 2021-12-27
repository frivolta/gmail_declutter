import {MailService} from "./MailService";
import {Settings} from "../Settings/Settings.interface";
import {MailController} from "./MailController";

export class MailControllerBuilder {
    public static async build(appSettings:Settings): Promise<MailController>{
        const mailService = new MailService(appSettings)
        await mailService.setCredentials()
        mailService.setGmail()
        return new MailController(mailService)
    }
}