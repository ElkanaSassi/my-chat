import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddAndRemoveUsersDto } from 'src/components/chats/groups/DTO/add-users.dto';
import { CreateGroupDto } from 'src/components/chats/groups/DTO/create-group.dto';
import { Groups } from 'src/schemas/groups/groups.schema';
import { union, difference } from 'lodash';
import { UsersService } from 'src/components/users/services/user/user.service';
import { Users } from 'src/schemas/users/users.schema';

@Injectable()
export class GroupService {
    constructor(
        private usersServices: UsersService,
        @InjectModel(Groups.name) private groupsModel: Model<Groups>,
        @InjectModel(Users.name) private usersModel: Model<Users>
    ) {

    }

    getGroupsOfUser(username: string) {
        return this.groupsModel.find({ username }).exec();
    }

    getUserInGroup(groupId: number) {
        const group = this.checkGroupExistence(groupId).then.arguments;

        return group.usersList;
    }

    async createGroup(createGroupDto: CreateGroupDto) {
        const newGroup = new this.groupsModel(createGroupDto);
        return await newGroup.save();
    }

    async addUsersToGroup(addUsersDto: AddAndRemoveUsersDto) {
        const { groupId, usersList } = addUsersDto;

        const group = await this.checkGroupExistence(groupId);
        const membersList = await this.getValidUsers(usersList);

        group.membersList = union(group.membersList, membersList);
        await group.save();
    }

    async removeUserFromGroup(removeUserDto: AddAndRemoveUsersDto) {
        const { groupId, usersList } = removeUserDto;

        const group = await this.checkGroupExistence(groupId).then.arguments;
        const membersList = await this.getValidUsers(usersList);

        group.membersList = difference(group.membersList, membersList);
        return await group.save();
    }

    private async checkGroupExistence(groupId: number) {
        const group = await this.groupsModel.findOne({ groupId });
        if (!group) throw new NotFoundException(`Invalid Group Id: Group with Id: ${groupId} was not found!`);

        return group;
    }
    
    private async getValidUsers(usersList: string[]) {
        const membersList = await this.usersServices.getUsers(usersList);

        const userIds = membersList.map(user => user._id);
        const userNames = membersList.map(user => user.username);

        const foundUsernames = new Set(userNames);
        const notFound = membersList.filter(user => !foundUsernames.has(user.username));
        if (notFound.length) throw new BadRequestException(`Users not found: ${notFound.join(', ')}`);

        return membersList;
    }
}
