import { forwardRef, Module } from '@nestjs/common';
import { GroupService } from './services/group.service';
import { GroupController } from './controllers/group.controller';
import { UsersModule } from 'src/components/users/users.module';
import { MessagesModule } from '../messages/messages.module';
import { ChatsModule } from '../chats.module';

@Module({
    imports: [
        UsersModule,
        forwardRef(() => ChatsModule),
        MessagesModule
    ],
    providers: [GroupService],
    controllers: [GroupController],
    exports: [GroupService]
})
export class GroupsModule { }
