import { Module } from '@nestjs/common';
import { UsersModule } from './components/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupsModule } from './components/chats/groups/groups.module';
import { DmsModule } from './components/chats/dms/dms.module';
import { MessagesModule } from './components/chats/messages/messages.module';
import { ChatsModule } from './components/chats/chats.module';

@Module({
  imports: [
    UsersModule,
    GroupsModule,
    DmsModule,
    MessagesModule,
    ChatsModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/nest'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
