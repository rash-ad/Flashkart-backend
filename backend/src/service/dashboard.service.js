
import { users, products, orders } from '../data/dummyData.js';

const LOW_STOCK_LIMIT = 5;
const getDashboardStats = async () => {
  const totalUsers = users.length;
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter(o => o.status === 'delivered')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  return { totalUsers, totalProducts, totalOrders, totalRevenue };
};

const getRecentOrders = async () => {
  return orders
    .slice(-3)
    .reverse()
    .map(order => ({
      ...order,
      user: users.find(u => u._id === order.userId)?.name,
      products: order.products.map(p => ({
        ...p,
        productName: products.find(pr => pr._id === p.productId)?.name
      }))
    }));
};

const getLowStockProducts = async () => {
  return products
    .filter(p => p.stock < LOW_STOCK_LIMIT)
    .sort((a, b) => a.stock - b.stock);
};

const getRevenueByMonth = async () => {
  const revenueMap = {};
  orders
    .filter(o => o.status === 'delivered')
    .forEach(o => {
      const month = new Date(o.createdAt).toLocaleString('default', { month: 'short' });
      revenueMap[month] = (revenueMap[month] || 0) + o.totalAmount;
    });

  return Object.entries(revenueMap).map(([month, revenue]) => ({ month, revenue }));
};

const getOrdersByStatus = async () => {
  const statusMap = {};
  orders.forEach(o => {
    statusMap[o.status] = (statusMap[o.status] || 0) + 1;
  });

  return Object.entries(statusMap).map(([status, count]) => ({ status, count }));
};

const getTopSellingProducts = async () => {
  const soldMap = {};
  orders.forEach(o => {
    o.products.forEach(p => {
      soldMap[p.productId] = (soldMap[p.productId] || 0) + p.quantity;
    });
  });

  return Object.entries(soldMap)
    .map(([productId, totalSold]) => ({
      productId,
      productName: products.find(p => p._id === productId)?.name,
      totalSold
    }))
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 5);
};

const getAllUsers = async () => {
  return users;
};

const getAllOrders = async () => {
  return orders.map(order => ({
    ...order,
    userName: users.find(u => u._id === order.userId)?.name
  }));
};

const updateOrderStatus = async (id, status) => {
  const order = orders.find(o => o._id === id);
  if (!order) throw new Error('Order not found');
  order.status = status;
  return order;
};

// delete product
const deleteProduct = async (id) => {
  const index = products.findIndex(p => p._id === id);
  if (index === -1) throw new Error('Product not found');
  products.splice(index, 1);
};

export default {
  getDashboardStats,
  getRecentOrders,
  getLowStockProducts,
  getRevenueByMonth,
  getOrdersByStatus,
  getTopSellingProducts,
  getAllUsers,
  getAllOrders,
  updateOrderStatus,
  deleteProduct
};