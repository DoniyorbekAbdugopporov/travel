import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateImageDto {
  @Field()
  @ApiProperty({
    example: 1,
    description: 'Travel uniq ID (ForieginKey)',
  })
  @IsNumber()
  travelId: number;

  @Field()
  @ApiProperty({
    example: 'image.jpg',
    description: 'image url',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @Field()
  @ApiProperty({
    example: 'Image description',
    description: 'Iamge description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
