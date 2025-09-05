import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  fullname: string;

  @IsEmail({}, { message: 'Invalid email adress' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must contain minimum 8 symbols' })
  @MaxLength(100, { message: 'Password mus contain maximum 100 symbols' })
  password: string;
}
