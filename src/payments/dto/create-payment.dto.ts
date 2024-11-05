import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreatePaymentDto {
  @Field()
  @ApiProperty({
    example: 1,
    description: 'User uniq ID (ForieginKey)',
  })
  @IsNumber()
  paymentMethodId: number;

  @Field()
  @ApiProperty({
    example: 1,
    description: 'User uniq ID (ForieginKey)',
  })
  @IsNumber()
  bookingId: number;

  @Field()
  @ApiProperty({
    example: '2000$',
    description: 'Payment amout',
  })
  @IsString()
  @IsNotEmpty()
  amout: string;

  @Field()
  @ApiProperty({
    example: '2024-08-08',
    description: 'Paymet date',
  })
  @IsDateString()
  payment_date: Date;

  @Field()
  @ApiProperty({
    example: 'paid, failed, processing',
    description: 'Payment status',
  })
  @IsEnum(['paid', 'failed', 'processing'], {
    message: 'Status must be either "paid" or "processing"',
  })
  status: string;
}
