import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Sale = sequelize.define("Sale", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  product: {
    type: DataTypes.ENUM("Credito de Consumo", "Libranza Libre Inversión", "Tarjeta de Credito"),
    allowNull: false,
  },
  requestedAmount: { type: DataTypes.STRING(20), allowNull: false },
  franchise: { type: DataTypes.ENUM("AMEX", "VISA", "MASTERCARD"), allowNull: true },
  rate: { type: DataTypes.DECIMAL(4, 2), allowNull: true },
  userCreatedId: { type: DataTypes.INTEGER, allowNull: false },
  userUpdatedId: { type: DataTypes.INTEGER, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

export default Sale;
