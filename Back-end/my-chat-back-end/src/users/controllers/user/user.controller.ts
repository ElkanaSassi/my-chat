import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { UsersService } from '../../services/user/user.service';
import { CreateUserDto } from '../../DTO/create-user.dto';
import mongoose from 'mongoose';
import { CreateUserFriendDto } from '../../DTO/create-user-friend.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @Post('createUser')
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Patch('updateUser/:username')
    @UsePipes(new ValidationPipe())
    updateUserByUserName(@Param('username') username: string, @Body() updateUser: Partial<CreateUserDto>) {
        const isValid = mongoose.Types.ObjectId.isValid(username);
        if (!isValid) throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);

        return this.usersService.updateUserByUserName(username, updateUser);
    }

    @Delete('removeUser/:username')
    removeUserByUserName(@Param('username') username: string) {
        const isValid = mongoose.Types.ObjectId.isValid(username);
        if (!isValid) throw new HttpException('Invalid Id: Username not found!', HttpStatus.BAD_REQUEST);

        return this.usersService.removeUserByUserName(username);
    }



}
