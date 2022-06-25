import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from '@auth/dto';
import { UserEntity } from '@users/entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}

  async login(payload: LoginDto) {
    const user = await this.repository.findOne({
      where: { username: payload.username },
    });
    if (!user) {
      throw new NotFoundException(`El usuario ${payload.username} no existe`);
    }

    return user;
  }
}
