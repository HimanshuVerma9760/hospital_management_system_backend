import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import Hospital from './hospital.model';
import City from './city.model';
import Patient from './patient.model';
import Specialization from './specialization.model';

@Table({ tableName: 'Doctors', timestamps: true })
export default class Doctor extends Model<Doctor> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ForeignKey(() => Specialization)
  @Column({ type: DataType.STRING, allowNull: false })
  specialization_id: number;
  @BelongsTo(() => Specialization)
  specialization: Specialization;

  @ForeignKey(() => Hospital)
  @Column({ type: DataType.INTEGER, allowNull: false })
  hospital_id: number;

  @BelongsTo(() => Hospital)
  hospital: Hospital;

  @ForeignKey(() => City)
  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  city_id: number;

  @BelongsTo(() => City)
  city: City;

  @HasMany(() => Patient)
  patient: Patient;
  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  deletedAt?: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
  createdAt?: any;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
  updatedAt?: any;
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  status: boolean;
}
