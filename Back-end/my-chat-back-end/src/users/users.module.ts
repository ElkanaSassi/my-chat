import { Module } from '@nestjs/common';
import { UsersService } from './services/user/user.service';
import { UsersController } from './controllers/user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/schemas/users/users.schema';
import { userFriend, UserFriendSchema } from 'src/schemas/users/userFriend.schema';
import { UserFriendService } from './services/user-friend/user-friend.service';
import { UserFriendController } from './controllers/user-friend/user-friend.controller';

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
  providers: [UsersService, UserFriendService],
  controllers: [UsersController, UserFriendController]
})
export class UsersModule { }
