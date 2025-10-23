import { User, Role } from "../models/index.js";
import { hashPassword } from "../utils/bcrypt.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, roleId } = req.body;

    if (!name || !email || !password || !roleId)
      return res.status(400).json({ message: "Todos los campos son obligatorios" });

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "El correo ya está registrado" });

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      roleId,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//(only ADMIN)
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Role, attributes: ["name"] }],
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Role, attributes: ["name"] }],
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { name, email, password, roleId } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const updatedData = {
      name: name || user.name,
      email: email || user.email,
      roleId: roleId || user.roleId,
      updatedAt: new Date(),
    };

    if (password) updatedData.password = await hashPassword(password);

    await user.update(updatedData);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await user.destroy();
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
