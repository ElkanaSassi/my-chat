import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DmsService } from '../services/dms.service';
import { Types } from 'mongoose';
import { CreateDmDto } from '../../../../dtos/dms/create-dm.dto';
import { Dms } from 'src/schemas/chats/dms/dms.schema';
import { Messages } from 'src/schemas/messages/messages.schema';
import { CreateMessageDto } from 'src/dtos/messages/create-message.dto';

@Controller('dms')
export class DmsController {
    constructor(private dmsServies: DmsService) { }

    @Post()
    public createDm(@Body() createDmDto: CreateDmDto): Promise<Dms> {
        return this.dmsServies.createDm(createDmDto);
    }

    @Get(':username')
    public getUserDms(@Param('username') username: string): Promise<Dms[]> {
        console.log(username);
        return this.dmsServies.getUserDms(username);
    }

    @Post('messages/:dmId')
    public createMessage(@Param('dmId') dmId: string , @Body() createMessageDto: CreateMessageDto) {
        return this.dmsServies.createMessage(new Types.ObjectId(dmId), createMessageDto);
    }

    @Get('messages/:dmId')
    public getDmMessages(@Param('dmId') dmId: string): Promise<Messages[]> {
        console.log('get messages from dm log');
        return this.dmsServies.getDmMessages(new Types.ObjectId(dmId));
    }

    @Delete(':userId/:dmId')
    public deleteUserDm(@Param('userId') userId: Types.ObjectId, @Param('dmId') dmId: Types.ObjectId)
        : Promise<Dms> {
        return this.dmsServies.deleteUserDm(userId, dmId);
    }

}
