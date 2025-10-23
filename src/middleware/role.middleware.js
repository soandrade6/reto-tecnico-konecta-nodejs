export const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== 1) {  
      return res.status(403).json({ message: "Acceso denegado: solo administradores" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Error al validar rol", error: error.message });
  }
};
