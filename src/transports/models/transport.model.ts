import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Booking } from 'src/bookings/models/booking.entity';
import { Discount } from 'src/discounts/models/discount.model';
import { TransportType } from 'src/transport_types/models/transport_type.model';

interface ITransportCreationAttr {
  bookingId: number;
  transportTypeId: number;
  discountId: number;
  name: string;
  destination: string;
  departure_time: Date;
  arrival_time: Date;
  price: string;
}

@ObjectType()
@Table({ tableName: 'transports' })
export class Transport extends Model<Transport, ITransportCreationAttr> {
  @Field(() => ID)
  @ApiProperty({
    example: 1,
    description: 'Transport uniq ID (autoIncrement)',
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
    description: 'Transport Type uniq ID (ForieginKey)',
  })
  @ForeignKey(() => TransportType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  transportTypeId: number;

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
    example: 'Uzb Air',
    description: 'Transport name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Field()
  @ApiProperty({
    example: 'Travel',
    description: 'Travel destination',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  destination: string;

  @Field()
  @ApiProperty({
    example: '2024-11-10',
    description: 'Departure time',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  departure_time: Date;

  @Field()
  @ApiProperty({
    example: '2024-11-30',
    description: 'Arrival time',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  arrival_time: Date;

  @Field()
  @ApiProperty({
    example: '1000$',
    description: 'Transport price',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  price: string;

  @BelongsTo(() => Booking)
  booking: Booking;

  @BelongsTo(() => Discount)
  discount: Discount;

  @BelongsTo(() => TransportType)
  transport_type: TransportType;
}
