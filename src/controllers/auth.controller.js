import { User } from "../models/index.js";
import { comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const isValid = await comparePassword(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Contraseña invalida" });

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
