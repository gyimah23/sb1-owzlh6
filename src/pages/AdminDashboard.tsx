import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface Appointment {
  id: number;
  name: string;
  service: string;
  date: string;
  time: string;
}

interface Order {
  id: number;
  customerName: string;
  products: { name: string; quantity: number }[];
  total: number;
  date: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get('/api/products');
  return response.data;
};

const fetchAppointments = async (): Promise<Appointment[]> => {
  const response = await axios.get('/api/appointments');
  return response.data;
};

const fetchOrders = async (): Promise<Order[]> => {
  const response = await axios.get('/api/orders');
  return response.data;
};

const AdminDashboard: React.FC = () => {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });
  const queryClient = useQueryClient();

  const { data: products } = useQuery<Product[]>('products', fetchProducts, {
    refetchInterval: 5000, // Refetch every 5 seconds
  });
  const { data: appointments } = useQuery<Appointment[]>('appointments', fetchAppointments, {
    refetchInterval: 5000,
  });
  const { data: orders } = useQuery<Order[]>('orders', fetchOrders, {
    refetchInterval: 5000,
  });

  const addProduct = useMutation((product: Omit<Product, 'id'>) => {
    return axios.post('/api/products', product);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      setNewProduct({ name: '', price: '', image: '' });
    },
  });

  const isAdmin = localStorage.getItem('userRole') === 'admin';

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price && newProduct.image) {
      addProduct.mutate({
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        image: newProduct.image,
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h1 className="text-4xl font-bold text-center mb-12">Admin Dashboard</h1>
      
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={containerVariants}>
        <motion.div className="bg-white p-8 border rounded-lg shadow-lg" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block mb-2">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block mb-2">Image URL</label>
              <input
                type="url"
                id="image"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
              Add Product
            </button>
          </form>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-6">Recent Appointments</h2>
          <ul className="bg-white border rounded-lg shadow max-h-80 overflow-y-auto">
            {appointments?.map(appointment => (
              <li key={appointment.id} className="px-4 py-2 border-b last:border-b-0">
                <strong>{appointment.name}</strong> - {appointment.service}<br />
                {appointment.date} at {appointment.time}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      <motion.div className="mt-12" variants={itemVariants}>
        <h2 className="text-2xl font-semibold mb-6">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Products</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map(order => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.customerName}</td>
                  <td className="px-4 py-2">
                    {order.products.map(p => `${p.name} (x${p.quantity})`).join(', ')}
                  </td>
                  <td className="px-4 py-2">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-2">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div className="mt-12" variants={itemVariants}>
        <h2 className="text-2xl font-semibold mb-6">Current Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products?.map(product => (
            <div key={product.id} className="bg-white p-4 border rounded-lg shadow">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
              <h3 className="font-semibold">{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;