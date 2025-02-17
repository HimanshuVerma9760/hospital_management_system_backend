import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import Role from './role.model';
import { Modules } from './module.model';

@Table({ tableName: 'RolesHasModules', timestamps: true })
export default class RoleHasModule extends Model<RoleHasModule> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false })
  role_id: number;

  @BelongsTo(() => Role)
  role: Role;

  @ForeignKey(() => Modules)
  @Column({ type: DataType.INTEGER, allowNull: false })
  module_id: number;

  @BelongsTo(() => Modules)
  module: Modules;

  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  deletedAt?: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
  createdAt?: any;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
  updatedAt?: any;
}
