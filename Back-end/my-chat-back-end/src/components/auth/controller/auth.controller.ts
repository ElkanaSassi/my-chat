import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RegisterDto } from 'src/dto/auth/register.dto';
import { LoginDto } from 'src/dto/auth/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

}
