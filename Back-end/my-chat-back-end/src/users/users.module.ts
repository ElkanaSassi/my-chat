import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/schemas/users.schema';
import { userFriend, UserFriendSchema } from 'src/schemas/userFriend.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Users.name,
      schema: UsersSchema
    },
    {
      name: userFriend.name,
      schema: UserFriendSchema
    }])
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
