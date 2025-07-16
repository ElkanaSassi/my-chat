import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Groups, GroupsSchema } from 'src/schemas/chats/groups/groups.schema';
import { GroupService } from './services/group.service';
import { GroupController } from './controllers/group.controller';
import { UsersService } from 'src/components/users/services/user.service';
import { UsersModule } from 'src/components/users/users.module';
import { GroupsGateway } from './groups.gateway';
import { MessagesServices } from '../messages/services/messages.service';
import { MessagesModule } from '../messages/messages.module';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Groups.name,
            schema: GroupsSchema,
        }]),
        UsersModule,
        MessagesModule
    ],
    providers: [GroupService, UsersService, MessagesServices, GroupsGateway],
    controllers: [GroupController],
    exports: [GroupService]
})
export class GroupsModule { }
