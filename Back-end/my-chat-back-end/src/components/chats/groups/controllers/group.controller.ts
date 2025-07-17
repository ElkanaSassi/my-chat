import { Body, Controller, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Types } from 'mongoose';
import { AddOrRemoveUsersDto } from 'src/dtos/groups/add-users.dto';
import { CreateGroupDto } from 'src/dtos/groups/create-group.dto';
import { GroupService } from 'src/components/chats/groups/services/group.service';

@Controller('group')
export class GroupController {
    constructor(private groupService: GroupService) { }
    
    @Get(':username')
    getGroupsOfUser(@Param('username') username: string) {
        return this.groupService.getGroupsOfUser(username);
    }

    @Get('getUsers/:groupId')
    getUsersInGroup(@Param('groupId') groupId: Types.ObjectId) {
        return this.groupService.getUsersInGroup(groupId);
    }

    @Post('newGroup')
    @UsePipes(new ValidationPipe())
    createNewGroup(@Body() createGroupDto: CreateGroupDto) {
        return this.groupService.createGroup(createGroupDto);
    }

    @Patch('addUsersToGroup')
    @UsePipes(new ValidationPipe())
    addUsersToGroup(@Param('groupId') groupId: Types.ObjectId, @Body() addUsersDto: AddOrRemoveUsersDto) {
        return this.groupService.addUsersToGroup(groupId, addUsersDto);
    }

    @Patch('removeUserFromGroup/:groupId') 
    @UsePipes(new ValidationPipe())
    removeUserFromGroup(@Param('groupId') groupId: Types.ObjectId, @Body() removeUsersDto: AddOrRemoveUsersDto) {
        return this.groupService.removeUserFromGroup(groupId, removeUsersDto);
    }
}
