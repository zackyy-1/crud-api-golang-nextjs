// app/(dashboard)/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '@/components/context/themeContext';
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  CreditCard,
  Activity,
  Calendar,
  ArrowUp,
  ArrowDown,
  Search,
  MoreVertical
} from 'lucide-react';

// Mock data untuk dashboard
const statsData = [
  {
    title: "Total Revenue", 
    value: "45,231",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "green"
  },
  {
    title: "Total Customers",
    value: "12,234",
    change: "+18.3%",
    trend: "up",
    icon: Users,
    color: "blue"
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "-2.1%",
    trend: "down",
    icon: ShoppingCart,
    color: "orange"
  },
  {
    title: "Avg. Order Value",
    value: "$325.50",
    change: "+7.4%",
    trend: "up",
    icon: CreditCard,
    color: "purple"
  }
];

const recentOrders = [
  { id: 1, customer: "John Doe", product: "Premium Watch", amount: "$299", status: "Completed", date: "2023-12-15" },
  { id: 2, customer: "Jane Smith", product: "Wireless Headphones", amount: "$159", status: "Processing", date: "2023-12-15" },
  { id: 3, customer: "Mike Johnson", product: "Smartphone Case", amount: "$49", status: "Completed", date: "2023-12-14" },
  { id: 4, customer: "Sarah Wilson", product: "Fitness Tracker", amount: "$89", status: "Pending", date: "2023-12-14" },
  { id: 5, customer: "David Brown", product: "Laptop Stand", amount: "$75", status: "Completed", date: "2023-12-13" }
];

const topProducts = [
  { name: "Premium Watch", sales: 234, revenue: "$45,234" },
  { name: "Wireless Headphones", sales: 189, revenue: "$28,345" },
  { name: "Smartphone Case", sales: 156, revenue: "$7,645" },
  { name: "Fitness Tracker", sales: 98, revenue: "$8,345" },
  { name: "Laptop Stand", sales: 76, revenue: "$5,345" }
];

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { direction, themeMode, menuColor, headerColor, primaryColor, backgroundColor } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6 p-12"
      style={{
            backgroundColor: themeMode === "dark" ? "#1e1e2f" : backgroundColor,
            direction: direction,
        }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        style={{
          color: themeMode === "dark" ? "#FFFFFF" : "#171717",
        }}
      >
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1">
            Welcome back, John! Here's what's happening with your store today.
          </p>
          <p className="text-sm mt-1" suppressHydrationWarning>
            {formatDate(currentTime)} • {currentTime.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" suppressHydrationWarning>
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="rounded-xl shadow p-6"
              style={{
              backgroundColor: themeMode === "dark" ? "#2a2a3b" : "#ffffff",
              color: themeMode === "dark" ? "#e5e7eb" : "#111827",
            }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <div className={`flex items-center mt-2 ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    {stat.trend === "up" ? (
                      <ArrowUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 mr-1" />
                    )}
                    <span className="text-sm font-medium">{stat.change}</span>
                    <span className="text-sm ml-1">from last week</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 rounded-xl shadow p-6"
          style={{
              backgroundColor: themeMode === "dark" ? "#2a2a3b" : "#ffffff",
              color: themeMode === "dark" ? "#e5e7eb" : "#111827",
            }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Revenue Overview</h2>
            <div className="flex items-center space-x-2">
              <select className="text-sm rounded-lg px-3 py-1" 
                style={{
                  backgroundColor: themeMode === "dark" ? "#1e1e2f" : backgroundColor,
                  direction: direction,
              }}
              suppressHydrationWarning>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
          </div>
          <div className="h-80 rounded-lg flex items-center justify-center"
            style={{
                backgroundColor: themeMode === "dark" ? "#1e1e2f" : "#e5e7eb",
                direction: direction,
            }}
          >
            <div className="text-center">
              <Activity className="h-12 w-12 text-blue-400 mx-auto mb-2" />
              <p className="text-gray-600">Revenue chart will be displayed here</p>
              <p className="text-sm text-gray-500 mt-1">Integrate with Chart.js or Recharts</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl shadow p-6"
           style={{
              backgroundColor: themeMode === "dark" ? "#2a2a3b" : "#ffffff",
              color: themeMode === "dark" ? "#e5e7eb" : "#111827",
            }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Top Products</h2>
            <MoreVertical className="h-5 w-5" />
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg"
                style={{
                    backgroundColor: themeMode === "dark" ? "#1e1e2f" : "#e5e7eb",
                    direction: direction,
                }}
              >
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{product.revenue}</p>
                  <p className="text-sm text-green-600">+12.5%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl shadow p-6"
        style={{
          backgroundColor: themeMode === "dark" ? "#2a2a3b" : "#ffffff",
          color: themeMode === "dark" ? "#e5e7eb" : "#111827",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium" suppressHydrationWarning>
            View all orders →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Product</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Date</th>
              </tr>
            </thead>
            <tbody 
              style={{
                backgroundColor: themeMode === "dark" ? "#2a2a3b" : "#ffffff",
                color: themeMode === "dark" ? "#e5e7eb" : "#111827",
              }}
            >
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-300 hover:text-gray-900">
                  <td className="py-3 px-4">
                    <div className="font-medium">{order.customer}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div>{order.product}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{order.amount}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === "Completed" 
                        ? "bg-green-100 text-green-800" 
                        : order.status === "Processing" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">{order.date}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Conversion Rate</p>
              <h3 className="text-2xl font-bold mt-1">3.24%</h3>
              <p className="text-blue-100 text-sm mt-2">+12.5% from last week</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Customer Satisfaction</p>
              <h3 className="text-2xl font-bold mt-1">94.2%</h3>
              <p className="text-green-100 text-sm mt-2">+2.1% from last month</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Returning Customers</p>
              <h3 className="text-2xl font-bold mt-1">42.8%</h3>
              <p className="text-purple-100 text-sm mt-2">+8.7% from last quarter</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-200" />
          </div>
        </div>
      </div>
    </div>
  );
}