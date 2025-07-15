import { Module } from '@nestjs/common';
import { DmsController } from './controllers/dms.controller';
import { DmsService } from './services/dms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dms, DmsSchema } from 'src/schemas/chats/dms/dms.schema';
import { MessagesModule } from '../messages/messages.module';
import { MessagesServices } from '../messages/services/messages.service';
import { UsersService } from 'src/components/users/services/user/user.service';
import { DmsGateway } from './dms.gateway';
import { UsersModule } from '../chats.module';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Dms.name,
            schema: DmsSchema,
        }]),
        UsersModule,
        MessagesModule
    ],
    providers: [DmsService, MessagesServices, UsersService, DmsGateway],
    controllers: [DmsController],
})
export class DmsModule {

}