import express from "express";
import verifyToken from "../middlewares/auth.js";
import Users from "../models/users_models.js";
import {
  usersList,
  findByEmail,
  findUser,
  createUser,
  updateUser,
  completeCreatorData,
  deleteUser,
  limitUsers,
  orderByEmail,
  sendEmailForgotPass,
  resetPassword,
} from "../controllers/users_controller.js";
import Joi from "joi";
import bcrypt from "bcrypt";
const route = express.Router();

//Obtenemos todos los usuarios registrados
route.get("/", verifyToken, (req, res) => {
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
route.get("/:id", verifyToken, (req, res) => {
  let result = findUser(req.params.id);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

//Validación para crear usuarios utilizando joi.
const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[^\\s]{6,}$"))
    .required(), // requerir al menos una letra minúscula, una letra mayúscula y un número
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
});

//  CREAR USUARIO
// CREAR USUARIO
route.post("/", async (req, res) => {
  let body = req.body;
  const { error } = schema.validate({
    username: body.username,
    email: body.email,
    password: body.password,
  });

  if (error) {
    // Verificar qué campo falló y devolver el mensaje de error correspondiente
    switch (error.details[0].context.key) {
      case "username":
        return res.status(400).json({
          error:
            "El nombre de usuario debe tener entre 3 y 20 caracteres alfanuméricos.",
        });
      case "password":
        return res.status(400).json({
          error:
            "La contraseña debe tener al menos 6 caracteres, una letra minúscula, una letra mayúscula y un número.",
        });
      case "email":
        return res
          .status(400)
          .json({ error: "El correo electrónico no es válido." });
      default:
        return res
          .status(400)
          .json({ error: "Error en los datos proporcionados." });
    }
  }

  try {
    // Verificar si el correo electrónico ya está registrado
    const existingUser = await Users.findOne({ email: body.email });
    if (existingUser) {
      return res.status(400).json({
        error: "El correo electrónico ya está registrado.",
      });
    }

    // Si el correo electrónico no está registrado, crea el usuario
    let result = createUser(body);
    result
      .then((user) => {
        res.json({ value: user });
      })
      .catch((err) => {
        res.status(400).json({
          err,
          message:
            "Error al crear un nuevo usuario, verifique los datos ingresados",
        });
      });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor." });
  }
});

//Modifición de información del usuario (username, email y password)
route.put("/update-user/:id", verifyToken, (req, res) => {
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

//Completar datos bancarios
route.put("/complete-creator-data/:id", verifyToken, (req, res) => {
  let result = completeCreatorData(req.body, req.params.id);
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
route.delete("/:id", verifyToken, (req, res) => {
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
route.get("/limit-users", verifyToken, (req, res) => {
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
route.get("/email/:email", verifyToken, (req, res) => {
  let result = findByEmail(req.params.email);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

route.get("/resetpass/email/:email", (req, res) => {
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
route.get("/order-by-email", verifyToken, (req, res) => {
  let result = orderByEmail();
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

route.post("/forgot-password", (req, res) => {
  const email = req.body.email;
  let result = sendEmailForgotPass(email);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

route.patch("/reset-password", verifyToken, (req, res) => {
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 10);
  let result = resetPassword(email, password);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
});

export default route;
