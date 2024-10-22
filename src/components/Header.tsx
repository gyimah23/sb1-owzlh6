import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const userRole = localStorage.getItem('userRole');
  const isLoggedIn = !!userRole;

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      className="bg-blue-600 text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div variants={itemVariants}>
          <Link to="/" className="flex items-center space-x-2">
            <Zap size={24} />
            <span className="text-xl font-bold">ElectroPro</span>
          </Link>
        </motion.div>
        <nav>
          <motion.ul className="flex space-x-4" variants={containerVariants}>
            <motion.li variants={itemVariants}><Link to="/" className="hover:text-blue-200 transition duration-300">Home</Link></motion.li>
            <motion.li variants={itemVariants}><Link to="/services" className="hover:text-blue-200 transition duration-300">Services</Link></motion.li>
            {isLoggedIn && (
              <>
                <motion.li variants={itemVariants}><Link to="/shop" className="hover:text-blue-200 transition duration-300">Shop</Link></motion.li>
                <motion.li variants={itemVariants}><Link to="/booking" className="hover:text-blue-200 transition duration-300">Booking</Link></motion.li>
                <motion.li variants={itemVariants}><Link to="/dashboard" className="hover:text-blue-200 transition duration-300">Dashboard</Link></motion.li>
                <motion.li variants={itemVariants}><Link to="/logout" className="hover:text-blue-200 transition duration-300">Logout</Link></motion.li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <motion.li variants={itemVariants}><Link to="/login" className="hover:text-blue-200 transition duration-300">Login</Link></motion.li>
                <motion.li variants={itemVariants}><Link to="/register" className="hover:text-blue-200 transition duration-300">Register</Link></motion.li>
              </>
            )}
          </motion.ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;