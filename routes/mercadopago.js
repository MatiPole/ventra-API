import express from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";
import verifyToken from "../middlewares/auth.js";
const route = express.Router();

const client = new MercadoPagoConfig({
  accessToken:
    "TEST-2730920564853175-021919-ba8f8df42df40577b84de31dd5628fde-179063310",
});

route.post("/", verifyToken, async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
        },
      ],
      back_urls: {
        success: `http://localhost:5173/detalle/comprar/pago/${req.body.name}/${req.body.eventId}/${req.body.amount}`,
        failure: "http://localhost:3000",
        pending: "http://localhost:3000",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });

    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al crear la preferencia",
    });
  }
});

export default route;
