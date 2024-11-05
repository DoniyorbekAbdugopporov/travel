import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateTransactionLogDto {
  @Field({ nullable: true })
  @ApiProperty({
    example: 1,
    description: 'Payment uniq ID (ForieginKey)',
  })
  @IsNumber()
  paymentId?: number;

  @Field({ nullable: true })
  @ApiProperty({
    example: 1,
    description: 'Booking uniq ID (ForieginKey)',
  })
  @IsNumber()
  bookingId?: number;

  @Field({ nullable: true })
  @ApiProperty({
    example: 'payment_created',
    description: 'event type',
  })
  @IsEnum(
    [
      'payment_created',
      'payment_failed',
      'booking_updated',
      'booking_cancelled',
    ],
    {
      message: 'Status must be either "payment_created" or "booking_cancelled"',
    },
  )
  event_type?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: 'event_description',
    description: 'Tolov haqida malumot beriladi',
  })
  @IsString()
  @IsNotEmpty()
  event_description?: string;
}
