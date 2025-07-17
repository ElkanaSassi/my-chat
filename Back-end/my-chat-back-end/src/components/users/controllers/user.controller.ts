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

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    getAll() {
        return   this.usersService.getAllUsers();
    }

    @Get(':username')
    async getUser(@Param('username') username: string) {
        return await this.usersService.getUserByUserName(username);
    }

    @Post('createUser')
    @UsePipes(new ValidationPipe())
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.createUser(createUserDto);
    }

    @Patch('updateUser/:username')
    @UsePipes(new ValidationPipe())
    async updateUserByUserName(@Param('username') username: string, @Body() updateUser: Partial<CreateUserDto>) {
        return await this.usersService.updateUserByUserName(username, updateUser);
    }

    @Delete('removeUser/:username')
    async removeUserByUserName(@Param('username') username: string) {
        return await this.usersService.removeUserByUserName(username);
    }

    @Patch('addContacts/:username')
    @UsePipes(new ValidationPipe())
    async addContacts(@Param('username') username: string, @Body() addContactsDto: ContactsDto) {
        return await this.usersService.addContactsToUser(username, addContactsDto);
    }

    @Delete('removeContact/:username')
    @UsePipes(new ValidationPipe())
    async removeContacts(@Param('username') username: string, @Body() removeContactsDto: ContactsDto) {
        return await this.usersService.removeContactsFromUser(username, removeContactsDto);
    }
}
