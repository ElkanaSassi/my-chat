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

    @Post('createUser')
    public createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Patch('updateUser/:username')
    public updateUserByUserName(@Param('username') username: string, @Body() updateUser: Partial<CreateUserDto>) {
        return this.usersService.updateUserByUserName(username, updateUser);
    }

    @Delete('removeUser/:username')
    public  removeUserByUserName(@Param('username') username: string) {
        return this.usersService.removeUserByUserName(username);
    }

    @Patch('addContacts/:username')
    public addContacts(@Param('username') username: string, @Body() addContactsDto: ContactsDto) {
        return this.usersService.addContactsToUser(username, addContactsDto);
    }

    @Delete('removeContact/:username')
    public removeContacts(@Param('username') username: string, @Body() removeContactsDto: ContactsDto) {
        return this.usersService.removeContactsFromUser(username, removeContactsDto);
    }
}
