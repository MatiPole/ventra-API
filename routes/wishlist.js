import express from "express";
import verifyToken from "../middlewares/auth.js";
import {
  createWishlist,
  findWishlist,
} from "../controllers/wishlist_controller.js";
const route = express.Router();

route.post("/", async (req, res) => {
  try {
    const wishlist = await createWishlist(req.body);
    res.json({ wishlist });
  } catch (err) {
    res.status(400).json({ error: err.message || "Error wishlist" });
  }
});

//Búsqueda por id
route.get("/:id", (req, res) => {
  let result = findWishlist(req.params.id);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

export default route;
