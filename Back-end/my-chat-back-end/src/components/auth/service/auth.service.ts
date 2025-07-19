import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/components/users/services/user.service';
import { LoginDto } from 'src/dtos/auth/login.dto';
import { RegisterDto } from 'src/dtos/auth/register.dto';
import { Users } from 'src/schemas/users/users.schema';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        @InjectModel(Users.name) private usersModel: Model<Users>,
    ) { }

    async register(registerDto: RegisterDto): Promise<Users> {
        const user = await this.usersModel.findOne({ username: registerDto.username }).exec();
        if (user) {
            throw new BadRequestException('Faild: username already in use.');
        }

        return this.userService.createUser(registerDto);
    }

    async login(loginDto: LoginDto): Promise<Users> {
        const user = await this.userService.getUserByUserName(loginDto.username);
        if (user.username != loginDto.username || user.password != loginDto.password) {
            throw new BadRequestException('Faild to login: Username or Password are worng.');
        }

        return user;
    }

}
