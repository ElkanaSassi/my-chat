
export class CreateGroupDto {
    membersList: string[];
    groupName: string;
    admin: string;
    description?: string;
}