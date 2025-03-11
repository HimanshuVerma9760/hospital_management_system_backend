import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import Forms from './forms.model';

@Table({ tableName: 'FormInputs', timestamps: true })
export default class FormInputs extends Model<FormInputs> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.JSON, allowNull: false })
  inputType: object;

  @ForeignKey(() => Forms)
  @Column({ type: DataType.INTEGER, allowNull: false })
  formId: number;

  @BelongsTo(() => Forms)
  form: Forms;

  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  deletedAt?: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
  createdAt?: any;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Date.now() })
  updatedAt?: any;
}
