import { Body, Controller, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddAndRemoveUsersDto } from 'src/components/chats/groups/DTO/add-users.dto';
import { CreateGroupDto } from 'src/components/chats/groups/DTO/create-group.dto';
import { GroupService } from 'src/components/chats/groups/services/group/group.service';

@Controller('group')
export class GroupController {
    constructor(private groupService: GroupService) { }
    
    @Get(':username')
    getGroupsOfUser(@Param('username') username: string) {
        return this.groupService.getGroupsOfUser(username);
    }

    @Get('getUsers/:groupId')
    getUsersInGroup(@Param('groupId') groupId: number) {
        return this.groupService.getUserInGroup(groupId);
    }

    @Post('newGroup')
    @UsePipes(new ValidationPipe())
    createNewGroup(@Body() createGroupDto: CreateGroupDto) {
        return this.groupService.createGroup(createGroupDto);
    }

    @Patch('addUsersToGroup')
    @UsePipes(new ValidationPipe())
    addUsersToGroup(@Body() addUsersDto: AddAndRemoveUsersDto) {
        return this.groupService.addUsersToGroup(addUsersDto);
    }

    @Patch('removeUserFromGroup') 
    @UsePipes(new ValidationPipe())
    removeUserFromGroup(@Body() removeUsersDto: AddAndRemoveUsersDto) {
        return this.groupService.removeUserFromGroup(removeUsersDto);
    }
}
