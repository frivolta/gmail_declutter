export  class Mail {
    public unsubscribeLink: string;
    public fromEmailAndAuthor: string;

    constructor(unsubscribeLink: string, fromEmailAndAuthor:string) {
        this.unsubscribeLink = unsubscribeLink;
        this.fromEmailAndAuthor = fromEmailAndAuthor;
    }
}