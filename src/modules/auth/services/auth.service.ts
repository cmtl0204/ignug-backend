import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as Bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '@auth/entities';
import { PayloadTokenModel } from '@auth/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class AuthService {
  constructor(
    @Inject(RepositoryEnum.USER_REPOSITORY)
    private repository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.findByUsername(username);

    if (user) {
      return this.checkPassword(password, user);
    }

    return null;
  }

  generateJwt(user: UserEntity) {
    const payload: PayloadTokenModel = { role: 'admin', sub: user.id };
    return {
      data: {
        accessToken: this.jwtService.sign(payload),
        user,
      },
    };
  }

  private async findByUsername(username: string) {
    return await this.repository.findOne({
      where: {
        username,
      },
    });
  }

  private async checkPassword(password: string, user: UserEntity) {
    const isMatch = await Bcrypt.compare(password, user.password);

    if (isMatch) {
      user.maxAttempts = 3;
      await this.repository.save(user);
      return user;
    }

    user.maxAttempts = user.maxAttempts > 0 ? user.maxAttempts - 1 : 0;
    await this.repository.save(user);
    return null;
  }
}
