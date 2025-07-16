import { forwardRef, Module } from '@nestjs/common';
import { DmsController } from './controllers/dms.controller';
import { DmsService } from './services/dms.service';
import { MessagesModule } from '../messages/messages.module';
import { DmsGateway } from './dms.gateway';
import { UsersModule } from '../../users/users.module';
import { ChatsModule } from '../chats.module';

@Module({
    imports: [
        // MongooseModule.forFeature([{
        //     name: Dms.name,
        //     schema: DmsSchema,
        // }]),
        UsersModule,
        forwardRef(() => ChatsModule),
        MessagesModule
    ],
    providers: [DmsService, DmsGateway],
    controllers: [DmsController],
    exports: [DmsService]
})
export class DmsModule {

}