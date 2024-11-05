import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr {
  full_name: string;
  email: string;
  phone_number: string;
  tg_link: string;
  photo: string;
  hashed_password: string;
  is_active: boolean;
  is_creator: boolean;
  hashed_refresh_token?: string;
}

@ObjectType()
@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @Field(() => ID)
  @ApiProperty({
    example: 1,
    description: 'Admin uniq ID (autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Field()
  @ApiProperty({
    example: 'Sardor',
    description: 'Admin Full Name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @Field()
  @ApiProperty({
    example: 'sardor@gmail.com',
    description: 'Admin email',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Field()
  @ApiProperty({
    example: '+998944414188',
    description: 'Admin phone number',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @Field()
  @ApiProperty({
    example: '@sardor_tg',
    description: 'Admin telegram link',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tg_link: string;

  @Field()
  @ApiProperty({
    example: 'photo.jpg',
    description: 'Admin photo',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  photo: string;

  @Field()
  @ApiProperty({
    example: '2dfArd0GHJ6fghs9G8',
    description: 'Admin hashed password',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;

  @Field()
  @ApiProperty({
    example: false,
    description: 'Admin activligi',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_active: boolean;

  @Field()
  @ApiProperty({
    example: false,
    description: 'Admin creatorligi',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_creator: boolean;

  @Field()
  @ApiProperty({
    example: '2wa23NdfSDdHJ34sffae2r4fadf23edf',
    description: 'Admin hashed refresh token',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  hashed_refresh_token: string;
}
