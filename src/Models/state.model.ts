import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import City from './city.model';

@Table({ tableName: 'States', timestamps: true })
export class State extends Model<State> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => City)
  cities: City[];

  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  deletedAt?: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
  createdAt?: any;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
  updatedAt?: any;
}
// @Table({ tableName: 'Specializations', timestamps: true })
// export class Specialization extends Model<Specialization> {
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//   })
//   id: number;
//   @Column({ type: DataType.STRING, allowNull: false })
//   name: string;
//   @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
//   createdAt?: any;
//   @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
//   updatedAt?: any;
//   @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
//   deletedAt?: Date;
// }