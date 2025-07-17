import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DmsService } from '../services/dms.service';
import { Types } from 'mongoose';
import { CreateDmDto } from '../../../../dtos/dms/create-dm.dto';

@Controller('dms')
export class DmsController {
    constructor(private dmsServies: DmsService) { }

    @Post()
    async createDm(@Body() createDmDto: CreateDmDto) {
        return await this.dmsServies.createDm(createDmDto);
    }

    @Get(':username')
    async getUserDms(@Param('username') username: string) {
        return await this.dmsServies.getUserDms(username);
    }

    @Get(':dmId')
    async getDmMessages(@Param() dmId: Types.ObjectId) {
        return await this.dmsServies.getDmMessages(dmId);
    }

    @Delete(':username/:dmId')
    async deleteUserDm(@Param('username') userId: Types.ObjectId, @Param('dmId') dmId: Types.ObjectId) {
        return await this.dmsServies.deleteUserDm(userId, dmId);
    }

}
