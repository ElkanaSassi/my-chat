import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RegisterDto } from '../../../common/models/dto/auth/register.dto';
import { LoginDto } from '../../../common/models/dto/auth/login.dto';
import { UserInfoRo } from 'src/common/models/ro/users/userInfo.ro';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<UserInfoRo> {
        return this.authService.register(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<UserInfoRo> {
        return this.authService.login(loginDto);
    }

}
