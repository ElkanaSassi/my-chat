import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DmsService } from '../services/dms.service';
import { Types } from 'mongoose';
import { CreateDmDto } from '../../../../common/dto/dms/create-dm.dto';
import { Dms } from 'src/schemas/chats/dms/dms.schema';
import { Messages } from 'src/schemas/messages/messages.schema';
import { CreateMessageDto } from '../../../../common/dto/messages/create-message.dto';
import { DmRo } from 'src/common/ro/dms/dms.ro';
import { MessagesRo } from 'src/common/ro/messages/messages.ro';

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
    public createMessage(@Param('dmId') dmId: string , @Body() createMessageDto: CreateMessageDto): Promise <Messages> {
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
