import { ChatRo } from '../chats/chats.type';

export class GroupRo extends ChatRo {
    groupName: string;
    admin: string;
    discription?: string;
}
