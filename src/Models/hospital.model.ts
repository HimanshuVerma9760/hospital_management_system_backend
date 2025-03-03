import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import City from './city.model';
import Doctor from './doctor.model';
import Specialization from './specialization.model';

@Table({ tableName: 'Hospitals', timestamps: true })
export default class Hospital extends Model<Hospital> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  location: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  status: boolean;

  @ForeignKey(() => City)
  @Column({ type: DataType.INTEGER, allowNull: false })
  city_id: number;

  @BelongsTo(() => City)
  city: City;

  @HasMany(() => Doctor)
  doctor: Doctor;

  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  deletedAt?: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
  createdAt?: any;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
  updatedAt?: any;
}
