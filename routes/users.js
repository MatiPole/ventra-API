import express from "express";
import verifyToken from "../middlewares/auth.js";
import {
  usersList,
  findByEmail,
  findUser,
  createUser,
  updateUser,
  deleteUser,
  limitUsers,
  orderByEmail,
} from "../controllers/users_controller.js";
import Joi from "joi";
const route = express.Router();

//Obtenemos todos los usuarios registrados
route.get("/" /* , verifyToken */, (req, res) => {
  let result = usersList();
  result
    .then((users) => {
      res.json({
        users,
      });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

//Buscar usuario por id
route.get("/:id" /* , verifyToken */, (req, res) => {
  let result = findUser(req.params.id);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

//Validacioón para crear usuarios utilizando joi.
const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required(), //es requerido y tiene que tener entre 3 y 20 caracteres
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[^\\s]{6,20}$"
      )
    )
    .required(), //requiere al menos una letra minúscula, una letra mayúscula, un número y al menos uno de los caracteres especiales(!@#$%^&*)
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
});

//  CREAR USUARIO
route.post("/", (req, res) => {
  let body = req.body;
  const { error, value } = schema.validate({
    username: body.username,
    email: body.email,
    password: body.password,
  });
  if (!error) {
    let result = createUser(body);
    result
      .then((user) => {
        res.json({
          value: user,
        });
      })
      .catch((err) => {
        res.status(400).json({
          err,
          message:
            "Error al crear un nuevo usuario, verifique los datos ingresados",
        });
      });
  } else {
    res.status(400).json({
      error,
    });
  }
});

//Modifición de información del usuario (username, email y password)
route.put("/update-user/:id" /* , verifyToken */, (req, res) => {
  let result = updateUser(req.body, req.params.id);
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

//Eliminar usuario por id
route.delete("/:id" /* , verifyToken */, (req, res) => {
  let result = deleteUser(req.params.id);
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

//Paginado
route.get("/limit-users" /* , verifyToken */, (req, res) => {
  let result = limitUsers(req.query.limit);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Buscar usuario por email
route.get("/email/:email" /* , verifyToken */, (req, res) => {
  let result = findByEmail(req.params.email);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

//Ordenamiento por email
route.get("/order-by-email" /* , verifyToken */, (req, res) => {
  let result = orderByEmail();
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

export default route;
