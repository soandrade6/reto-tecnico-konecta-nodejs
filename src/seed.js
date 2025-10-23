import sequelize from "./config/database.js";
import { Role, User, Sale } from "./models/index.js";
import { hashPassword } from "./utils/bcrypt.js";

const seedDatabase = async () => {
  try {
    console.log("🌱 Iniciando proceso de seed...");

    await sequelize.sync({ force: true }); // Limpia y recrea las tablas
    console.log("🗄️ Tablas sincronizadas correctamente");

    // ----- Crear Roles -----
    const roles = await Role.bulkCreate([
      { id: 1, name: "Administrador" },
      { id: 2, name: "Asesor" },
    ]);
    console.log("✅ Roles creados");

    // ----- Crear Usuarios -----
    const adminPassword = await hashPassword("admin123");
    const asesorPassword = await hashPassword("asesor123");

    const users = await User.bulkCreate([
      {
        id: 1,
        name: "Admin Principal",
        email: "admin@bankapp.com",
        password: adminPassword,
        roleId: roles[0].id,
      },
      {
        id: 2,
        name: "Asesor 1",
        email: "asesor1@bankapp.com",
        password: asesorPassword,
        roleId: roles[1].id,
      },
      {
        id: 3,
        name: "Asesor 2",
        email: "asesor2@bankapp.com",
        password: asesorPassword,
        roleId: roles[1].id,
      },
    ]);
    console.log("✅ Usuarios creados");

    // ----- Crear Ventas -----
    const now = new Date();

    await Sale.bulkCreate([
      {
        product: "Credito de Consumo",
        requestedAmount: "5.000.000",
        franchise: null,
        rate: 10.58,
        userCreatedId: users[1].id,
        userUpdatedId: users[1].id,
        createdAt: now,
        updatedAt: now,
      },
      {
        product: "Libranza Libre Inversión",
        requestedAmount: "10.000.000",
        franchise: null,
        rate: 9.75,
        userCreatedId: users[1].id,
        userUpdatedId: users[1].id,
        createdAt: now,
        updatedAt: now,
      },
      {
        product: "Tarjeta de Credito",
        requestedAmount: "3.500.000",
        franchise: "VISA",
        rate: null,
        userCreatedId: users[2].id,
        userUpdatedId: users[2].id,
        createdAt: now,
        updatedAt: now,
      },
      {
        product: "Tarjeta de Credito",
        requestedAmount: "8.000.000",
        franchise: "MASTERCARD",
        rate: null,
        userCreatedId: users[2].id,
        userUpdatedId: users[2].id,
        createdAt: now,
        updatedAt: now,
      },
    ]);
    console.log("✅ Ventas creadas");

    console.log("🎉 Base de datos poblada correctamente.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al poblar la base de datos:", error);
    process.exit(1);
  }
};

seedDatabase();
