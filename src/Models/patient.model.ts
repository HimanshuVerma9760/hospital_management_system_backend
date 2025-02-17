import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import Hospital from './hospital.model';
import City from './city.model';
import Doctor from './doctor.model';

@Table({ tableName: 'Patients', timestamps: true })
export default class Patient extends Model<Patient> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  disease: string;

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

  @ForeignKey(() => Doctor)
  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  doctor_id: number;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  deletedAt?: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
  createdAt?: any;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
  updatedAt?: any;
}
