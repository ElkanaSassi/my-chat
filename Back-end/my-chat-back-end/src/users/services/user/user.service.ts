import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/schemas/users/users.schema';
import { CreateUserDto } from '../../DTO/create-user.dto';
import { userFriend } from 'src/schemas/users/userFriend.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private usersModel: Model<Users>
    ) {

    }

    getAllUsers() {
        // Find all with no filter -> gets all the records stored in the DB.
        return this.usersModel.find().exec();
    }

    getUserByUserName(username: string) {
        const user = this.usersModel.findById(username);
        if(!user) throw new NotFoundException(`Invalid Username: Could't find user: ${username}.`);

        return user;
    }

    createUser(createUserDto: CreateUserDto) {
        const newUser = new this.usersModel(createUserDto);
        return newUser.save();
    }

    updateUserByUserName(username: string, updateUserDto: Partial<CreateUserDto>) {
        return this.usersModel.findByIdAndUpdate(username, updateUserDto);
    }

    removeUserByUserName(username: string) {
        return this.usersModel.deleteOne((user) => user.username === username);
        // TODO: delete this user from the userFriend schema as well.
    }


}
