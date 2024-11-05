import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Booking } from "src/bookings/models/booking.entity";
import { Review } from "src/reviews/models/review.model";

interface IUserCreationAttr {
  full_name: string;
  bio: string;
  profile_image: string,
  email: string;
  phone_number: string;
  tg_link: string;
  hashed_password: string;
  is_active: boolean;
  hashed_refresh_token?: string;
}

@ObjectType()
@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationAttr> {
  @Field(() => ID)
  @ApiProperty({
    example: 1,
    description: 'User uniq ID (autoIncrement)',
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
    description: 'User Full Name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @Field()
  @ApiProperty({
    example: 'Sardor',
    description: 'User Full Name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bio?: string;

  @Field()
  @ApiProperty({
    example: 'Sardor',
    description: 'User Full Name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profile_image?: string;

  @Field()
  @ApiProperty({
    example: 'sardor@gmail.com',
    description: 'User email',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Field()
  @ApiProperty({
    example: '+998944414188',
    description: 'User phone number',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @Field()
  @ApiProperty({
    example: '@sardor_tg',
    description: 'User telegram link',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  tg_link?: string;

  @Field()
  @ApiProperty({
    example: '2dfArd0GHJ6fghs9G8',
    description: 'User hashed password',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;

  @Field()
  @ApiProperty({
    example: false,
    description: 'User activligi',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_active: boolean;

  @Field()
  @ApiProperty({
    example: '2wa23NdfSDdHJ34sffae2r4fadf23edf',
    description: 'User hashed refresh token',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @HasMany(() => Review)
  reviews: Review[];

  @HasMany(() => Booking)
  bookings: Booking[];
}
