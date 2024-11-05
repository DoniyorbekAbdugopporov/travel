import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber, IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class CreateAdminDto {
  @Field()
  @ApiProperty({
    example: 'Sardor',
    description: 'Admin Name',
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @Field()
  @ApiProperty({
    example: 'sardor@gmail.com',
    description: 'Admin email',
  })
  @IsEmail()
  email: string;

  @Field()
  @ApiProperty({
    example: '+998944414188',
    description: 'Admin Phone number',
  })
  @IsPhoneNumber('UZ')
  @IsString()
  phone_number: string;

  @Field()
  @ApiProperty({
    example: '@sardor_tg',
    description: 'Admin telegram link',
  })
  @IsString()
  @IsNotEmpty()
  tg_link: string;

  @Field()
  @ApiProperty({
    example: 'photo.jpg',
    description: 'Admin photo',
  })
  @IsString()
  @IsNotEmpty()
  photo: string;

  @Field()
  @ApiProperty({
    example: '$Ard0r11',
    description: 'Admin password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field()
  @ApiProperty({
    example: '$Ard0r11',
    description: 'Admin confirm password',
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @Field()
  @ApiProperty({
    example: false,
    description: 'Admin activligi',
  })
  @IsBoolean()
  is_active: boolean;

  @Field()
  @ApiProperty({
    example: false,
    description: 'Admin creatorligi',
  })
  @IsBoolean()
  is_creator: boolean;

  @Field({nullable: true})
  @ApiProperty({
    example: 's3dasf242HJ34fggd34K23GH34vdsv',
    description: 'Admin hashed refresh token',
  })
  @IsString()
  @IsOptional()
  hashed_refresh_token?: string;
}
