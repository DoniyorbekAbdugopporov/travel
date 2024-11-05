import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateActivityDto {
  @Field({ nullable: true })
  @ApiProperty({
    example: 1,
    description: 'Booking uniq ID (ForieginKey)',
  })
  @IsNumber()
  travelId?: number;

  @Field({ nullable: true })
  @ApiProperty({
    example: 'Parij',
    description: 'Travel name',
  })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: 'Parij description',
    description: 'Parij description',
  })
  @IsString()
  @IsNotEmpty()
  description?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: '100$',
    description: 'Price',
  })
  @IsString()
  @IsNotEmpty()
  price?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: '2 days',
    description: 'Duration of activity',
  })
  @IsString()
  @IsNotEmpty()
  duration?: string;
}
