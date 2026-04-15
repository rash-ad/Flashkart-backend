import express from 'express';
//import Order from "../model/order.model";
import {addOrder,getAllOrders,updateOrder,deleteOrder} from "../controller/order.controller.js";

const routes=express.Router();

routes.post("/addOrder",addOrder)
routes.get("/:id",getAllOrders)
routes.put("/:id",updateOrder)
routes.delete("/:id",deleteOrder)

export default routes;