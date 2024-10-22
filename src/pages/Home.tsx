import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem('userRole');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="bg-gray-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-16">
        <motion.h1 className="text-4xl font-bold text-center mb-8" variants={itemVariants}>
          Welcome to ElectroPro
        </motion.h1>
        <motion.p className="text-xl text-center mb-12" variants={itemVariants}>
          Your one-stop solution for all electrical services and products
        </motion.p>
        
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={containerVariants}>
          <motion.div className="bg-white p-6 rounded-lg shadow-md" variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
            <p className="mb-4">From installations to repairs, we've got you covered.</p>
            <Link to="/services" className="text-blue-600 hover:underline">Explore Services</Link>
          </motion.div>
          
          <motion.div className="bg-white p-6 rounded-lg shadow-md" variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-4">Online Shop</h2>
            <p className="mb-4">Browse our wide range of electrical products.</p>
            {isLoggedIn ? (
              <Link to="/shop" className="text-blue-600 hover:underline">Visit Shop</Link>
            ) : (
              <Link to="/login" className="text-blue-600 hover:underline">Login to Shop</Link>
            )}
          </motion.div>
          
          <motion.div className="bg-white p-6 rounded-lg shadow-md" variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-4">Book a Service</h2>
            <p className="mb-4">Schedule an appointment with our expert technicians.</p>
            {isLoggedIn ? (
              <Link to="/booking" className="text-blue-600 hover:underline">Book Now</Link>
            ) : (
              <Link to="/login" className="text-blue-600 hover:underline">Login to Book</Link>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;