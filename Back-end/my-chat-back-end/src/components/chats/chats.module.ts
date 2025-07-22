import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chats, ChatsSchema } from 'src/schemas/chats/chats.schema';
import { Dms, DmsSchema } from 'src/schemas/chats/dms/dms.schema';
import { Groups, GroupsSchema } from 'src/schemas/chats/groups/groups.schema';
import { MessagesModule } from './messages/messages.module';
import { ChatsGateway } from './chats.gateway';
import { DmsModule } from './dms/dms.module';
import { GroupsModule } from './groups/groups.module';



@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Chats.name,
                schema: ChatsSchema,
                discriminators: [
                    { name: Dms.name, schema: DmsSchema },
                    { name: Groups.name, schema: GroupsSchema },
                ],
            },
        ]),
        MessagesModule,
        forwardRef(() => DmsModule),
        forwardRef(() => GroupsModule),
    ],
    providers: [ChatsGateway],
    controllers: [],
    exports: [MongooseModule]
})
export class ChatsModule { }
