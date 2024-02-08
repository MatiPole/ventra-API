import express from "express";
import {
  categoriesList,
  findCategory,
  createCategory,
  updateCategories,
  deleteCategory,
} from "../controllers/categories_controller.js";
const route = express.Router();

//Obtenemos todos las categorias
route.get("/", (req, res) => {
  let result = categoriesList();
  result
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Buscar categoria por id
route.get("/:id", (req, res) => {
  let result = findCategory(req.params.id);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

//  CREAR CATEGORIA
route.post("/", async (req, res) => {
  try {
    const ticket = await createCategory(req.body);
    res.json({ ticket });
  } catch (err) {
    res.status(400).json({ error: err.message || "Error creating ticket" });
  }
});

//Modifición CATEGORIA
route.patch("/update-category/:id", (req, res) => {
  let result = updateCategories(req.body, req.params.id);
  result
    .then((value) => {
      res.json({
        value,
      });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

route.delete("/:id", (req, res) => {
  let result = deleteCategory(req.params.id);
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
