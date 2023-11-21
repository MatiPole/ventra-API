import Wishlist from "../models/wishlist_models.js";

async function createWishlist(body) {
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

export { createWishlist, findWishlist };
