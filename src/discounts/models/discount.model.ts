import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Booking } from 'src/bookings/models/booking.entity';
import { Hotel } from 'src/hotels/models/hotel.model';
import { Transport } from 'src/transports/models/transport.model';
import { Travel } from 'src/travels/models/travel.model';

interface IDiscountCreationAttr {
  code: string;
  discount_type: string;
  value: string;
  start_date: Date;
  end_date: Date;
  is_active: boolean;
}

@ObjectType()
@Table({ tableName: 'discounts' })
export class Discount extends Model<Discount, IDiscountCreationAttr> {
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
    example: 'HuHs21',
    description: 'Discount code',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code: string;

  @Field()
  @ApiProperty({
    example: 'percentage, fixed_amount',
    description: 'Discount turi',
  })
  @Column({
    type: DataType.ENUM('percentage', 'fixed_amount'),
    defaultValue: 'percentage',
  })
  discount_type: string;

  @Field()
  @ApiProperty({
    example: '10%',
    description: 'Discount qiymati',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;

  @Field()
  @ApiProperty({
    example: '2024-08-08',
    description: 'Discount start date',
  })
  @Column({
    type: DataType.STRING,
    defaultValue: new Date(),
    allowNull: false,
  })
  start_date: Date;

  @Field()
  @ApiProperty({
    example: '2024-09-09',
    description: 'Discount end date',
  })
  @Column({
    type: DataType.STRING,
    defaultValue: new Date(),
    allowNull: false,
  })
  end_date: Date;

  @Field()
  @ApiProperty({
    example: 'true or false',
    description: 'Discount activated',
  })
  @Column({
    type: DataType.STRING,
    defaultValue: false,
  })
  is_active: boolean;

  @HasMany(() => Booking)
  bookings: Booking[];

  @HasMany(() => Travel)
  travels: Travel[];

  @HasMany(() => Hotel)
  hotels: Hotel[];

  @HasMany(() => Transport)
  transports: Transport[];
}
