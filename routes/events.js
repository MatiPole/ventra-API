import express from "express";
import verifyToken from "../middlewares/auth.js";
import multer from "multer";
import path from "path";
import {
  eventsList,
  userEventsList,
  findEvent,
  createEvent,
  updateEvent,
  updateTickets,
  deleteEvent,
  findByName,
  filterCategory,
  orderByPrice,
  limitEvents,
} from "../controllers/events_controllers.js";

const route = express.Router();

//En todas las rutas aplicamos autenticación por medio de nuestro middleware verifyToken

//Búsqueda de todos los eventos
route.get("/", (req, res) => {
  const page = req.query.page;
  const amount = req.query.amount;
  const skip = (page - 1) * amount;
  let result = eventsList(amount, skip);
  result
    .then((events) => {
      res.json(events);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
//Búsqueda de los eventos del usuario
route.get("/userEvents/:userId", verifyToken, (req, res) => {
  let result = userEventsList(req.params.userId);
  result
    .then((events) => {
      res.json(events);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Búsqueda por id
route.get("/:id", (req, res) => {
  let result = findEvent(req.params.id);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

//Agregar un nuevo evento

const storage = multer.diskStorage({
  destination: "./imgs/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

route.post("/", verifyToken, upload.single("cover"), async (req, res) => {
  try {
    const event = await createEvent(req);
    res.json({ event });
  } catch (err) {
    res.status(400).json({ error: err.message || "Error creating event" });
  }
});

//Actualizar los datos del evento.
route.patch("/:id", upload.single("cover"), (req, res) => {
  let result = updateEvent(req, req.params.id);
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

//Actualizar cantidad de entradas restantes.
route.patch("/:id", verifyToken, (req, res) => {
  let result = updateTickets(req.params.id);
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

//Eliminar un evento
route.delete("/:id", verifyToken, (req, res) => {
  let result = deleteEvent(req.params.id);
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

//Buscar por nombre los eventos
route.get("/find-by-name/:name", (req, res) => {
  let result = findByName(req.params.name);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Filtros
//Filtro por categoria
route.get("/category/:category", (req, res) => {
  let result = filterCategory(req.params.category);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Paginado ejemplo: localhost:3000/events/limit-events?page=1&limit=2
route.get("/limit-events", (req, res) => {
  let result = limitEvents(req.query.page, req.query.limit);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

export default route;
