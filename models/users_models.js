import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nameOwner: {
    type: String,
    required: false,
  },
  cuitCuil: {
    type: String,
    required: false,
  },
  bank: {
    type: String,
    required: false,
  },
  cbuCvu: {
    type: String,
    required: false,
  },
  completeData: {
    type: Boolean,
  },
  role: {
    type: Number,
    required: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Users", usersSchema);
