import { forwardRef, Module } from '@nestjs/common';

import { DmsController } from './controllers/dms.controller';
import { DmsService } from './services/dms.service';

import { MessagesModule } from '../messages/messages.module';
import { UsersModule } from '../../users/users.module';
import { ChatsModule } from '../chats.module';

@Module({
    imports: [
        UsersModule,
        forwardRef(() => ChatsModule),
        MessagesModule
    ],
    providers: [DmsService],
    controllers: [DmsController],
    exports: [DmsService]
})
export class DmsModule {

}