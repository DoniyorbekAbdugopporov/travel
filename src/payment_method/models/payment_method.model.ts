import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Payment } from 'src/payments/models/payment.model';

interface IPaymentMethodCreationAttr {
  method_name: string;
  description: string;
}

@ObjectType()
@Table({ tableName: 'payment_method' })
export class PaymentMethod extends Model<
  PaymentMethod,
  IPaymentMethodCreationAttr
> {
  @Field(() => ID)
  @ApiProperty({
    example: 1,
    description: 'Payment Method uniq ID (autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Field()
  @ApiProperty({
    example: 'Card',
    description: 'Method name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  method_name: string;

  @Field()
  @ApiProperty({
    example: 'Payment with card',
    description: 'Payment method description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @HasMany(() => Payment)
  payments: Payment[];
}
