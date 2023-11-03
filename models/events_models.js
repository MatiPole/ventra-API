import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Events", eventsSchema);
