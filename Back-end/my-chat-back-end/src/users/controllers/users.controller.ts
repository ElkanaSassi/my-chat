import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../DTO/create-user.dto';
import mongoose from 'mongoose';

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

        return this.usersService.updateUserByName(username, updateUser);
    }

    @Patch('addFriend/:friendUsername')
    @UsePipes(new ValidationPipe())
    addNewFriend(@Param('friendUsername') friendUserName: string) {
        const isValid = mongoose.Types.ObjectId.isValid(friendUserName);
        if (!isValid) throw new HttpException('Invalid Id: User not found!', HttpStatus.BAD_REQUEST);

        return this.usersService.addNewFriendByUserName(friendUserName);
    }
    
}
