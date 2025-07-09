import { Body, Controller, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddUsersDto } from 'src/groups/DTO/add-users.dto';
import { CreateGroupDto } from 'src/groups/DTO/create-group.dto';
import { GroupService } from 'src/groups/services/group/group.service';

@Controller('group')
export class GroupController {
    constructor(private groupService: GroupService) { }

    @Get(':username')
    @UsePipes(new ValidationPipe)
    getGroupsOfUser(@Param('username') username: string ) {
        return this.groupService.getGroupsOfUser(username);
    }

    @Post('newGroup')
    createNewGroup(@Body() createGroupDto: CreateGroupDto) {
        return this.groupService.createGroup(createGroupDto);
    }

    @Patch()
    addUserToGroup(@Body() addUsersDto: AddUsersDto) {
        return this.groupService.addUserToGroup(addUsersDto);
    }
}
