import { Body, Controller, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddAndRemoveUsersDto } from 'src/groups/DTO/add-users.dto';
import { CreateGroupDto } from 'src/groups/DTO/create-group.dto';
import { GroupService } from 'src/groups/services/group/group.service';

@Controller('group')
export class GroupController {
    constructor(private groupService: GroupService) { }

    @Get('getUsers/:groupId')
    getUsersInGroup(@Param('groupId') groupId: number) {
        return this.groupService.getUserInGroup(groupId);
    }

    @Get(':username')
    @UsePipes(new ValidationPipe)
    getGroupsOfUser(@Param('username') username: string) {
        return this.groupService.getGroupsOfUser(username);
    }

    @Post('newGroup')
    createNewGroup(@Body() createGroupDto: CreateGroupDto) {
        return this.groupService.createGroup(createGroupDto);
    }

    @Patch('addUsersToGroup')
    addUsersToGroup(@Body() addUsersDto: AddAndRemoveUsersDto) {
        return this.groupService.addUsersToGroup(addUsersDto);
    }

    @Patch('removeUserFromGroup')
    removeUserFromGroup(@Body() removeUsersDto: AddAndRemoveUsersDto) {
        return this.groupService.removeUserFromGroup(removeUsersDto);
    }
}
