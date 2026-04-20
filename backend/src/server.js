import express from "express";
const app = express();

import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import authRoutes from "./routes/authRoutes.js";
//import connectDB from "./config/database.js";
import dotenv from "dotenv";
dotenv.config();

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order",orderRoutes);
app.use("/api/auth", authRoutes);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
}
);

//connectDB();


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})




