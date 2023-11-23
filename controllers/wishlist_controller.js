import Wishlist from "../models/wishlist_models.js";

async function createWishlist(body) {
  const existingWishlistItem = await Wishlist.findOne({
    eventId: body.eventId,
    userId: body.userId,
  });

  if (existingWishlistItem) {
    // Si ya existe, devolver un error o realizar la lógica que desees
    throw new Error("Este evento ya está en tu lista de deseos.");
  }
  let wishlist = new Wishlist({
    eventId: body.eventId,
    userId: body.userId,
    eventName: body.eventName,
    eventVenue: body.eventVenue,
    eventDate: body.eventDate,
    eventTime: body.eventTime,
    eventPrice: body.eventPrice,
    status: body.status,
  });
  return await wishlist.save();
}

async function findWishlist(id) {
  let wishlist = await Wishlist.find({ userId: id });
  return wishlist;
}

async function deleteWishlist(eventId, userId) {
  let wishlist = await Wishlist.deleteOne({ eventId: eventId, userId: userId });
  return wishlist;
}

export { createWishlist, findWishlist, deleteWishlist };
