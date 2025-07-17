import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DmsService } from '../services/dms.service';
import { Types } from 'mongoose';
import { CreateDmDto } from '../../../../dtos/dms/create-dm.dto';
import { Dms } from 'src/schemas/chats/dms/dms.schema';

@Controller('dms')
export class DmsController {
    constructor(private dmsServies: DmsService) { }

    @Post()
    public createDm(@Body() createDmDto: CreateDmDto): Promise<Dms> {
        return this.dmsServies.createDm(createDmDto);
    }

    @Get(':username')
    public getUserDms(@Param('username') username: string): Promise<Dms[]> {
        return this.dmsServies.getUserDms(username);
    }

    @Get(':dmId')
    public getDmMessages(@Param() dmId: Types.ObjectId): Promise<Dms> {
        return this.dmsServies.getDmMessages(dmId);
    }

    @Delete(':username/:dmId')
    public deleteUserDm(@Param('username') userId: Types.ObjectId, @Param('dmId') dmId: Types.ObjectId)
        : Promise<Dms> {
        return this.dmsServies.deleteUserDm(userId, dmId);
    }

}
