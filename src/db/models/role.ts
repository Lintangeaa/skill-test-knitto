import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/db.connect"

interface RoleAttributes {
  id?: number,
  roleName?: string | null,
  active?: boolean | true

  createdAt?: Date,
  updatedAt?: Date
}

export interface RoleInput extends Optional<RoleAttributes,'id'>{}
export interface RoleOutput extends Required<RoleAttributes>{}

class Role extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
  public id!: number
  public roleName!: string | null
  public active!: boolean | true

  public createdAt!: Date
  public updatedAt!: Date
}

Role.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  roleName: {
    allowNull: true,
    type: DataTypes.STRING
  },
  active: {
    allowNull: true,
    type: DataTypes.BOOLEAN
  }
}, {timestamps:true, sequelize: connection, modelName: "Role", underscored: false})

export default Role