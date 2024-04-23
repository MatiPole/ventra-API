import Resell from "../models/resell_models.js";
import Users from "../models/users_models.js";
import nodemailer from "nodemailer";
import "dotenv/config";

async function publishToResell(body) {
  let publishedTicket = new Resell({
    eventId: body.eventId,
    userId: body.userId,
    username: body.username,
    ticketId: body.ticketId,
    ticketPrice: body.ticketPrice,
    status: body.status,
  });
  return await publishedTicket.save();
}

async function getResellList(eventId) {
  let resellList = await Resell.find({ eventId: eventId });
  return resellList;
}

async function deleteReselledTicket(resellId) {
  let deletedTicket = await Resell.deleteOne({ _id: resellId });
  return deletedTicket;
}

async function deleteBoughtResellTicket(resellId) {
  let ticketToDelete = await Resell.findOne({ _id: resellId });
  let userId = ticketToDelete.userId;
  let user = await Users.findOne({ _id: userId });
  let email = user.email;

  const mailData = {
    name: "Ventra",
    email: email,
    subject: "Vendiste tu entrada!",
    content: "Te compraron un ticket de reventa!",
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
    .then(() => {
      console.log("email enviado");
      let deletedTicket = Resell.deleteOne({ _id: resellId });
      console.log(deletedTicket);
      return deletedTicket;
    })
    .catch((err) => console.log(err + "error al enviar el mail"));
}

async function removeAllEventResaleTickets(eventId) {
  let deletedTickets = await Resell.deleteMany({ eventId: eventId });
  return deletedTickets;
}

export {
  publishToResell,
  getResellList,
  deleteReselledTicket,
  deleteBoughtResellTicket,
  removeAllEventResaleTickets,
};
