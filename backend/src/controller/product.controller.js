let productArray = [];
let productId = 0;

export async function createProduct(req, res) {
  const { name, description, price, stock, category } = req.body;

  if (!name || !description || price === undefined || stock === undefined || !category) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  const existingProduct = productArray.find(p => p.name === name);
  if (existingProduct) {
    return res.status(400).json({ message: "Product already exists" });
  }

  const newProduct = {
    id: productId++,
    name,
    description,
    price,
    stock,
    category
  };

    productArray.push(newProduct);
  res.status(201).json({
    message: "Product created successfully",
    product: newProduct
  });
}

// GET ALL
export async function getProducts(req, res) {
  res.status(200).json({
    message: "All products",
    products: productArray
    
  });
}

// UPDATE
export async function updateProduct(req, res) {
  const { id } = req.params;
  const product = productArray.find(p => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, description, price, stock, category } = req.body;

  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  if (category) product.category = category;

  res.status(200).json({
    message: "Product updated",
    product
  });
}

// DELETE
export async function deleteProduct(req, res) {
  const { id } = req.params;

  const index = productArray.findIndex(p => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  productArray.splice(index, 1);
  
  res.status(200).json({
    message: "Product deleted"
  });
}