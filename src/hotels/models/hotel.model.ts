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
import { Booking } from 'src/bookings/models/booking.entity';
import { Discount } from 'src/discounts/models/discount.model';
import { Room } from 'src/rooms/models/room.model';

interface IHotelCreationAttr {
  bookingId: number;
  discountId: number;
  hotel_name: string;
  address: string;
  rating: number;
  total_rooms: number;
  available_rooms: number;
  image: string;
}

@ObjectType()
@Table({ tableName: 'hotels' })
export class Hotel extends Model<Hotel, IHotelCreationAttr> {
  @Field(() => ID)
  @ApiProperty({
    example: 1,
    description: 'Hotel uniq ID (autoIncrement)',
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
    description: 'Hotel name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hotel_name: string;

  @Field()
  @ApiProperty({
    example: 'Parij city',
    description: 'Hotel address',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Field()
  @ApiProperty({
    example: '8',
    description: 'Hotel rating',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rating: number;

  @Field()
  @ApiProperty({
    example: '100',
    description: 'Hotel total rooms',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total_rooms: number;

  @Field()
  @ApiProperty({
    example: '55',
    description: 'Hotel available rooms',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  available_rooms: number;

  @Field()
  @ApiProperty({
    example: 'hotel.jpg',
    description: 'Hotel image url',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @BelongsTo(() => Booking)
  booking: Booking;

  @BelongsTo(() => Discount)
  discount: Discount;

  @HasMany(() => Room)
  rooms: Room[];
}
