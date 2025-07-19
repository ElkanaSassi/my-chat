import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { CreateUserDto } from '../../../dtos/users/create-user.dto';
import { ContactsDto } from '../../../dtos/users/add-contacts.dto';
import { Users } from 'src/schemas/users/users.schema';
import { Types } from 'mongoose';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    public getAll(): Promise<Users[]> {
        return this.usersService.getAllUsers();
    }

    @Get(':username')
    public getUser(@Param('username') username: string) {
        return this.usersService.getUserByUserName(username);
    }

    @Post()
    public createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Patch(':userId')
    public updateUserByUserName(@Param('userId') userId: Types.ObjectId, @Body() updateUser: Partial<CreateUserDto>) {
        return this.usersService.updateUserById(userId, updateUser);
    }

    @Delete(':userId')
    public  removeUserByUserName(@Param('userId') userId: Types.ObjectId) {
        return this.usersService.removeUserById(userId);
    }

    @Patch('addContacts/:userId')
    public addContacts(@Param('userId') userId: Types.ObjectId, @Body() addContactsDto: ContactsDto) {
        return this.usersService.addContactsToUser(userId, addContactsDto);
    }

    @Delete('removeContacts/:userId')
    public removeContacts(@Param('userId') userId: Types.ObjectId, @Body() removeContactsDto: ContactsDto) {
        return this.usersService.removeContactsFromUser(userId, removeContactsDto);
    }
}
