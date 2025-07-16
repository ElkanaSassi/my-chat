import { forwardRef, Module } from '@nestjs/common';
import { GroupService } from './services/group.service';
import { GroupController } from './controllers/group.controller';
import { UsersModule } from 'src/components/users/users.module';
import { GroupsGateway } from './groups.gateway';
import { MessagesModule } from '../messages/messages.module';
import { ChatsModule } from '../chats.module';

@Module({
    imports: [
        // MongooseModule.forFeature([{
        //     name: Groups.name,
        //     schema: GroupsSchema,
        // }]),
        UsersModule,
        forwardRef(() => ChatsModule),
        MessagesModule
    ],
    providers: [GroupService, GroupsGateway],
    controllers: [GroupController],
    exports: [GroupService]
})
export class GroupsModule { }
