import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateTransportDto {
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
    description: 'Transport Type uniq ID (ForieginKey)',
  })
  @IsNumber()
  transportTypeId?: number;

  @Field({ nullable: true })
  @ApiProperty({
    example: 1,
    description: 'Discount uniq ID (ForieginKey)',
  })
  @IsNumber()
  discountId?: number;

  @Field({ nullable: true })
  @ApiProperty({
    example: 'Uzb Air',
    description: 'Transport name',
  })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: 'Travel',
    description: 'Travel destination',
  })
  @IsString()
  @IsNotEmpty()
  destination?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: '2024-11-10',
    description: 'Departure time',
  })
  @IsString()
  @IsNotEmpty()
  departure_time?: Date;

  @Field({ nullable: true })
  @ApiProperty({
    example: '2024-11-30',
    description: 'Arrival time',
  })
  @IsString()
  @IsNotEmpty()
  arrival_time?: Date;

  @Field({ nullable: true })
  @ApiProperty({
    example: '1000$',
    description: 'Transport price',
  })
  @IsString()
  @IsNotEmpty()
  price?: string;
}
