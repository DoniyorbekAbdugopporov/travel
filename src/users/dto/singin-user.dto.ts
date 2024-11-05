import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class SignInUserDto {
  @ApiProperty({
    example: 'sardor@gail.com',
    description: 'User email',
  })
  @IsEmail({}, { message: "To'g'ri email formatini kiriting" })
  email: string;

  @ApiProperty({
    example: '$Ard0r11',
    description: 'User password',
  })
  @IsString({ message: 'Parol qator formatida bo‘lishi kerak' })
  @MinLength(6, { message: 'Parol kamida 6 belgidan iborat bo‘lishi kerak' })
  password: string;
}
