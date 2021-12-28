export class Mail {
    public unsubscribeLink: string
    constructor(public id:string, unsubscribeLink:string, public fromEmailAndAuthor: string) {
        this.unsubscribeLink = this.sanitazeFields(unsubscribeLink)
    }

    private sanitazeFields(unsubscribeLink:string):string{
        // Convert  '<link>, <link>'::'link'
        const firstLink = unsubscribeLink.split(",")[0]
        const sanitizedFirstLink = firstLink.replace("<", "").replace(">","")
        return sanitizedFirstLink;
    }
}