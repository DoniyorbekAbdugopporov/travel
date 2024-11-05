import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Booking } from "src/bookings/models/booking.entity";
import { Payment } from "src/payments/models/payment.model";

interface ITransactionLogCreationAttr {
  paymentId: number;
  bookingId: number;
  event_type: string;
  event_description: string;
}

@ObjectType()
@Table({ tableName: 'transaction_logs' })
export class TransactionLog extends Model<
  TransactionLog,
  ITransactionLogCreationAttr
> {
  @Field(() => ID)
  @ApiProperty({
    example: 1,
    description: 'Discount uniq ID (autoIncrement)',
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
    description: 'Payment uniq ID (ForieginKey)',
  })
  @ForeignKey(() => Payment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  paymentId: number;

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
    example: 'payment_created',
    description: 'event type',
  })
  @Column({
    type: DataType.ENUM(
      'payment_created',
      'payment_failed',
      'booking_updated',
      'booking_cancelled',
    ),
    defaultValue: 'payment_created',
    allowNull: false,
  })
  event_type: string;

  @Field()
  @ApiProperty({
    example: 'event_description',
    description: 'Tolov haqida malumot beriladi',
  })
  @Column({
    type: DataType.TEXT(),
    allowNull: false,
  })
  event_description: string;

  @BelongsTo(() => Payment)
  payment: Payment;

  @BelongsTo(() => Booking)
  booking: Booking;
}
