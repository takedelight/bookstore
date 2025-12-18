import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async createUser(dto: CreateUserDto) {
    const isExist = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (isExist) {
      throw new ConflictException('Користувач з таким email вже існує.');
    }

    const newUser = this.userRepository.create({
      ...dto,
      avatar: null,
      password: await hash(dto.password),
    });

    return await this.userRepository.save(newUser);
  }

  async update() {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Користувача не знайдено.');
    }

    return user;
  }

  async delete(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Користувача не знайдено.');
    }

    await this.userRepository.delete(user.id);

    return { message: 'Користувача видалено.' };
  }
}
