import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateDiscountDto {
  @Field()
  @ApiProperty({
    example: 'HuHs21',
    description: 'Discount code',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @Field()
  @ApiProperty({
    example: 'percentage, fixed_amount',
    description: 'Discount turi',
  })
  @IsEnum(['percentage', 'fixed_amount'], {
    message: 'Status must be either "paid" or "unpaid"',
  })
  discount_type: string;

  @Field()
  @ApiProperty({
    example: '10%',
    description: 'Discount qiymati',
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @Field()
  @ApiProperty({
    example: '2024-08-08',
    description: 'Discount start date',
  })
  @IsDateString()
  start_date: Date;

  @Field()
  @ApiProperty({
    example: '2024-09-09',
    description: 'Discount end date',
  })
  @IsDateString()
  end_date: Date;

  @Field()
  @ApiProperty({
    example: 'true or false',
    description: 'Discount activated',
  })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
