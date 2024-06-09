import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { PayloadToken } from './models/token.model';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new Error('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    }
    return null;
  }
  async register(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
  generateJWT(user: User) {
    const payload: PayloadToken = { sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      tokenType: 'bearer',
      registrationCompleted: 100,
    };
  }
}
