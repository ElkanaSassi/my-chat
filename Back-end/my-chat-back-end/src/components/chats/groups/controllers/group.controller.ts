import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Types } from 'mongoose';
import { AddOrRemoveUsersDto } from 'src/dtos/groups/add-users.dto';
import { CreateGroupDto } from 'src/dtos/groups/create-group.dto';
import { GroupService } from 'src/components/chats/groups/services/group.service';
import { Groups } from 'src/schemas/chats/groups/groups.schema';
import { Users } from 'src/schemas/users/users.schema';

@Controller('group')
export class GroupController {
    constructor(private groupService: GroupService) { }

    @Get(':userId')
    public getUserGroups(@Param('userId') userId: string): Promise<Groups[]> {
        return this.groupService.getUserGroups(new Types.ObjectId(userId));
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
