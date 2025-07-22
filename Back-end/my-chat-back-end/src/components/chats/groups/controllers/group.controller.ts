import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Types } from 'mongoose';

import { GroupService } from 'src/components/chats/groups/services/group.service';

import { AddOrRemoveUsersDto } from '../../../../common/models/dto/groups/add-users.dto';
import { CreateGroupDto } from '../../../../common/models/dto/groups/create-group.dto';
import { CreateMessageDto } from '../../../../common/models/dto/messages/create-message.dto';
import { GroupRo } from 'src/common/models/ro/groups/groups.ro';
import { MessagesRo } from 'src/common/models/ro/messages/messages.ro';

@Controller('groups')
export class GroupController {
    constructor(private groupService: GroupService) { }

    @Get(':username')
    public getUserGroups(@Param('username') username: string): Promise<GroupRo[]> {
        return this.groupService.getUserGroups(username);
    }

    @Get('getUsers/:groupId')
    public getUsersInGroup(@Param('groupId') groupId: Types.ObjectId): Promise<string[]> {
        return this.groupService.getUsersInGroup(groupId);
    }
    

    @Post()
    public createNewGroup(@Body() createGroupDto: CreateGroupDto): Promise<GroupRo> {
        return this.groupService.createGroup(createGroupDto);
    }

    @Post('messages/:groupId')
    public createMessage(@Param('groupId') groupId: string, @Body() createMessageDto: CreateMessageDto): Promise<MessagesRo> {
        return this.groupService.createMessage(new Types.ObjectId(groupId), createMessageDto);
    }

    @Patch('addUsersToGroup/:groupId')
    public addUsersToGroup(@Param('groupId') groupId: Types.ObjectId, @Body() addUsersDto: AddOrRemoveUsersDto)
        : Promise<GroupRo> {
        return this.groupService.addUsersToGroup(groupId, addUsersDto);
    }

    @Delete('removeUserFromGroup/:groupId')
    public removeUserFromGroup(@Param('groupId') groupId: Types.ObjectId, @Body() removeUsersDto: AddOrRemoveUsersDto)
        : Promise<GroupRo> {
        return this.groupService.removeUserFromGroup(groupId, removeUsersDto);
    }
}
