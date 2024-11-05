import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BelongsTo } from 'sequelize-typescript';
import { Travel } from 'src/travels/models/travel.model';
import { User } from 'src/users/models/user.model';

@InputType()
export class UpdateReviewDto {
  @Field({ nullable: true })
  @ApiProperty({
    example: 1,
    description: 'User uniq ID (ForieginKey)',
  })
  @IsNumber()
  userId?: number;

  @Field({ nullable: true })
  @ApiProperty({
    example: 1,
    description: 'Travel uniq ID (ForieginKey)',
  })
  @IsNumber()
  travelId?: number;

  @Field({ nullable: true })
  @ApiProperty({
    example: 1,
    description: 'Travel uniq ID (ForieginKey)',
  })
  @IsNumber()
  rating?: number;

  @Field({ nullable: true })
  @ApiProperty({
    example: 'HuHs21',
    description: 'Discount code',
  })
  @IsString()
  @IsNotEmpty()
  comment?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: '2024-08-08',
    description: 'Review date',
  })
  @IsDateString()
  review_date?: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Travel)
  travel: Travel;
}
