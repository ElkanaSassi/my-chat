import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/schemas/users.schema';
import { CreateUserDto } from '../DTO/create-user.dto';
import { userFriend, UserFriendSchema } from 'src/schemas/userFriend.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private usersModel: Model<Users>,
        @InjectModel(userFriend.name) private userFriendModel: Model<userFriend>
    ) {

    }

    getAllUsers() {
        return
    }

    createUser(createUserDto: CreateUserDto) {
        const newUser = new this.usersModel(createUserDto);
        return newUser.save();
    }

    updateUserByName(username: string, updateUserDto: Partial<CreateUserDto>) {
        return this.usersModel.findByIdAndUpdate(username, updateUserDto);
    }

    addNewFriendByUserName(username: string) {
        // TODO: need a connction here to the userFriend schema...
        
        throw new HttpException('Faild: doesn\'t have conncation yet to the userFriend Shcema', HttpStatus.BAD_REQUEST);
    }
}
