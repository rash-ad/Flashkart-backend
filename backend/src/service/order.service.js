import order from "../model/order.model.js";
export const createOrderService = (data) => {
  const { userId, items, shippingAddress } = data;

  let totalAmount = 0;

  const formattedItems = items.map(item => {
    totalAmount += item.price * item.quantity;

    return {
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      price: item.price
    };
  });

  const newOrder = {
    orderId: Date.now().toString(),
    userId,
    items: formattedItems,
    totalAmount,
    orderStatus: "pending",
    shippingAddress,
    isDeleted: false,
    createdAt: new Date()
  };

  orders.push(newOrder);

  return newOrder;
};
