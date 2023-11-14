import express from "express";
import verifyToken from "../middlewares/auth.js";
import {
  eventsList,
  userEventsList,
  findEvent,
  createEvent,
  updateEvent,
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
  let result = eventsList();
  result
    .then((events) => {
      res.json(events);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
//Búsqueda de los eventos del usuario
route.get("/userEvents/:userId", (req, res) => {
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
route.post("/", verifyToken, (req, res) => {
  let result = createEvent(req);
  result
    .then((event) => {
      res.json({
        event,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Actualizar los datos del evento.
route.put("/:id", (req, res) => {
  let result = updateEvent(req.body, req.params.id);
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
route.delete("/:id", (req, res) => {
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
//Búsqueda por nombre
/* route.get("/nombre/:nombre", verifyToken, (req, res) => {
  let result = findPorNombre(req.params.nombre);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
}); */

//Filtros
//Filtro por pais de origen
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

//Filtro por género
/* route.get("/genero/:genero", verifyToken, (req, res) => {
  let result = filterGenero(req.params.genero);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}); */

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
