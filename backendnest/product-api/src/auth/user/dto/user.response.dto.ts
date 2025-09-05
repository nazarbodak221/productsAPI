import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  fullname: string | null;

  @Expose()
  email: string;

  @Exclude()
  password: string;
}
