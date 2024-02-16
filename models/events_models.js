import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false,
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
  address: {
    type: Object,
    required: true,
  },
  zone: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
  },
  ticketCount: {
    type: Number,
    required: false,
  },
  visibility: {
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
