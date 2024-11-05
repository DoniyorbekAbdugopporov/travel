import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Travel } from "src/travels/models/travel.model";
import { User } from "src/users/models/user.model";

interface IReviewCreationAttr {
  userId: number;
  travelId: number;
  rating: number;
  comment: string;
  review_date: Date;
}

@ObjectType()
@Table({ tableName: 'reviews' })
export class Review extends Model<Review, IReviewCreationAttr> {
  @Field(() => ID)
  @ApiProperty({
    example: 1,
    description: 'User review uniq ID (autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Field()
  @ApiProperty({
    example: 1,
    description: 'User uniq ID (ForieginKey)',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Field()
  @ApiProperty({
    example: 1,
    description: 'Travel uniq ID (ForieginKey)',
  })
  @ForeignKey(() => Travel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  travelId: number;

  @Field()
  @ApiProperty({
    example: 1,
    description: 'Travel uniq ID (ForieginKey)',
  })
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  rating: number;

  @Field()
  @ApiProperty({
    example: 'HuHs21',
    description: 'Discount code',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  comment: string;

  @Field()
  @ApiProperty({
    example: '2024-08-08',
    description: 'Review date',
  })
  @Column({
    type: DataType.STRING,
    defaultValue: new Date(),
    allowNull: false,
  })
  review_date: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Travel)
  travel: Travel;
}
