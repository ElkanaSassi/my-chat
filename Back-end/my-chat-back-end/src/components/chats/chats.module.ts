import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chats, ChatsSchema } from 'src/schemas/chats/chats.schema';
import { DmsService } from './dms/services/dms.service';
import { GroupService } from './groups/services/group/group.service';
import { MessagesServices } from './messages/services/messages.service';
import { DmsController } from './dms/controllers/dms.controller';
import { GroupController } from './groups/controllers/group/group.controller';
import { DmsSchema } from 'src/schemas/chats/dms/dms.schema';
import { GroupsSchema } from 'src/schemas/chats/groups/groups.schema';
import { ChatsGateway } from './chats.gateway';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([{
            name: Chats.name,
            useFactory: () => {
                ChatsSchema.discriminator('dm', DmsSchema);
                ChatsSchema.discriminator('group', GroupsSchema);
                return ChatsSchema;
            }
        },])
    ],
    providers: [DmsService, GroupService, MessagesServices, ChatsGateway],
    controllers: [DmsController, GroupController],
    exports: [MongooseModule]
})
export class UsersModule { }
