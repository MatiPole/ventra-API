import Tickets from "../models/tickets_models.js";
import Users from "../models/users_models.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import "dotenv/config";

async function createTicket(body) {
  try {
    let checkTimestamp = await findTimestamp(body.timestamp);

    if (checkTimestamp.length === 0) {
      let ticket = new Tickets({
        eventId: body.eventId,
        userId: body.userId,
        eventName: body.eventName,
        eventVenue: body.eventVenue,
        eventDate: body.eventDate,
        eventTime: body.eventTime,
        eventPrice: body.eventPrice,
        status: body.status,
        timestamp: body.timestamp,
      });
      ticket.createdAt = Date.now();
      return await ticket.save();
    } else {
      throw new Error("Ya existe un ticket con el mismo timestamp.");
    }
  } catch (error) {
    console.error("Error al crear el ticket:", error);
    throw new Error("Error al crear el ticket.");
  }
}

async function findTimestamp(timestamp) {
  let ticket = await Tickets.find({ timestamp: timestamp });
  return ticket;
}

async function findTickets(id) {
  let event = await Tickets.find({ userId: id });
  return event;
}

async function findSoldTickets(id) {
  let event = await Tickets.find({ eventId: id });
  return event;
}

async function checkEventToDelete(id) {
  try {
    let tickets = await Tickets.find({ eventId: id });

    // Verifica si hay algún ticket asociado al evento
    if (tickets.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

async function updateTicket(req, id) {
  let ticket = await Tickets.updateOne(
    { _id: id },
    { $set: { state: req.body.state } }
  );
  return ticket;
}

async function transferTicket(req, id) {
  try {
    // Buscar el ticket existente por su _id
    let ticket = await Tickets.findOne({ _id: id });

    // Clonar el ticket existente con un nuevo _id
    const newTicket = new Tickets({
      ...ticket.toObject(), // Convertir el documento de Mongoose a un objeto para clonarlo
      _id: new mongoose.Types.ObjectId(), // Generar un nuevo ObjectId para el nuevo ticket
      userId: req.body.userId,
    });
    await newTicket.save();
    await Tickets.deleteOne({ _id: id });
    let user = await Users.findOne({ _id: req.body.userId });
    let email = user.email;

    const mailData = {
      name: "Ventra",
      email: email,
      subject: "Te transfirieron un ticket!",
      content: `
   Es tu día de suerte! Alguien te transfirió un ticket!
      <a href="http://localhost:5173/iniciar-sesion" target="_blank">Ver mi ticket</a>
  `,
    };

    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASS,
      },
    });

    await transporter
      .sendMail({
        from: `"${mailData.name}" <${process.env.EMAIL}>`,
        to: mailData.email,
        subject: mailData.subject,
        html: mailData.content,
      })
      .then(() => console.log("email enviado"))
      .catch((err) => console.log(err + "error al enviar el mail"));

    return newTicket;
  } catch (error) {
    throw error;
  }
}

async function changeTicketsToAvaible(eventId) {
  try {
    // Buscar todos los tickets que contengan el eventId
    const tickets = await Tickets.find({ eventId: eventId });
    console.log(eventId);
    // Modificar el campo state de cada ticket encontrado a 'avaiable'
    await Promise.all(
      tickets.map(async (ticket) => {
        ticket.state = "available";
        await ticket.save();
      })
    );

    return tickets.length; // Retorna el número de tickets modificados
  } catch (error) {
    throw error;
  }
}

async function deleteTicket(ticketId) {
  let ticket = await Tickets.deleteOne({ _id: ticketId });
  return ticket;
}

export {
  createTicket,
  findTickets,
  checkEventToDelete,
  deleteTicket,
  updateTicket,
  findSoldTickets,
  transferTicket,
  changeTicketsToAvaible,
};
