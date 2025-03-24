import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import Patient from './patient.model';
import Doctor from './doctor.model';

@Table({ tableName: 'Prescriptions', timestamps: true })
export default class Prescriptions extends Model<Prescriptions> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Patient)
  @Column({ type: DataType.INTEGER, allowNull: false })
  patient: number;

  @BelongsTo(() => Patient)
  associatedPatient: Patient;

  @ForeignKey(() => Doctor)
  @Column({ type: DataType.INTEGER, allowNull: false })
  providedBy: number;

  @Column({ type: DataType.JSON, allowNull: false })
  medicines: object;

  @Column({ type: DataType.STRING, allowNull: true })
  notes: string;

  @BelongsTo(() => Doctor)
  doctor: Doctor;
}
