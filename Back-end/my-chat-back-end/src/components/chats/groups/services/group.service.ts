import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AddOrRemoveUsersDto } from 'src/components/chats/groups/DTO/add-users.dto';
import { CreateGroupDto } from 'src/components/chats/groups/DTO/create-group.dto';
import { Groups } from 'src/schemas/chats/groups/groups.schema';
import { union, difference } from 'lodash';
import { UsersService } from 'src/components/users/services/user.service';
import { Users } from 'src/schemas/users/users.schema';

@Injectable()
export class GroupService {
    constructor(
        private usersServices: UsersService,
        @InjectModel(Groups.name) private groupsModel: Model<Groups>,
        @InjectModel(Users.name) private usersModel: Model<Users>
    ) {

    }

    async getGroupsOfUser(username: string) {
        const user = await this.usersServices.getUserByUserName(username);

        const userGroups = await this.groupsModel.find({
            membersList: {
                $in: [
                    user._id,
                ]
            }
        }).exec();
        if (!userGroups.length) throw new NotFoundException(`Failed: Couldn't find DMs of user: ${user.username}.`);

        return userGroups;
    }

    async getUsersInGroup(groupId: Types.ObjectId) {
        const group = await this.checkGroupExistence(groupId);

        return group.membersList;
    }

    async createGroup(createGroupDto: CreateGroupDto) {
        const newGroup = new this.groupsModel(createGroupDto);
        return await newGroup.save();
    }

    async addUsersToGroup(groupId: Types.ObjectId, addUsersDto: AddOrRemoveUsersDto) {
        const group = await this.checkGroupExistence(groupId);
        const membersList = await this.getValidUsers(addUsersDto.membersList);

        group.membersList = union(group.membersList, membersList);
        await group.save();
    }

    async removeUserFromGroup(groupId: Types.ObjectId, removeUserDto: AddOrRemoveUsersDto) {
        const group = await this.checkGroupExistence(groupId);
        const membersList = await this.getValidUsers(removeUserDto.membersList);

        group.membersList = difference(group.membersList, membersList);
        return await group.save();
    }

    private async checkGroupExistence(groupId: Types.ObjectId) {
        const group = await this.groupsModel.findById({ groupId }).exec();
        if (!group) throw new NotFoundException(`Invalid Group Id: Group with Id: ${groupId} was not found!`);

        return group;
    }

    private async getValidUsers(membersList: Types.ObjectId[]) {
        const ActiveMembersList = await this.usersServices.getUsers(membersList);

        const userIds = ActiveMembersList.map(user => user._id);
        const userNames = ActiveMembersList.map(user => user.username);

        const foundUsernames = new Set(userNames);
        const notFound = ActiveMembersList.filter(user => !foundUsernames.has(user.username));
        if (notFound.length) throw new BadRequestException(`Users not found: ${notFound.join(', ')}`);

        return ActiveMembersList;
    }
}
