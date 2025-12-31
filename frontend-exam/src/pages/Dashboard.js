import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { products, orders, salesData } from '../data/products';
import { DollarSign, Package, TrendingUp, ShoppingCart, AlertTriangle, ArrowUp, ArrowDown, Minus } from 'lucide-react';

const Dashboard = () => {
  const { getCartCount, getCartTotal } = useCart();
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  const topSellingProducts = [...products]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  const lowStockProducts = products.filter(p => p.stock < 10);

  const recentOrders = orders.slice(0, 5);

  const maxSales = Math.max(...salesData.map(d => d.sales));

  const getStatusBadge = (status) => {
    const styles = {
      'Delivered': 'bg-green-100 text-green-800',
      'Shipped': 'bg-blue-100 text-blue-800',
      'Processing': 'bg-yellow-100 text-yellow-800',
      'Pending': 'bg-gray-100 text-gray-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-blue-500',
      bgGradient: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      change: '+8.3%',
      changeType: 'positive',
      icon: Package,
      color: 'bg-green-500',
      bgGradient: 'from-green-500 to-green-600',
    },
    {
      title: 'Average Order Value',
      value: `$${averageOrderValue.toFixed(2)}`,
      change: '-2.1%',
      changeType: 'negative',
      icon: TrendingUp,
      color: 'bg-purple-500',
      bgGradient: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Total Products',
      value: products.length.toString(),
      change: 'No change',
      changeType: 'neutral',
      icon: Package,
      color: 'bg-orange-500',
      bgGradient: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Cart Items',
      value: getCartCount().toString(),
      change: 'Current session',
      changeType: 'neutral',
      icon: ShoppingCart,
      color: 'bg-indigo-500',
      bgGradient: 'from-indigo-500 to-indigo-600',
    },
    {
      title: 'Cart Total',
      value: `$${getCartTotal().toFixed(2)}`,
      change: 'Current session',
      changeType: 'neutral',
      icon: DollarSign,
      color: 'bg-pink-500',
      bgGradient: 'from-pink-500 to-pink-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Dashboard</h1>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm bg-white"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.bgGradient} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {card.changeType === 'positive' && (
                    <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                      <ArrowUp className="w-4 h-4" />
                      {card.change}
                    </span>
                  )}
                  {card.changeType === 'negative' && (
                    <span className="flex items-center gap-1 text-red-600 text-sm font-medium">
                      <ArrowDown className="w-4 h-4" />
                      {card.change}
                    </span>
                  )}
                  {card.changeType === 'neutral' && (
                    <span className="flex items-center gap-1 text-gray-500 text-sm font-medium">
                      <Minus className="w-4 h-4" />
                      {card.change}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            );
          })}
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sales Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Sales Overview</h2>
            <div className="flex items-end justify-between h-64 gap-2">
              {salesData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full flex items-end justify-center h-full">
                    <div
                      className="w-full bg-gradient-to-t from-primary-600 to-primary-500 rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${(data.sales / maxSales) * 100}%` }}
                      title={`$${data.sales}`}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-600">{data.month}</span>
                  <span className="text-xs text-gray-500">${data.sales}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Selling Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Selling Products</h2>
            <div className="space-y-4">
              {topSellingProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-bold text-sm">#{index + 1}</span>
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">{product.name}</h4>
                    <p className="text-sm text-gray-500">{product.sales} sales</p>
                  </div>
                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Order ID</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Customer</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Total</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-2 text-sm text-gray-900 font-medium">#{order.id}</td>
                      <td className="py-3 px-2 text-sm text-gray-700">{order.customer}</td>
                      <td className="py-3 px-2 text-sm text-gray-700">{order.date}</td>
                      <td className="py-3 px-2 text-sm font-semibold text-gray-900">${order.total.toFixed(2)}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <h2 className="text-xl font-semibold text-gray-900">Low Stock Alert</h2>
            </div>
            {lowStockProducts.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-600 font-medium">All products are well stocked</p>
              </div>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.map(product => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-3 rounded-lg border border-orange-200 bg-orange-50"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{product.name}</h4>
                      <p className="text-sm text-orange-600 font-medium">
                        Only {product.stock} left in stock
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;