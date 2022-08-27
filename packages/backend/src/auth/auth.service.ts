import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from '../common/bcrypt';
import { IAuthUser } from '../user/interface/auth-user.inferface';
import { UserStatusEnum } from '../enums';
import { User } from '../user/entities/user.entity';
import { UserVO } from '../user/entities/user.vo.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserVO> {
    const user = await this.userService.findOne(username);
    if (user && compare(password, user.password.value)) {
      if (user.status === UserStatusEnum.DISABLED) {
        throw new UnauthorizedException('user is disabled');
      }
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload: IAuthUser = { id: user.id, username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
