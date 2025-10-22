import sequelize from "./config/database.js";
import { Role, User } from "./models/index.js";
import { hashPassword } from "./utils/bcrypt.js";

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); 


    const adminRole = await Role.create({ name: "Administrador" });
    const advisorRole = await Role.create({ name: "Asesor" });


    const adminPassword = await hashPassword("admin123");
    const advisorPassword = await hashPassword("asesor123");

    await User.create({
      name: "Admin User",
      email: "admin@bankapp.com",
      password: adminPassword,
      roleId: adminRole.id,
    });

    await User.create({
      name: "Asesor User",
      email: "asesor@bankapp.com",
      password: advisorPassword,
      roleId: advisorRole.id,
    });

    console.log("✅ Base de datos poblada con éxito");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al poblar la base de datos:", error);
    process.exit(1);
  }
};

seedDatabase();
