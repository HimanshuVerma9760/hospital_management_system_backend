import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import City from './city.model';
import Role from './role.model';
import { v4 as uuidv4 } from 'uuid';

@Table({ tableName: 'Users', timestamps: true })
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: uuidv4() })
  userId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  dp: string;

  @ForeignKey(() => City)
  @Column({ type: DataType.INTEGER, allowNull: false })
  city_id: number;

  @BelongsTo(() => City)
  city: City;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false })
  role_id: number;

  @BelongsTo(() => Role)
  role: Role;

  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  deletedAt?: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
  createdAt?: any;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
  updatedAt?: any;
}
