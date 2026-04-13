import Cart from "../model/cart.model.js";

export const createCartService = async ({ userId, products }) => {
  
  const existingCart = await Cart.findOne({ userId });

  if (existingCart) {
    throw new Error("Cart already exists for this user");
  }

  const newCart = await Cart.create({
    userId,
    products
  });

  return {
    _id: newCart._id,
    userId: newCart.userId,
    products: newCart.products
  };
};
