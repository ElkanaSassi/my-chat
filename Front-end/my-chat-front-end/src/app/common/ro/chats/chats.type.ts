import { Messages } from '../messages/messages.ro';

export class ChatRo {
    _id: string;
    chatType: string;
    membersList: string[];
    messages: Messages[];
    createAt: Date;
}

