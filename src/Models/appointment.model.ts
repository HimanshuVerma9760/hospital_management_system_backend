import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import Disease from './disease.model';
import Hospital from './hospital.model';
import Doctor from './doctor.model';

@Table({
  tableName: 'appointments',
  timestamps: true,
  paranoid: true, // Enables soft delete
})
export class Appointment extends Model<Appointment> {
  @Column({
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    allowNull: false,
    type: DataTypes.STRING,
  })
  patientName: string;

  @Column({
    allowNull: false,
    type: DataTypes.STRING,
  })
  patientEmail: string;

  @ForeignKey(() => Disease)
  @Column({
    allowNull: false,
    type: DataTypes.INTEGER,
  })
  disease_id: number;

  @BelongsTo(() => Disease)
  disease: Disease;

  @ForeignKey(() => Hospital)
  @Column({
    allowNull: false,
    type: DataTypes.INTEGER,
  })
  hospital_id: number;

  @BelongsTo(() => Hospital)
  hospital: Hospital;

  @ForeignKey(() => Doctor)
  @Column({
    allowNull: false,
    type: DataTypes.INTEGER,
  })
  doctor_id: number;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @Column({
    allowNull: false,
    type: DataTypes.DATE,
  })
  appointment_datetime: Date;

  @Column({
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'Scheduled',
  })
  status: string;

  @Column({
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  })
  createdAt: Date;

  @Column({
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  })
  updatedAt: Date;

  @Column({
    allowNull: true,
    type: DataTypes.DATE,
    defaultValue: null,
  })
  deletedAt: Date;
}
