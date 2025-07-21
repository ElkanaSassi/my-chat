import { Message } from './message.type';

export class Chat {
    _id: string;
    chatType: string;
    membersList: string[];
    messages: Message[];
    createAt: string;
}

