import User from "./user.model.js";
import Role from "./role.model.js";
import Sale from "./sale.model.js";

Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

User.hasMany(Sale, { foreignKey: "userCreatedId" });
Sale.belongsTo(User, { foreignKey: "userCreatedId", as: "createdBy" });
Sale.belongsTo(User, { foreignKey: "userCreatedId", as: "updatedBy" });

export { User, Role, Sale };
