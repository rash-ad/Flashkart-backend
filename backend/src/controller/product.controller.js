export async function createProduct (req, res)  {
  const{ name, description, price, stock, category } = req.body;
  await registerProductService({ name, description, price, stock, category });
  
  if (!name || !description || !price || !stock || !category) {
    return res.status(400).json({ message: "Please provide all fields" });
  }
    const newProduct = { name, description, price, stock, category };
    if (!newProduct) {
        return res.status(400).json({ message: "Product already exists" });
    }
     

  res.status(201).json({ message: "Product  created Successfully" });
}
export async function getProducts (req, res)  {

  res.status(200).json({ message: "Get  all product endpoint" });
}
export async function updateProduct (req, res)  {
    const{ id } = req.params;
    const { name, description, price, stock, category } = req.body;
    const product = products.find(p => p.id === parseInt(id));  
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;
    res.status(200).json({ message: "Updated product endpoint", product });
}
export async  function deleteProduct (req, res)  {    
    const { id } = req.params;  
    const productIndex = products.findIndex(p => p.id === parseInt(id));
    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }
    products.splice(productIndex, 1);
    res.status(200).json({ message: "Deleted product endpoint" });

}


