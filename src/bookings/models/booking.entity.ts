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
import { Discount } from 'src/discounts/models/discount.model';
import { Hotel } from 'src/hotels/models/hotel.model';
import { TransactionLog } from 'src/transaction_logs/models/transaction_log.model';
import { Transport } from 'src/transports/models/transport.model';
import { Travel } from 'src/travels/models/travel.model';
import { User } from 'src/users/models/user.model';

interface IBookingCreationAttr {
  userId: number;
  discountId: number;
  start_date: Date;
  end_date: Date;
  total_price: string;
  status: string;
  booking_date: Date;
}

@ObjectType()
@Table({ tableName: 'bookings' })
export class Booking extends Model<Booking, IBookingCreationAttr> {
  @Field(() => ID)
  @ApiProperty({
    example: 1,
    description: 'Booking uniq ID (autoIncrement)',
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
    example: '2024-08-08',
    description: 'Booking start date',
  })
  @Column({
    type: DataType.STRING,
    defaultValue: new Date(),
    allowNull: false,
  })
  start_date: Date;

  @Field()
  @ApiProperty({
    example: '2024-08-08',
    description: 'Booking start date',
  })
  @Column({
    type: DataType.STRING,
    defaultValue: new Date(),
    allowNull: false,
  })
  end_date: Date;

  @Field()
  @ApiProperty({
    example: '2000$',
    description: 'Booking total price',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  total_price: string;

  @Field()
  @ApiProperty({
    example: 'HuHs21',
    description: 'Discount code',
  })
  @Column({
    type: DataType.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
    defaultValue: 'pending',
    allowNull: false,
  })
  status: string;

  @Field()
  @ApiProperty({
    example: '2024-08-08',
    description: 'Booking date',
  })
  @Column({
    type: DataType.STRING,
    defaultValue: new Date(),
  })
  booking_date: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => User)
  discount: Discount;

  @HasMany(() => TransactionLog)
  transaction_logs: TransactionLog[];

  @HasMany(() => Travel)
  travels: Travel[];

  @HasMany(() => Hotel)
  hotels: Hotel[];

  @HasMany(() => Transport)
  transports: Transport[];
}
