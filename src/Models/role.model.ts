import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Modules } from './module.model';
import Permission from './permission.model';
import RoleHasPermission from './rolesHasPermissions.model';
import RoleHasModule from './roleHasModules.model';

@Table({ timestamps: true, tableName: 'Roles' })
export default class Role extends Model<Role> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  details: string;

  @BelongsToMany(() => Modules, () => RoleHasModule)
  modules: Modules[];

  @BelongsToMany(() => Permission, () => RoleHasPermission)
  permissions: Permission[];

  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  deletedAt?: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
  createdAt?: any;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
  updatedAt?: any;
}
