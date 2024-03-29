import mongoose from "mongoose";

const ticketsSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  eventVenue: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: false,
  },
  eventTime: {
    type: String,
    required: true,
  },
  eventPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: false,
    default: "available",
  },
});

export default mongoose.model("Tickets", ticketsSchema);
