import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Activity } from 'src/activities/models/activity.model';
import { Booking } from 'src/bookings/models/booking.entity';
import { Discount } from 'src/discounts/models/discount.model';
import { Image } from 'src/images/models/image.model';
import { Review } from 'src/reviews/models/review.model';

interface ITravelCreationAttr {
  bookingId: number;
  discountId: number;
  name: string;
  description: string;
  cauntry: string;
  city: string;
  average_rating: number;
}

@ObjectType()
@Table({ tableName: 'travels' })
export class Travel extends Model<Travel, ITravelCreationAttr> {
  @Field(() => ID)
  @ApiProperty({
    example: 1,
    description: 'Travel uniq ID (autoIncrement)',
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
    description: 'Booking uniq ID (ForieginKey)',
  })
  @ForeignKey(() => Booking)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bookingId: number;

  @Field()
  @ApiProperty({
    example: 1,
    description: 'Discount uniq ID (ForieginKey)',
  })
  @ForeignKey(() => Discount)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  discountId: number;

  @Field()
  @ApiProperty({
    example: 'Parij',
    description: 'Travel name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Field()
  @ApiProperty({
    example: 'Parij description',
    description: 'Parij description',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Field()
  @ApiProperty({
    example: 'Fransiya',
    description: 'Fransiya country',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cauntry: string;

  @Field()
  @ApiProperty({
    example: 'Parij',
    description: 'Parij city',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @Field()
  @ApiProperty({
    example: '10',
    description: 'Average rating',
  })
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  average_rating: number;

  @BelongsTo(() => Booking)
  booking: Booking;

  @BelongsTo(() => Discount)
  discount: Discount;

  @HasMany(() => Review)
  reviews: Review[];

  @HasMany(() => Activity)
  activities: Activity[];

  @HasMany(() => Image)
  images: Image[];
}
