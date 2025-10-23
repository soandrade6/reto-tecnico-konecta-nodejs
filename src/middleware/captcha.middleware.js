import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const verifyCaptcha = async (req, res, next) => {
  try {
    const { captchaToken } = req.body; 
    if (!captchaToken) {
      return res.status(400).json({ message: "Captcha requerido" });
    }

    const secretKey = process.env.RECAPTCHA_SECRET;
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

    const response = await axios.post(verificationURL);
    const data = response.data;

    if (!data.success) {
      return res.status(400).json({ message: "Captcha inválido" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Error validando captcha", error: error.message });
  }
};
