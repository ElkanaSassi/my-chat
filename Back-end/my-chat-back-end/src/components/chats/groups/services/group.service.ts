import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { UsersService } from 'src/components/users/services/user.service';

import { AddOrRemoveUsersDto } from '../../../../common/models/dto/groups/add-users.dto';
import { CreateGroupDto } from '../../../../common/models/dto/groups/create-group.dto';
import { CreateMessageDto } from '../../../../common/models/dto/messages/create-message.dto';
import { GroupRo } from 'src/common/models/ro/groups/groups.ro';
import { MessagesRo } from 'src/common/models/ro/messages/messages.ro';

import { Groups } from 'src/schemas/chats/groups/groups.schema';
import { Messages } from 'src/schemas/messages/messages.schema';
import { Users } from 'src/schemas/users/users.schema';
import { Chats } from 'src/schemas/chats/chats.schema';


@Injectable()
export class GroupService {
    private groupsModel: Model<Groups>;

    constructor(
        private usersServices: UsersService,
        @InjectModel(Chats.name) private readonly chatsModel: Model<Chats>,
    ) {
        const groupsModel = this.chatsModel.discriminators?.Groups;

        this.groupsModel = groupsModel as Model<Groups>;
    }

    public async getUserGroups(username: string): Promise<GroupRo[]> {
        const user = await this.usersServices.getUserByUserName(username);

        const userGroups = await this.groupsModel.find({
            membersList: { $in: [user._id] }
        }).exec();

        if (userGroups.length === 0) {
            throw new NotFoundException(`Failed: Couldn't find GroupsS of user: ${user.username}.`);
        }

        return Promise.all(userGroups.map(async userGroup => await this.buildGroupRo(userGroup)));
    }

    public async getUsersInGroup(groupId: Types.ObjectId): Promise<string[]> {
        const group = await this.groupsModel.findById(groupId).exec();
        if (!group) {
            throw new NotFoundException(`Invalid Group Id: Group with Id: ${groupId} was not found!`);
        }
        const groupMembers = await Promise.all(
            group.membersList.map(
                async (m) => (await this.usersServices.getUserById(m)).username
            )
        );
        return groupMembers;
    }

    public async createGroup(createGroupDto: CreateGroupDto): Promise<GroupRo> {
        const membersList = await this.getValidUsers(createGroupDto.membersList);

        const groupComplete = {
            createdAt: Date.now(),
            groupName: createGroupDto.groupName,
            admin: createGroupDto.admin,
            description: createGroupDto.description ? createGroupDto.description : "",
            membersList: membersList,
            chatType: Groups.name,
        }

        const newGroup = new this.groupsModel(groupComplete);
        await newGroup.save();

        return this.buildGroupRo(newGroup);
    }

    public async createMessage(groupId: Types.ObjectId, createMessageDto: CreateMessageDto): Promise<MessagesRo> {
        const group = await this.groupsModel.findById(groupId).exec();
        if (!group) {
            throw new NotFoundException(`Failed: Couldn't find Group with Id: ${groupId}`);
        }

        const completeMessage: Messages = {
            from: createMessageDto.from,
            dateTime: new Date(),
            data: createMessageDto.data,
        }

        group.messages.push(completeMessage);
        await group.save();

        const messagesRo: MessagesRo = {
            messagesList: group.messages
        }
        return messagesRo;
    }

    public async addUsersToGroup(groupId: Types.ObjectId, addUsersDto: AddOrRemoveUsersDto): Promise<GroupRo> {
        const usersToAdd = await this.getValidUsers(addUsersDto.membersList);

        const updatedGroup = await this.groupsModel.findByIdAndUpdate(
            groupId,
            { $addToSet: { membersList: { $each: usersToAdd } } },
            { new: true } // returns the updated group.
        ).exec();

        if (!updatedGroup) {
            throw new NotFoundException(`Invalid Group Id: Group with Id: ${groupId} was not found!`);
        }

        return this.buildGroupRo(updatedGroup);
    }

    public async removeUserFromGroup(groupId: Types.ObjectId, removeUserDto: AddOrRemoveUsersDto): Promise<GroupRo> {
        const usersToRemove = await this.getValidUsers(removeUserDto.membersList);

        const updatedGroup = await this.groupsModel.findByIdAndUpdate(
            groupId,
            { $pullAll: { membersList: usersToRemove } },
            { new: true } // returns the updated group.
        ).exec();

        if (!updatedGroup) {
            throw new NotFoundException(`Invalid Group Id: Group with Id: ${groupId} was not found!`);
        }

        return this.buildGroupRo(updatedGroup);
    }

    private async getValidUsers(membersList: Types.ObjectId[]): Promise<Users[]> {
        const ActiveMembersList = await this.usersServices.getUsersByIds(membersList);

        const userIds = ActiveMembersList.map(user => user._id);
        const userNames = ActiveMembersList.map(user => user.username);

        const foundUsernames = new Set(userNames);
        const notFound = ActiveMembersList.filter(user => !foundUsernames.has(user.username));
        if (notFound.length) throw new BadRequestException(`Users not found: ${notFound.join(', ')}`);

        return ActiveMembersList;
    }

    private async buildGroupRo(group: Groups & { _id: Types.ObjectId; }): Promise<GroupRo> {

        const usernames = await Promise.all(
            group.membersList.map(
                async (m) => (await this.usersServices.getUserById(m)).username
            )
        );

        const groupToReturn: GroupRo = {
            _id: group._id.toString(),
            chatType: Groups.name,
            membersList: usernames,
            messages: group.messages,
            createAt: group.createAt,
            groupName: group.groupName,
            admin: group.admin.username,
            discription: group.description
        }
        return groupToReturn;
    }

}
