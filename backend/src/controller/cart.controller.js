let cart=[];
let carts = [];

export function addToCart(req, res) {
  const { userId, productId, quantity } = req.body;

  if (userId === undefined || productId === undefined || quantity === undefined) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  let cart = carts.find(c => c.userId === Number(userId));

  if (!cart) {
    cart = { userId: Number(userId), products: [] };
    carts.push(cart);
  }

  const productIndex = cart.products.findIndex(
    p => p.productId === Number(productId)
  );
 const existingProduct = cart.products.find(
      p => p.productId === Number(productId)
    );

    if (existingProduct) {
      return res.status(400).json({
        message: "Product already in cart"
      });
    }
  if (productIndex !== -1) {
    cart.products[productIndex].quantity += Number(quantity);
  } else {
    cart.products.push({
      productId: Number(productId),
      quantity: Number(quantity)
    });
  }

  res.status(200).json({
    message: "Product added to cart",
    cart
  });
}



export async function getCart(req, res) {
  const userId = Number(req.params.userId);

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({
      message: "Cart fetched",
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching cart",
      error: error.message
    });
  }
}


export async function removeFromCart(req, res) {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: Number(userId) },
      {
        $pull: {
          products: { productId: Number(productId) }
        }
      },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({
      message: "Product removed",
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: "Error removing product",
      error: error.message
    });
  }
}

export async function updateCart(req, res) {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || quantity === undefined) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    const cart = await Cart.findOneAndUpdate(
      {
        userId: Number(userId),
        "products.productId": Number(productId)
      },
      {
        $set: {
          "products.$.quantity": Number(quantity)
        }
      },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({
      message: "Cart updated",
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating cart",
      error: error.message
    });
  }
}