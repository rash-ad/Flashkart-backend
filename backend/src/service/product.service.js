import  {Product} from "../model/product.model.js";
export const createProductService = async ({ name, description, price,stock,category }) => {
  const existingProduct = await Product.findOne({ name });
  if (existingProduct) {
    throw new Error("Product already exists");
  }

  const newProduct = await Product.create({
    name,
    description,
    price ,
    stock,
    category

  });

  return {
     name:newProduct.name,
      description:newProduct.description,
      price:newProduct.price,
      stock:newProduct.stock,
      category:newProduct.category
  };
};
