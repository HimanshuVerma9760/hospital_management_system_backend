import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Diseases', timestamps: true })
export default class Disease extends Model<Disease> {
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
