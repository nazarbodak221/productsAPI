import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('api/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  async register(@Body() userDto: UserDto) {
    return this.userService.register(userDto);
  }

  @Post('login')
  async login(@Body() userDto: UserDto) {
    return this.userService.login(userDto);
  }
}
