import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Travel } from "src/travels/models/travel.model";

interface IImageCreationAttr {
  travelId: number;
  image: string;
  description: string;
}

@ObjectType()
@Table({ tableName: 'images' })
export class Image extends Model<Image, IImageCreationAttr> {
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
    example: 'image.jpg',
    description: 'image url',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @Field()
  @ApiProperty({
    example: 'Image description',
    description: 'Iamge description',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @BelongsTo(() => Travel)
  travel: Travel;
}
