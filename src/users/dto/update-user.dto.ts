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
export class UpdateUserDto {
  @Field({ nullable: true })
  @ApiProperty({
    example: 'Sardor',
    description: 'Admin Name',
  })
  @IsString()
  @IsNotEmpty()
  full_name?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: 'Bio',
    description: 'User Bio',
  })
  @IsString()
  @IsNotEmpty()
  bio?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: 'photo.jpg',
    description: 'User Photo',
  })
  @IsString()
  @IsNotEmpty()
  profile_image?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: 'sardor@gmail.com',
    description: 'Admin email',
  })
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: '+998944414188',
    description: 'Admin Phone number',
  })
  @IsPhoneNumber('UZ')
  @IsString()
  phone_number?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: '@sardor_tg',
    description: 'Admin telegram link',
  })
  @IsString()
  @IsNotEmpty()
  tg_link?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: '$Ard0r11',
    description: 'Admin password',
  })
  @IsString()
  @IsNotEmpty()
  password?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: '$Ard0r11',
    description: 'Admin confirm password',
  })
  @IsString()
  @IsNotEmpty()
  confirm_password?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: false,
    description: 'Admin activligi',
  })
  @IsBoolean()
  is_active?: boolean;

  @Field({ nullable: true })
  @ApiProperty({
    example: 's3dasf242HJ34fggd34K23GH34vdsv',
    description: 'Admin hashed refresh token',
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
