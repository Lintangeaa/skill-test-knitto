import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/db.connect"
import Role from "./role";

interface UserAttributes {
  id?: number,
  username?: string | null,
  password?: string | null,
  status?: boolean | null,
  roleId?: number

  createdAt?: Date,
  updatedAt?: Date
}

export interface UserInput extends Optional<UserAttributes, 'id'>{}
export interface UserOutput extends Required<UserAttributes>{}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public username!: string | null;
  public password!: string | null;
  public status!: boolean | null;
  public  roleId!: number 

  public createdAt!: Date;
  public updatedAt!: Date;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  username: {
    allowNull: true,
    type: DataTypes.STRING
  },
  password: {
    allowNull: true,
    type: DataTypes.STRING
  },
  status: {
    allowNull: true,
    type: DataTypes.BOOLEAN
  },
  roleId: {
    allowNull: true,
    type: DataTypes.BIGINT
  }
},{timestamps:true, sequelize: connection, modelName: "User", underscored: false})

User.belongsTo(Role, {foreignKey: 'roleId'})

export default User