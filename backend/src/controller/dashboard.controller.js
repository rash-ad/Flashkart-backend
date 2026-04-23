import dashboardService from '../service/dashboard.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await dashboardService.getDashboardStats();
    res.status(200).json(new ApiResponse(200, 'Dashboard stats fetched', stats));
  } catch (err) {
    next(new ApiError(500, err.message));
  }
};

const getRecentOrders = async (req, res, next) => {
  try {
    const orders = await dashboardService.getRecentOrders();
    res.status(200).json(new ApiResponse(200, 'Recent orders fetched', orders));
  } catch (err) {
    next(new ApiError(500, err.message));
  }
};

const getLowStockProducts = async (req, res, next) => {
  try {
    const products = await dashboardService.getLowStockProducts();
    res.status(200).json(new ApiResponse(200, 'Low stock products fetched', products));
  } catch (err) {
    next(new ApiError(500, err.message));
  }
};

const getRevenueChart = async (req, res, next) => {
  try {
    const data = await dashboardService.getRevenueByMonth();
    res.status(200).json(new ApiResponse(200, 'Revenue chart data fetched', data));
  } catch (err) {
    next(new ApiError(500, err.message));
  }
};
const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await dashboardService.getProductById(id);
    if (!product) {
      return next(new ApiError(404, 'Product not found'));
    }
    res.status(200).json(new ApiResponse(200, 'Product fetched', product));
  } catch (err) {
    next(new ApiError(500, err.message));
  }
};

const getOrdersByStatus = async (req, res, next) => {
  try {
    const data = await dashboardService.getOrdersByStatus();
    res.status(200).json(new ApiResponse(200, 'Orders by status fetched', data));
  } catch (err) {
    next(new ApiError(500, err.message));
  }
};


const getTopProducts = async (req, res, next) => {
  try {
    const data = await dashboardService.getTopSellingProducts();
    res.status(200).json(new ApiResponse(200, 'Top products fetched', data));
  } catch (err) {
    next(new ApiError(500, err.message));
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const data = await dashboardService.getAllUsers(req.query);
    res.status(200).json(new ApiResponse(200, 'Users fetched', data));
  } catch (err) {
    next(new ApiError(500, err.message));
  }
};


const getAllOrders = async (req, res, next) => {
  try {
    const data = await dashboardService.getAllOrders(req.query);
    res.status(200).json(new ApiResponse(200, 'Orders fetched', data));
  } catch (err) {
    next(new ApiError(500, err.message));
  }
};


const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await dashboardService.updateOrderStatus(id, status);
    res.status(200).json(new ApiResponse(200, 'Order status updated', order));
  } catch (err) {
    next(new ApiError(500, err.message));
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await dashboardService.deleteProduct(id);
    res.status(200).json(new ApiResponse(200, 'Product deleted', null));
  } catch (err) {
    next(new ApiError(500, err.message));
  }
};
 export default  {
  getDashboardStats,
  getRecentOrders,
  getLowStockProducts,
  getRevenueChart,
  getOrdersByStatus,
  getTopProducts,
  getAllUsers,
  getAllOrders,
  updateOrderStatus,
  deleteProduct,
};