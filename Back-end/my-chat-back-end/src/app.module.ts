import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './components/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupsModule } from './components/chats/groups/groups.module';

@Module({
  imports: [
    UsersModule,
    GroupsModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/nest'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
