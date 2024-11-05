import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateImageDto {
  @Field({ nullable: true })
  @ApiProperty({
    example: 1,
    description: 'Travel uniq ID (ForieginKey)',
  })
  @IsNumber()
  travelId?: number;

  @Field({ nullable: true })
  @ApiProperty({
    example: 'image.jpg',
    description: 'image url',
  })
  @IsString()
  @IsNotEmpty()
  image?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: 'Image description',
    description: 'Iamge description',
  })
  @IsString()
  @IsNotEmpty()
  description?: string;
}
