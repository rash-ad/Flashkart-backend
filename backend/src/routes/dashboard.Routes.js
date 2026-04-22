import express from "express";
import dashboardController from "../controller/dashboard.controller.js";
const router = express.Router();

router.get("/stats", dashboardController.getDashboardStats);
router.get("/recent-orders", dashboardController.getRecentOrders);
router.get("/low-stock", dashboardController.getLowStockProducts);
router.get("/revenue-chart", dashboardController.getRevenueChart);
router.get("/all-orders", dashboardController.getAllOrders);
router.get("/orders-by-status", dashboardController.getOrdersByStatus);
router.get("/top-products", dashboardController.getTopProducts);

export default router;
