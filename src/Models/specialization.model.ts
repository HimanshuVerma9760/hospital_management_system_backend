import { Column, DataType, HasMany, Table, Model } from 'sequelize-typescript';
import Doctor from './doctor.model';

@Table({ tableName: 'Specializations', timestamps: true })
export default class Specialization extends Model<Specialization> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
  createdAt?: any;
  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
  updatedAt?: any;
  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  deletedAt?: Date;
}
