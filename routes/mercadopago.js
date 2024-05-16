import express from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";
import verifyToken from "../middlewares/auth.js";
const route = express.Router();

const client = new MercadoPagoConfig({
  accessToken:
    "APP_USR-2730920564853175-021919-09b583793e4307a03785649edc6fd08e-179063310",
});
//APP_USR-2730920564853175-021919-09b583793e4307a03785649edc6fd08e-179063310
//TEST-2730920564853175-021919-ba8f8df42df40577b84de31dd5628fde-179063310
route.post("/", verifyToken, async (req, res) => {
  const timestamp = new Date().getTime();
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
        success: `https://www.ventra.com.ar/detalle/comprar/pago/${req.body.name}/${req.body.eventId}/${req.body.amount}/${timestamp}`,
        failure: "https://www.ventra.com.ar",
        pending: "https://www.ventra.com.ar",
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

route.post("/resell", verifyToken, async (req, res) => {
  const timestamp = new Date().getTime();
  console.log(req.body);
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
        success: `https://www.ventra.com.ar/reventa/comprar/${req.body.title}/${req.body.eventId}/${req.body.ticketId}/${req.body.resellId}/${timestamp}`,
        failure: "https://www.ventra.com.ar",
        pending: "https://www.ventra.com.ar",
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
      error: "Error al crear la preferencia de reventa",
    });
  }
});

export default route;
