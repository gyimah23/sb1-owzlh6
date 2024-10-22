import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  // In a real app, this would be an API call
  return [
    { id: 1, name: 'LED Bulb Pack', price: 19.99, image: 'https://images.unsplash.com/photo-1575908539614-ff89490f4a78?w=300&h=300&fit=crop' },
    { id: 2, name: 'Smart Thermostat', price: 129.99, image: 'https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?w=300&h=300&fit=crop' },
    { id: 3, name: 'Electrical Toolkit', price: 49.99, image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=300&h=300&fit=crop' },
    { id: 4, name: 'Surge Protector', price: 24.99, image: 'https://images.unsplash.com/photo-1544281679-d4bb56e54631?w=300&h=300&fit=crop' },
    { id: 5, name: 'Wire Stripper', price: 14.99, image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=300&h=300&fit=crop' },
    { id: 6, name: 'Multimeter', price: 39.99, image: 'https://images.unsplash.com/photo-1589433916287-3b7c4b7d4cb3?w=300&h=300&fit=crop' },
  ];
};

const Shop: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: products, isLoading, isError } = useQuery<Product[]>('products', fetchProducts);

  const addToCart = useMutation((productId: number) => {
    // In a real app, this would be an API call to add the item to the cart
    return axios.post('/api/cart', { productId });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('cart');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

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
      <h1 className="text-4xl font-bold text-center mb-12">Electrical Products Shop</h1>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
        {products?.map(product => (
          <motion.div key={product.id} className="bg-white p-6 rounded-lg shadow-md" variants={itemVariants}>
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart.mutate(product.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Add to Cart
            </button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Shop;