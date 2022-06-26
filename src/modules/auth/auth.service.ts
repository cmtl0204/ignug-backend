import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as Bcrypt from 'bcrypt';
import { UserEntity } from '@core/entities';
import { UsersService } from '@core/services';
import { JwtService } from '@nestjs/jwt';
import { PayloadTokenModel } from './models/payload-token.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    if (user) {
      const isPasswordMatch = await Bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        user.maxAttempts = user.maxAttempts > 0 ? user.maxAttempts - 1 : 0;
        await this.repository.save(user);
        return null;
      }

      user.maxAttempts = 3;
      await this.repository.save(user);

      return user;
    }
    return null;
  }

  generateJwt(user: UserEntity) {
    const payload: PayloadTokenModel = { role: 'admin', sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}
