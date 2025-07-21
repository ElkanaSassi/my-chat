import { Chat } from './chat.type';

export class Group extends Chat {
    groupName: string;
    admin: string;
    discription?: string;
}
