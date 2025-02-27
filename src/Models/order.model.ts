import { DataTypes } from 'sequelize';
import {
  Column,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { Appointment } from './appointment.model';

@Table({
  tableName: 'orders',
  timestamps: true,
  paranoid: true,
})
export class Order extends Model<Order> {
  @Column({
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Appointment)
  @Column({
    allowNull: false,
    type: DataTypes.INTEGER,
  })
  appointment_id: number;

  @BelongsTo(() => Appointment)
  appointment: Appointment;

  @Column({
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2),
  })
  amount: number;

  @Column({
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'Cash',
  })
  paymentMethod: string;

  @Column({
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'Pending',
  })
  paymentStatus: string;

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
