import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateTransportTypeDto {
  @Field()
  @ApiProperty({
    example: 'Airaflot',
    description: 'Transport type Airaflot',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @Field()
  @ApiProperty({
    example: 'Airaflot description',
    description: 'Transport type Airaflot',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
