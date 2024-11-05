import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateRoomDto {
  @Field()
  @ApiProperty({
    example: 1,
    description: 'Hotel uniq ID (ForieginKey)',
  })
  @IsNumber()
  hotelId: number;

  @Field()
  @ApiProperty({
    example: 'Standart',
    description: 'Room type Standart',
  })
  @IsString()
  @IsNotEmpty()
  room_type: string;

  @Field()
  @ApiProperty({
    example: '50$',
    description: 'Hotel price per night',
  })
  @IsString()
  @IsNotEmpty()
  price_per_night: string;

  @Field()
  @ApiProperty({
    example: 'Hotel room description',
    description: 'Room type Standart description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
