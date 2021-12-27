import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import {Config} from "./Config/Config";
import {MailService} from "./Mail/MailService";
import {MailController} from "./Mail/MailController";
import {MailControllerBuilder} from "./Mail/MailControllerBuilder";

async function init(){
    const appSettings = Config.getConfig().getSettings();
    const mailInstance =await MailControllerBuilder.build(appSettings);
    await mailInstance.getLists()
    const mails = mailInstance.emails
}
init();

