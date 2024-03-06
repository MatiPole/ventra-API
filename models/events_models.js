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
    required: true,
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
    required: true,
  },
  visibility: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isFree: {
    type: Boolean,
    required: true,
  },
  termsAndConditions: {
    type: Boolean,
    required: true,
  },
  approve: {
    type: String,
    required: false,
    default: "pending",
  },
  userId: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
  },
});

export default mongoose.model("Events", eventsSchema);
