import { Controller, Get } from '@nestjs/common';
import { GroupService } from 'src/groups/services/group/group.service';

@Controller('group')
export class GroupController {
    constructor(private groupService: GroupService) { }


}
