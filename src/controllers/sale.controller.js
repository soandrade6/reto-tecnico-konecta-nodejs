import { Sale, User } from "../models/index.js";


export const createSale = async (req, res) => {
  try {
    const { product, requestedAmount, franchise, rate } = req.body;
    const userId = req.user.id;

   
    if (!product || !requestedAmount) {
      return res
        .status(400)
        .json({ message: "Los campos 'product' y 'requestedAmount' son obligatorios." });
    }

    if (product === "Tarjeta de Credito" && !franchise) {
      return res.status(400).json({ message: "La franquicia es obligatoria." });
    }

    if (
      (product === "Credito de Consumo" || product === "Libranza Libre Inversión") &&
      !rate
    ) {
      return res.status(400).json({ message: "La tasa es obligatoria." });
    }

    const newSale = await Sale.create({
      product,
      requestedAmount,
      franchise: franchise || null,
      rate: rate || null,
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

    const whereCondition = user.role === 1 ? {} : { userCreatedId: user.id };

    const sales = await Sale.findAll({
      where: whereCondition,
      include: [
        {
          model: User,
          as: "createdBy",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    
    const totalCupo = sales.reduce((sum, sale) => {
      const value = sale.requestedAmount || "0";
      const cleanValue = parseFloat(value.toString().replace(/\./g, "")) || 0;
      return sum + cleanValue;
    }, 0);

    res.json({ totalCupo, sales });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "createdBy",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!sale) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }

    res.json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateSale = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ message: "Venta no encontrada" });

    const { product, requestedAmount, franchise, rate } = req.body;

    await sale.update({
      product: product || sale.product,
      requestedAmount: requestedAmount || sale.requestedAmount,
      franchise: franchise || sale.franchise,
      rate: rate || sale.rate,
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
