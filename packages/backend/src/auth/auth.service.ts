import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from '../common/bcrypt';
import { UserVo } from '../user/vo/user.vo';
import { IAuthUser } from '../user/interface/auth-user.inferface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserVo> {
    const user = await this.userService.findOne(username, true);
    if (user && compare(password, user.password.value)) {
      const result = new UserVo();
      result.id = user.id;
      result.username = user.username;
      result.identity = user.identity;
      return result;
    }
    return null;
  }

  async login(user: UserVo) {
    const payload: IAuthUser = { id: user.id, username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
