import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/database.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import saleRoutes from "./routes/sale.routes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined")); //formato de logs


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sales", saleRoutes);
app.get("/api/health", (res) => {
  res.status(200).json({ status: "ok", message: "Backend is running" });
});


sequelize.sync({ alter: true })
  .then(() => console.log("DB conectada y sincronizada"))
  .catch((err) => console.error("Error DB:", err));

export default app;
