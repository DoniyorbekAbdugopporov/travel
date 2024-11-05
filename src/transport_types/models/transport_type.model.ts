import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Transport } from "src/transports/models/transport.model";

interface ITransportTypeCreationAttr {
  type: string;
  description: string;
}

@ObjectType()
@Table({ tableName: 'transport_types' })
export class TransportType extends Model<
  TransportType,
  ITransportTypeCreationAttr
> {
  @Field(() => ID)
  @ApiProperty({
    example: 1,
    description: 'Tansport Type uniq ID (autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Field()
  @ApiProperty({
    example: 'Airaflot',
    description: 'Transport type Airaflot',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @Field()
  @ApiProperty({
    example: 'Airaflot description',
    description: 'Transport type Airaflot',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @HasMany(() => Transport)
  transports: Transport[];
}
