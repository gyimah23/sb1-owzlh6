import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      className="bg-gray-800 text-white py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.div className="flex flex-wrap justify-between" variants={containerVariants}>
          <motion.div className="w-full md:w-1/3 mb-6 md:mb-0" variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-2">ElectroPro</h3>
            <p>Your trusted partner for all electrical needs.</p>
          </motion.div>
          <motion.div className="w-full md:w-1/3 mb-6 md:mb-0" variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul>
              <li><a href="/services" className="hover:text-blue-300 transition duration-300">Services</a></li>
              <li><a href="/shop" className="hover:text-blue-300 transition duration-300">Shop</a></li>
              <li><a href="/booking" className="hover:text-blue-300 transition duration-300">Book a Service</a></li>
            </ul>
          </motion.div>
          <motion.div className="w-full md:w-1/3" variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p>Ghana, Eastern region Asamankese</p>
            <p>Phone: (+233) 0549247690</p>
            <p>Email: adamgyimah2@gmail.com</p>
          </motion.div>
        </motion.div>
        <motion.div className="mt-8 text-center" variants={itemVariants}>
          <p>&copy; 2024 ElectroPro. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;