"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connect_1 = __importDefault(require("../../config/db.connect"));
const role_1 = __importDefault(require("./role"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT
    },
    username: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    status: {
        allowNull: true,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    roleId: {
        allowNull: true,
        type: sequelize_1.DataTypes.BIGINT
    }
}, { timestamps: true, sequelize: db_connect_1.default, modelName: "User", underscored: false });
User.belongsTo(role_1.default, { foreignKey: 'roleId' });
exports.default = User;
