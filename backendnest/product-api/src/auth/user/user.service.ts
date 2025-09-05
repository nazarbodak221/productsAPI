import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { UserResponseDto } from './dto/user.response.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: UserDto): Promise<UserResponseDto> {
    const email = userDto.email;
    if (await this.prismaService.user.findUnique({ where: { email } })) {
      throw new BadRequestException(
        'User with email: ' + email + ' was already registred.',
      );
    }
    userDto.password = await bcrypt.hash(userDto.password, 10);
    return this.prismaService.user.create({ data: userDto });
  }

  async login(userDto: UserDto): Promise<{ access_token: string }> {
    const email = userDto.email;
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!user) throw new NotFoundException('User not found');

    const isMatch = await bcrypt.compare(userDto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
