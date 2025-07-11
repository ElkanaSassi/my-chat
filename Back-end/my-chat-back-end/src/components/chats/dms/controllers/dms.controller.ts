import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { DmsService } from '../services/dms.service';
import { Types } from 'mongoose';

@Controller('dms')
export class DmsController {
    constructor(private dmsServies: DmsService) { }

    @Get(':username')
    async getUserDms(@Param('username') username: string) {
        return await this.dmsServies.getUserDms(username);
    }

    @Delete(':username/:dmId')
    async deleteUserDm(@Param('username') username: string, @Param('dmId') dmId: Types.ObjectId ) {
        return await this.dmsServies.deleteUserDm(username, dmId);
    }

}
