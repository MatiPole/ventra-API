import { boolean } from "joi";
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
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: false,
  },
  venue: {
    type: String,
    required: true,
  },
  zone: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    contentType: String,
    required: false,
  },
  ticketCount: {
    type: Number,
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
  isFree: {
    type: Boolean,
    required: false,
  },
  termsAndConditions: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Events", eventsSchema);
