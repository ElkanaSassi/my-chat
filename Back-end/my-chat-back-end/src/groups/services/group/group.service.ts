import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddUsersDto } from 'src/groups/DTO/add-users.dto';
import { CreateGroupDto } from 'src/groups/DTO/create-group.dto';
import { Groups } from 'src/schemas/groups/groups.schema';
import { union } from 'lodash';

@Injectable()
export class GroupService {
    constructor(
        @InjectModel(Groups.name) private groupsModel: Model<Groups>
    ) {

    }

    getGroupsOfUser(username: string) {
        return this.groupsModel.find({ username }).exec();
    }

    createGroup(createGroupDto: CreateGroupDto) {
        return new this.groupsModel(createGroupDto);
    }

    async addUsersToGroup(addUsersDto: AddUsersDto) {
        const { groupId, usersList } = addUsersDto;

        const group = await this.groupsModel.findById(groupId);
        if (!group) throw new NotFoundException(`Invalid Id: Group with Id: ${groupId} was not found!`);

        // TODO: add check for each user if exsit.

        group.usersList = union(group.usersList, usersList);
        return await group.save();
    }
}
