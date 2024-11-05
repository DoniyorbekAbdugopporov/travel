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
import { Travel } from 'src/travels/models/travel.model';

interface IActivityCreationAttr {
  travelId: number;
  name: string;
  description: string;
  price: string;
  duration: string;
}

@ObjectType()
@Table({ tableName: 'activities' })
export class Activity extends Model<Activity, IActivityCreationAttr> {
  @Field(() => ID)
  @ApiProperty({
    example: 1,
    description: 'Activity uniq ID (autoIncrement)',
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
    description: 'Travel uniq ID (ForieginKey)',
  })
  @ForeignKey(() => Travel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  travelId: number;

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
    example: '100$',
    description: 'Price',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  price: string;

  @Field()
  @ApiProperty({
    example: '2 days',
    description: 'Duration of activity',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  duration: string;

  @BelongsTo(() => Travel)
  travel: Travel;
}
