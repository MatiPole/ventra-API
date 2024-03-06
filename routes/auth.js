import express from "express";
import Users from "../models/users_models.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const route = express.Router();

route.post("/", (req, res) => {
  Users.findOne({ email: req.body.email })
    .then((data) => {
      if (data) {
        const passwordValid = bcrypt.compareSync(
          req.body.password,
          data.password
        );
        if (!passwordValid) {
          return res.status(400).json({
            message: "password-error",
          });
        }
        const jwToken = jwt.sign(
          {
            user: { _id: data._id, email: data.email, role: data.role },
          },
          process.env.SEED,
          { expiresIn: process.env.EXPIRATION }
        );
        res.json({
          user: {
            _id: data._id,
            email: data.email,
            role: data.role,
          },
          jwToken,
        });
      } else {
        res.status(400).json({
          message: "user-error",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        error: "ok",
        msj: "Error en el servicio" + err,
      });
    });
});

export default route;
