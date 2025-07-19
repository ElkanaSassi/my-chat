import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AddOrRemoveUsersDto } from 'src/dtos/groups/add-users.dto';
import { CreateGroupDto } from 'src/dtos/groups/create-group.dto';
import { Groups } from 'src/schemas/chats/groups/groups.schema';
import { union, difference } from 'lodash';
import { UsersService } from 'src/components/users/services/user.service';
import { Chats } from 'src/schemas/chats/chats.schema';
import { Users } from 'src/schemas/users/users.schema';

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

    public async getGroupsOfUser(userId: Types.ObjectId): Promise<Groups[]> {
        const user = await this.usersServices.getUserById(userId);

        const userGroups = await this.groupsModel.find({
            membersList: {
                $in: [
                    user._id,
                ]
            }
        }).exec();
        if (userGroups.length === 0) throw new NotFoundException(`Failed: Couldn't find GroupsS of user: ${user.username}.`);

        return userGroups;
    }

    public async getUsersInGroup(groupId: Types.ObjectId): Promise<Users[]> {
        const group = await this.groupsModel.findById(groupId).exec();
        if (!group) {
            throw new NotFoundException(`Invalid Group Id: Group with Id: ${groupId} was not found!`);
        }

        return group.membersList;
    }

    public async createGroup(createGroupDto: CreateGroupDto): Promise<Groups> {
        const newGroup = new this.groupsModel(createGroupDto);
        return newGroup.save();
    }

    public async addUsersToGroup(groupId: Types.ObjectId, addUsersDto: AddOrRemoveUsersDto): Promise<Groups> {
        const usersToAdd = await this.getValidUsers(addUsersDto.membersList);

        const updatedGroup = await this.groupsModel.findByIdAndUpdate(
            groupId,
            { $addToSet: { membersList: { $each: usersToAdd } } },
            { new: true } // returns the updated group.
        ).exec();

        if (!updatedGroup) {
            throw new NotFoundException(`Invalid Group Id: Group with Id: ${groupId} was not found!`);
        }

        return updatedGroup;
    }

    public async removeUserFromGroup(groupId: Types.ObjectId, removeUserDto: AddOrRemoveUsersDto): Promise<Groups> {
        const usersToRemove = await this.getValidUsers(removeUserDto.membersList);

        const updatedGroup = await this.groupsModel.findByIdAndUpdate(
            groupId,
            { $pullAll: { membersList: usersToRemove } },
            { new: true } // returns the updated group.
        ).exec();

        if (!updatedGroup) {
            throw new NotFoundException(`Invalid Group Id: Group with Id: ${groupId} was not found!`);
        }

        return updatedGroup;
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
}
