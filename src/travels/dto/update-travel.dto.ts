import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateTravelDto {
  @Field({ nullable: true })
  @ApiProperty({
    example: 1,
    description: 'Booking uniq ID (ForieginKey)',
  })
  @IsNumber()
  bookingId?: number;

  @Field({ nullable: true })
  @ApiProperty({
    example: 1,
    description: 'Discount uniq ID (ForieginKey)',
  })
  @IsNumber()
  discountId?: number;

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
    example: 'Fransiya',
    description: 'Fransiya country',
  })
  @IsString()
  @IsNotEmpty()
  cauntry?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: 'Parij',
    description: 'Parij city',
  })
  @IsString()
  @IsNotEmpty()
  city?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: '10',
    description: 'Average rating',
  })
  @IsNumber()
  average_rating?: number;
}
