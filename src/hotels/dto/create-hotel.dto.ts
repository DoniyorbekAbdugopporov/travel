import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateHotelDto {
  @Field()
  @ApiProperty({
    example: 1,
    description: 'Booking uniq ID (ForieginKey)',
  })
  @IsNumber()
  bookingId: number;

  @Field()
  @ApiProperty({
    example: 1,
    description: 'Discount uniq ID (ForieginKey)',
  })
  @IsNumber()
  discountId: number;

  @Field()
  @ApiProperty({
    example: 'Parij',
    description: 'Hotel name',
  })
  @IsString()
  @IsNotEmpty()
  hotel_name: string;

  @Field()
  @ApiProperty({
    example: 'Parij city',
    description: 'Hotel address',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @Field()
  @ApiProperty({
    example: '8',
    description: 'Hotel rating',
  })
  @IsNumber()
  rating: number;

  @Field()
  @ApiProperty({
    example: '100',
    description: 'Hotel total rooms',
  })
  @IsNumber()
  total_rooms: number;

  @Field()
  @ApiProperty({
    example: '55',
    description: 'Hotel available rooms',
  })
  @IsNumber()
  available_rooms: number;

  @Field()
  @ApiProperty({
    example: 'hotel.jpg',
    description: 'Hotel image url',
  })
  @IsString()
  @IsNotEmpty()
  image: string;
}
