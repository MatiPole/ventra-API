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
    required: true,
  },
  eventTime: {
    type: String,
    required: true,
  },
  eventPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Tickets", ticketsSchema);
