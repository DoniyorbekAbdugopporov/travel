import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdatePaymentMethodDto {
  @Field({ nullable: true })
  @ApiProperty({
    example: 'Card',
    description: 'Method name',
  })
  @IsString()
  @IsNotEmpty()
  method_name?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: 'Payment with card',
    description: 'Payment method description',
  })
  @IsString()
  @IsNotEmpty()
  description?: string;
}
