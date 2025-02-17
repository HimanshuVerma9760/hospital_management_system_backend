import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Modules } from './module.model';
import Role from './role.model';
import RoleHasPermission from './rolesHasPermissions.model';

@Table({ tableName: 'Permissions', timestamps: true })
export default class Permission extends Model<Permission> {
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
  details: string;

  @ForeignKey(() => Modules)
  @Column({ type: DataType.INTEGER, allowNull: false})
  module_id: number;

  @BelongsTo(() => Modules)
  module: Modules;

  @BelongsToMany(() => Role, () => RoleHasPermission)
  roles: Role[];
 
  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  deletedAt?: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
  createdAt?: any;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
  updatedAt?: any;
}
