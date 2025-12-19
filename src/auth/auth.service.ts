import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { verify } from 'argon2';
import { type Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  async login(dto: LoginDto, req: Request) {
    const user = await this.userService.findByEmail(dto.email);

    const isValid = await verify(user.password, dto.password);

    if (!isValid) {
      throw new UnauthorizedException('Невірний пароль.');
    }

    req.session.regenerate(() => {
      req.session.userId = user.id;
    });

    return { ok: true };
  }
}
