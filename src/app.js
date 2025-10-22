import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes.js";
import sequelize from "./config/database.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

sequelize.sync({ alter: true })
  .then(() => console.log("Database connected and synced"))
  .catch((err) => console.error("DB Error:", err));

export default app;
