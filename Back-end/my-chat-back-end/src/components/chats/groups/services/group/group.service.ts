import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddAndRemoveUsersDto } from 'src/components/chats/groups/DTO/add-users.dto';
import { CreateGroupDto } from 'src/components/chats/groups/DTO/create-group.dto';
import { Groups } from 'src/schemas/groups/groups.schema';
import { union, difference } from 'lodash';

@Injectable()
export class GroupService {
    constructor(
        @InjectModel(Groups.name) private groupsModel: Model<Groups>
    ) {

    }

    getGroupsOfUser(username: string) {
        return this.groupsModel.find({ username }).exec();
    }

    getUserInGroup(groupId: number) {
        const group = this.checkGroupId(groupId).then.arguments;

        return group.usersList;
    }   

    createGroup(createGroupDto: CreateGroupDto) {
        return new this.groupsModel(createGroupDto);
    }

    async addUsersToGroup(addUsersDto: AddAndRemoveUsersDto) {
        const { groupId, usersList } = addUsersDto;

        const group = this.checkGroupId(groupId).then.arguments;

        // TODO: add check for each user if exsit.

        group.usersList = union(group.usersList, usersList);
        return await group.save();
    }

    async removeUserFromGroup(removeUserDto: AddAndRemoveUsersDto) {
        const { groupId, usersList } = removeUserDto;

        const group = this.checkGroupId(groupId).then.arguments;

        // TODO: add check for each user if exists.

        group.usersList = difference(group.usersList, usersList);
        return await group.save();
    }

    private async checkGroupId(groupId: number): Promise<Groups> {
        const group = await this.groupsModel.findById(groupId);
        if (!group) throw new NotFoundException(`Invalid Id: Group with Id: ${groupId} was not found!`);

        return group;
    }
}
