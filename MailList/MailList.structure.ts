import {Mail} from "../Mail/Mail";

//type ParsedList =

export class MailListStructure {
    private mailsList: Map<string, Mail> = new Map();

    public add(from:string, mail:Mail){
        if(!this.mailsList.has(from)){
            this.mailsList.set(from, mail);
        }
    }

    public getList(){
        return this.mailsList;
    }

    public getMails(){
       const mails: Mail[] = Array.from(this.mailsList).map(([key, value])=>{
           return value
        })
        return mails;
    }

}