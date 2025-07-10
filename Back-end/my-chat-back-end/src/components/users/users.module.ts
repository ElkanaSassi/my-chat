import { Module } from '@nestjs/common';
import { UsersService } from './services/user/user.service';
import { UsersController } from './controllers/user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/schemas/users/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Users.name,
      schema: UsersSchema,
    },])
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, MongooseModule]
})
export class UsersModule { }
