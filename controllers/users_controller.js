import Users from "../models/users_models.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import "dotenv/config";
import jwt from "jsonwebtoken";

async function usersList() {
  let user = await Users.find({ status: true });
  return user;
}

async function findUser(id) {
  let user = await Users.find({ _id: id });
  return user;
}

async function createUser(body) {
  let user = new Users({
    username: body.username,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: 2,
  });
  return await user.save();
}

async function updateUser(body, id) {
  let user = await Users.updateOne(
    { _id: id },
    {
      $set: {
        username: body.username,
        nameOwner: body.nameOwner,
        cuitCuil: body.cuitCuil,
        bank: body.bank,
        cbuCvu: body.cbuCvu,
        completeData: true,
      },
    }
  );
  return user;
}

async function completeCreatorData(body, id) {
  let user = await Users.updateOne(
    { _id: id },
    {
      $set: {
        nameOwner: body.nameOwner,
        cuitCuil: body.cuitCuil,
        bank: body.bank,
        cbuCvu: body.cbuCvu,
        completeData: true,
      },
    }
  );
  return user;
}

async function deleteUser(id) {
  let user = await Users.deleteOne({ _id: id });
  return user;
}

async function limitUsers(num) {
  let users = await Users.find().limit(num);
  return users;
}
async function findByEmail(email) {
  let user = await Users.find({ email: email });
  return user;
}

async function orderByEmail() {
  let users = await Users.find().sort({ email: 1 });
  return users;
}

async function sendEmailForgotPass(email) {
  const jwToken = jwt.sign(
    {
      user: { email: email },
    },
    process.env.SEED,
    { expiresIn: "10m" }
  );

  const mailData = {
    name: "Ventra",
    email: email,
    subject: "Cambiar contraseña",
    content: `
    Hacé click en el link para recuperar tu contraseña
      <a href="https://www.ventra.com.ar/recuperar-contrasena/?${jwToken}/${email}" target="_blank">Recuperar contraseña</a>
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
  const user = await Users.findOne({ email: email });
  if (!user) {
    return "El email no está registrado";
  } else {
    await transporter
      .sendMail({
        from: `"${mailData.name}" <${process.env.EMAIL}>`,
        to: mailData.email,
        subject: mailData.subject,
        html: mailData.content,
      })
      .then(() => console.log("email enviado"))
      .catch((err) => console.log(err + "error al enviar el mail"));
  }
}

async function resetPassword(email, password) {
  const user = await Users.updateOne(
    { email: email },
    { $set: { password: password } }
  );
  if (user.modifiedCount === 1) {
    const user = await Users.findOne({ email: email });
    return user;
  }
}

export {
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
};
