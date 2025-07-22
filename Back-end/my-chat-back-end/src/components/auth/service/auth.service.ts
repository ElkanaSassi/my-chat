import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/components/users/services/user.service';
import { LoginDto } from '../../../common/models/dto/auth/login.dto';
import { RegisterDto } from '../../../common/models/dto/auth/register.dto';
import { Users } from 'src/schemas/users/users.schema';
import { UserInfoRo } from 'src/common/models/ro/users/userInfo.ro';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        @InjectModel(Users.name) private usersModel: Model<Users>,
    ) { }

    async register(registerDto: RegisterDto): Promise<UserInfoRo> {
        const user = await this.usersModel.findOne({ username: registerDto.username }).exec();
        if (user) {
            throw new BadRequestException('Faild: username already in use.');
        }

        return this.userService.createUser(registerDto);
    }

    async login(loginDto: LoginDto): Promise<UserInfoRo> {
        const user = await this.userService.getUserByUserName(loginDto.username);
        if (user.username != loginDto.username || user.password != loginDto.password) {
            throw new BadRequestException('Faild to login: Username or Password are worng.');
        }

        const userToReturn: UserInfoRo = {
            username: user.username,
            contacts: user.contacts.map(contact => contact.username),
        }
        
        return userToReturn;
    }

}
