import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateBookingDto {
  @Field()
  @ApiProperty({
    example: 1,
    description: 'User uniq ID (ForieginKey)',
  })
  @IsNumber()
  userId: number;

  @Field()
  @ApiProperty({
    example: 1,
    description: 'Discount uniq ID (ForieginKey)',
  })
  @IsNumber()
  discountId: number;

  @Field()
  @ApiProperty({
    example: '2024-08-08',
    description: 'Booking start date',
  })
  @IsDateString()
  start_date: Date;

  @Field()
  @ApiProperty({
    example: '2024-08-08',
    description: 'Booking start date',
  })
  @IsDateString()
  end_date: Date;

  @Field()
  @ApiProperty({
    example: '2000$',
    description: 'Booking total price',
  })
  @IsString()
  @IsNotEmpty()
  total_price: string;

  @Field()
  @ApiProperty({
    example: 'pending, confirmed, cancelled, completed',
    description: 'Bookin status',
  })
  @IsEnum(['pending', 'confirmed', 'cancelled', 'completed'], {
    message: 'Status must be either "pending" or "completed"',
  })
  status: string;

  @Field()
  @ApiProperty({
    example: '2024-08-08',
    description: 'Booking date',
  })
  @IsDateString()
  booking_date: Date;
}
