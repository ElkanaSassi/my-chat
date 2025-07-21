
export class MessagesRo {
    messagesList: Messages[];
} 

export interface Messages {
    from: string;
    dateTime: Date;
    data: string;
}
