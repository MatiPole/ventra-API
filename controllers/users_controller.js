import Users from "../models/users_models.js";
import bcrypt from "bcrypt";

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
  });
  return await user.save();
}

async function updateUser(body, id) {
  let user = await Users.updateOne(
    { _id: id },
    {
      $set: {
        username: body.username,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
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

export {
  usersList,
  findByEmail,
  findUser,
  createUser,
  updateUser,
  deleteUser,
  limitUsers,
  orderByEmail,
};
