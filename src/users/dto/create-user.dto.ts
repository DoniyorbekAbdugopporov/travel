import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @ApiProperty({
    example: 'Sardor',
    description: 'User Name',
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @Field()
  @ApiProperty({
    example: 'Bio',
    description: 'User Bio',
  })
  @IsString()
  @IsNotEmpty()
  bio: string;

  @Field()
  @ApiProperty({
    example: 'photo.jpg',
    description: 'User Photo',
  })
  @IsString()
  @IsNotEmpty()
  profile_image: string;

  @Field()
  @ApiProperty({
    example: 'sardor@gmail.com',
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @Field()
  @ApiProperty({
    example: '+99894414188',
    description: 'User Phone Number',
  })
  @IsPhoneNumber('UZ')
  @IsString()
  phone_number: string;

  @Field()
  @ApiProperty({
    example: '@sardor_tg',
    description: 'User telegram link',
  })
  @IsString()
  @IsNotEmpty()
  tg_link: string;

  @Field()
  @ApiProperty({
    example: '$Ard0r11',
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field()
  @ApiProperty({
    example: '$Ard0r11',
    description: 'User confirm password',
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @Field()
  @ApiProperty({
    example: false,
    description: 'User activligi',
  })
  @IsBoolean()
  is_active: boolean;

  @Field({ nullable: true })
  @ApiProperty({
    example: 's3dasf242HJ34fggd34K23GH34vdsv',
    description: 'User hashed refresh token',
  })
  @IsString()
  @IsOptional()
  hashed_refresh_token?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: 's3dasf242HJ34fggd34K23GH34vdsv',
    description: 'User activation link',
  })
  @IsString()
  @IsOptional()
  activation_link?: string;
}
