let orderArray = [];

// ================= ADD ORDER =================
export const addOrder = (req, res) => {
  try {
    const { userId, items, shippingAddress } = req.body;

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ message: "Missing fields" });
    }

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

    orderArray.push(newOrder);

    res.status(201).json({
      message: "Order created",
      order: newOrder
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL ORDERS =================
export const getAllOrders = (req, res) => {
  try {
    const result = orderArray.filter(o => !o.isDeleted);

    res.status(200).json({
      count: result.length,
      orders: result
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE ORDER =================
export const updateOrder = (req, res) => {
  try {
    const { orderId } = req.params;

    const order = orderArray.find(o => o.orderId === orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.orderStatus === "shipped" || order.orderStatus === "delivered") {
      return res.status(400).json({ message: "Cannot update after shipping" });
    }

    Object.assign(order, req.body);

    res.status(200).json({
      message: "Order updated",
      order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE ORDER =================
export const deleteOrder = (req, res) => {
  try {
    const { orderId } = req.params;

    const order = orderArray.find(o => o.orderId === orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.orderStatus === "shipped" || order.orderStatus === "delivered") {
      return res.status(400).json({ message: "Cannot delete after shipping" });
    }

    order.isDeleted = true;
    order.orderStatus = "cancelled";

    res.status(200).json({
      message: "Order cancelled",
      order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};