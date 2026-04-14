import express from "express";
const app = express();

import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";

//import connectDB from "./config/database.js";
import dotenv from "dotenv";
dotenv.config();

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
//connectDB();


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})




