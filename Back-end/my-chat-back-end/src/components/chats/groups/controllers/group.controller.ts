import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Types } from 'mongoose';
import { AddOrRemoveUsersDto } from 'src/dto/groups/add-users.dto';
import { CreateGroupDto } from 'src/dto/groups/create-group.dto';
import { GroupService } from 'src/components/chats/groups/services/group.service';
import { Groups } from 'src/schemas/chats/groups/groups.schema';
import { Users } from 'src/schemas/users/users.schema';
import { CreateMessageDto } from 'src/dto/messages/create-message.dto';

@Controller('groups')
export class GroupController {
    constructor(private groupService: GroupService) { }

    @Get(':username')
    public getUserGroups(@Param('username') username: string): Promise<Groups[]> {
        return this.groupService.getUserGroups(username);
    }

    @Get('getUsers/:groupId')
    public getUsersInGroup(@Param('groupId') groupId: Types.ObjectId): Promise<Users[]> {
        return this.groupService.getUsersInGroup(groupId);
    }

    @Post()
    public createNewGroup(@Body() createGroupDto: CreateGroupDto): Promise<Groups> {
        console.log('got into create group');
        return this.groupService.createGroup(createGroupDto);
    }

    @Post('messages/:groupId')
    public createMessage(@Param('groupId') groupId: string, @Body() createMessageDto: CreateMessageDto) {
        return this.groupService.createMessage(new Types.ObjectId(groupId), createMessageDto);
    }

    @Patch('addUsersToGroup/:groupId')
    public addUsersToGroup(@Param('groupId') groupId: Types.ObjectId, @Body() addUsersDto: AddOrRemoveUsersDto)
        : Promise<Groups> {
        return this.groupService.addUsersToGroup(groupId, addUsersDto);
    }

    @Delete('removeUserFromGroup/:groupId')
    public removeUserFromGroup(@Param('groupId') groupId: Types.ObjectId, @Body() removeUsersDto: AddOrRemoveUsersDto)
        : Promise<Groups> {
        return this.groupService.removeUserFromGroup(groupId, removeUsersDto);
    }
}
