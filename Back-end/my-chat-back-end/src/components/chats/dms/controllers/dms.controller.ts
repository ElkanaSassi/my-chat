import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Types } from 'mongoose';

import { DmsService } from '../services/dms.service';

import { CreateMessageDto } from '../../../../common/models/dto/messages/create-message.dto';
import { CreateDmDto } from '../../../../common/models/dto/dms/create-dm.dto';
import { MessagesRo } from 'src/common/models/ro/messages/messages.ro';
import { DmRo } from 'src/common/models/ro/dms/dms.ro';

import { Dms } from 'src/schemas/chats/dms/dms.schema';


@Controller('dms')
export class DmsController {
    constructor(private dmsServies: DmsService) { }

    @Post()
    public createDm(@Body() createDmDto: CreateDmDto): Promise<DmRo> {
        return this.dmsServies.createDm(createDmDto);
    }

    @Get(':username')
    public getUserDms(@Param('username') username: string): Promise<DmRo[]> {
        return this.dmsServies.getUserDms(username);
    }

    @Post('messages/:dmId')
    public createMessage(@Param('dmId') dmId: string , @Body() createMessageDto: CreateMessageDto): Promise <MessagesRo> {
        return this.dmsServies.createMessage(new Types.ObjectId(dmId), createMessageDto);
    }

    @Get('messages/:dmId')
    public getDmMessages(@Param('dmId') dmId: string): Promise<MessagesRo> {
        return this.dmsServies.getDmMessages(new Types.ObjectId(dmId));
    }

    @Delete(':userId/:dmId')
    public deleteUserDm(@Param('userId') userId: Types.ObjectId, @Param('dmId') dmId: Types.ObjectId)
        : Promise<Dms> {
        return this.dmsServies.deleteUserDm(userId, dmId);
    }

}
