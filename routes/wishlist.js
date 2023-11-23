import express from "express";
import verifyToken from "../middlewares/auth.js";
import {
  createWishlist,
  findWishlist,
  deleteWishlist,
} from "../controllers/wishlist_controller.js";
const route = express.Router();

route.post("/", verifyToken, async (req, res) => {
  try {
    const wishlist = await createWishlist(req.body);
    res.json({ wishlist });
  } catch (err) {
    res.status(400).json({ error: err.message || "Error wishlist" });
  }
});

//Búsqueda por id del usuario
route.get("/:id", verifyToken, (req, res) => {
  let result = findWishlist(req.params.id);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

//Eliminar un favorito (wishlist)
route.delete("/:eventId/:userId", verifyToken, (req, res) => {
  let result = deleteWishlist(req.params.eventId, req.params.userId);
  result
    .then((value) => {
      res.json({
        value,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

export default route;
