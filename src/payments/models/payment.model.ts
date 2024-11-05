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
import { PaymentMethod } from 'src/payment_method/models/payment_method.model';
import { TransactionLog } from 'src/transaction_logs/models/transaction_log.model';

interface IPaymentCreationAttr {
  paymentMethodId: number;
  bookingId: number;
  amout: string;
  payment_date: Date;
  status: string;
}

@ObjectType()
@Table({ tableName: 'payments' })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
  @Field(() => ID)
  @ApiProperty({
    example: 1,
    description: 'Payment uniq ID (autoIncrement)',
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
  @ForeignKey(() => PaymentMethod)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  paymentMethodId: number;

  @Field()
  @ApiProperty({
    example: 1,
    description: 'User uniq ID (ForieginKey)',
  })
  @ForeignKey(() => PaymentMethod)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bookingId: number;

  @Field()
  @ApiProperty({
    example: '2000$',
    description: 'Payment amout',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  amout: string;

  @Field()
  @ApiProperty({
    example: '2024-08-08',
    description: 'Payment date',
  })
  @Column({
    type: DataType.STRING,
    defaultValue: new Date(),
    allowNull: false,
  })
  payment_date: Date;

  @Field()
  @ApiProperty({
    example: 'paid, failed, processing',
    description: 'Payment status',
  })
  @Column({
    type: DataType.ENUM('paid', 'failed', 'processing'),
    defaultValue: 'processing',
    allowNull: false,
  })
  status: string;

  @BelongsTo(() => PaymentMethod)
  payment_method: PaymentMethod;

  @HasMany(() => TransactionLog)
  transaction_logs: TransactionLog[];
}
