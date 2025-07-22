import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { CreateUserDto } from '../../../common/models/dto/users/create-user.dto';
import { AddContactsDto } from '../../../common/models/dto/users/add-contacts.dto';
import { Users } from 'src/schemas/users/users.schema';
import { Types } from 'mongoose';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    public getAll(): Promise<string[]> {
        return this.usersService.getAllUsers();
    }

    @Get(':userId')
    public getUser(@Param('userId') userId: Types.ObjectId): Promise<Users> {
        return this.usersService.getUserById(userId);
    }

    @Post()
    public createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Patch(':userId')
    public updateUserById(@Param('userId') userId: Types.ObjectId, @Body() updateUser: Partial<CreateUserDto>) {
        return this.usersService.updateUserById(userId, updateUser);
    }

    @Delete(':userId')
    public removeUserById(@Param('userId') userId: Types.ObjectId) {
        return this.usersService.removeUserById(userId);
    }

    @Patch('addContacts/:username')
    public addContacts(@Param('username') username: string, @Body() addContactDto: AddContactsDto): Promise<string[]> {
        return this.usersService.addContactToUser(username, addContactDto);
    }

    @Delete('removeContacts/:userId')
    public removeContacts(@Param('userId') userId: Types.ObjectId, @Body() removeContactDto: AddContactsDto) {
        return this.usersService.removeContactFromUser(userId, removeContactDto);
    }
}
