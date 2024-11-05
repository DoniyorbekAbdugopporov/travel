import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Hotel } from "src/hotels/models/hotel.model";

interface IRoomCreationAttr {
  hotelId: number;
  room_type: string; // Standart, Deluxe, Suite va b...
  price_per_night: string;
  description: string;
}

@ObjectType()
@Table({ tableName: 'rooms' })
export class Room extends Model<Room, IRoomCreationAttr> {
  @Field(() => ID)
  @ApiProperty({
    example: 1,
    description: 'Room uniq ID (autoIncrement)',
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
    description: 'Hotel uniq ID (ForieginKey)',
  })
  @ForeignKey(() => Hotel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  hotelId: number;

  @Field()
  @ApiProperty({
    example: 'Standart',
    description: 'Room type Standart',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  room_type: string;

  @Field()
  @ApiProperty({
    example: '50$',
    description: 'Hotel price per night',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  price_per_night: string;

  @Field()
  @ApiProperty({
    example: 'Hotel room description',
    description: 'Room type Standart description',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @BelongsTo(() => Hotel)
  hotel: Hotel;
}
