import { Sale, User } from "../models/index.js";

export const createSale = async (req, res) => {
  try {
    const { product, cupoSolicitado, franquicia, tasa } = req.body;
    const userId = req.user.id;

    if (!product || !cupoSolicitado)
      return res.status(400).json({ message: "Campos obligatorios faltantes" });

    if (product === "Tarjeta de Credito" && !franquicia)
      return res.status(400).json({ message: "La franquicia es obligatoria" });

    if ((product === "Credito de Consumo" || product === "Libranza Libre Inversión") && !tasa)
      return res.status(400).json({ message: "La tasa es obligatoria" });

    const newSale = await Sale.create({
      product,
      cupoSolicitado,
      franquicia: franquicia || null,
      tasa: tasa || null,
      userCreatedId: userId,
      userUpdatedId: userId,
    });

    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getSales = async (req, res) => {
  try {
    const user = req.user;

    const whereCondition =
      user.role === 1 // 1 = ADMIN
        ? {}
        : { userCreatedId: user.id };

    const sales = await Sale.findAll({
      where: whereCondition,
      include: [{ model: User, as: "createdBy", attributes: ["id", "name", "email"] }],
    });

    const totalCupo = sales.reduce((sum, sale) => {
      const cleanValue = parseFloat(sale.cupoSolicitado.replace(/\./g, ""));
      return sum + (isNaN(cleanValue) ? 0 : cleanValue);
    }, 0);

    res.json({ totalCupo, sales });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id, {
      include: [{ model: User, as: "createdBy", attributes: ["id", "name", "email"] }],
    });
    if (!sale) return res.status(404).json({ message: "Venta no encontrada" });
    res.json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateSale = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ message: "Venta no encontrada" });

    const { product, cupoSolicitado, franquicia, tasa } = req.body;

    await sale.update({
      product: product || sale.product,
      cupoSolicitado: cupoSolicitado || sale.cupoSolicitado,
      franquicia: franquicia || sale.franquicia,
      tasa: tasa || sale.tasa,
      userUpdatedId: req.user.id,
      updatedAt: new Date(),
    });

    res.json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ message: "Venta no encontrada" });

    await sale.destroy();
    res.json({ message: "Venta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
