import { Messages } from 'src/schemas/messages/messages.schema';

export class ChatRo {
    _id: string;
    chatType: string;
    membersList: string[];
    messages: Messages[];
    createAt: Date;
}

