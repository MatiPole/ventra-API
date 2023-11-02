import "dotenv/config";
import jwt from "jsonwebtoken";

let verifyToken = (req, res, next) => {
  let token = req.get("auth");
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      res.status(400).json({
        err,
      });
    }
    req.usuario = decoded.usuario;
    next();
  });
};

export default verifyToken;
