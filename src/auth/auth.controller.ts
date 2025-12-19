import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { type Request } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto, @Req() req: Request) {
    console.log(req.sessionID);
    return await this.authService.register(dto);
  }

  @Get()
  check() {
    return { ok: true };
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Req() req: Request) {
    console.log(req.sessionID);
    return await this.authService.login(dto, req);
  }
}
