import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import {GmailBuilder} from "./Gmail/Gmail.builder";
import {MailController} from "./Mail/Mail.controller";
import {MailListStructure} from "./MailList/MailList.structure";
import {UnsubscribeController} from "./Unsubscribe/Unsubscribe.controller";



async function init(){
    const gmailService = await GmailBuilder.build();
    const mailController = new MailController(gmailService);
    const unsubscribe = new UnsubscribeController();

    // Listens for mail list generated
    mailController.on("list-generated", (mailList:MailListStructure)=>{
        unsubscribe.generateCSVFromList(mailList);
    })

    // Generate list
    await mailController.generateMailsList();

}


init().then(()=>{
    console.log("main completed")
});

