import fs from 'fs'
import {stringify} from "csv-stringify";
import {MailListStructure} from "../MailList/MailList.structure";
import EventEmitter from "events";


export class UnsubscribeController extends EventEmitter{
    public generateCSVFromList(mailList:MailListStructure){
        stringify(mailList.getMails(), {
            header: true
        }, (err, output)=>{
            fs.writeFile(`${Date.now().toString()}.csv`, output,()=>{
                console.log("[UNSUBSCRIBE]>>>File generated")
                this.emit("uns-csv-generated")
            });
        })
    }
}