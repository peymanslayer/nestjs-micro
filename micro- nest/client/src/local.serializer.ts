import { UserService } from './services/user/user.service';
import { IUser } from './interfaces/user.interface';
import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly usersService: UserService,
    private readonly authService:AuthService,
  ) {
    super();
  }

  serializeUser(user: IUser, done: CallableFunction) {
    done(null, user.Email);
  }

  async deserializeUser(userId: IUser, done: CallableFunction) {
    const user = await this.authService.login(userId);
    done(null, user);
  }
}
