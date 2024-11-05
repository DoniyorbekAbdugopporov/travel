import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateActivityDto {
  @Field()
  @ApiProperty({
    example: 1,
    description: 'Travel uniq ID (ForieginKey)',
  })
  @IsNumber()
  travelId: number;

  @Field()
  @ApiProperty({
    example: 'Parij',
    description: 'Travel name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @ApiProperty({
    example: 'Parij description',
    description: 'Parij description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @ApiProperty({
    example: '100$',
    description: 'Price',
  })
  @IsString()
  @IsNotEmpty()
  price: string;

  @Field()
  @ApiProperty({
    example: '2 days',
    description: 'Duration of activity',
  })
  @IsString()
  @IsNotEmpty()
  duration: string;
}
