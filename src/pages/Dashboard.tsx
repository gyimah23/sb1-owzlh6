import React from 'react';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';

interface UserData {
  name: string;
  email: string;
  upcomingAppointments: {
    id: number;
    service: string;
    date: string;
    time: string;
  }[];
  recentOrders: {
    id: number;
    product: string;
    date: string;
    status: string;
  }[];
}

const fetchUserData = async (): Promise<UserData> => {
  // In a real app, this would be an API call
  return {
    name: 'John Doe',
    email: 'john@example.com',
    upcomingAppointments: [
      { id: 1, service: 'Electrical Installation', date: '2024-03-15', time: '14:00' },
      { id: 2, service: 'Safety Inspection', date: '2024-03-22', time: '10:00' },
    ],
    recentOrders: [
      { id: 101, product: 'LED Bulb Pack', date: '2024-02-28', status: 'Delivered' },
      { id: 102, product: 'Smart Thermostat', date: '2024-03-05', status: 'Shipped' },
    ],
  };
};

const Dashboard: React.FC = () => {
  const { data: userData, isLoading, isError } = useQuery<UserData>('userData', fetchUserData);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user data</div>;

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
      <motion.h1 className="text-4xl font-bold text-center mb-12" variants={itemVariants}>Dashboard</motion.h1>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={containerVariants}>
        <motion.div className="bg-white p-6 rounded-lg shadow-md" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4">User Information</h2>
          <p><strong>Name:</strong> {userData?.name}</p>
          <p><strong>Email:</strong> {userData?.email}</p>
        </motion.div>
        <motion.div className="bg-white p-6 rounded-lg shadow-md" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
          {userData?.upcomingAppointments.map(appointment => (
            <motion.div key={appointment.id} className="mb-2" variants={itemVariants}>
              <p><strong>{appointment.service}</strong></p>
              <p>{appointment.date} at {appointment.time}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="bg-white p-6 rounded-lg shadow-md md:col-span-2" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Order ID</th>
                <th className="text-left">Product</th>
                <th className="text-left">Date</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {userData?.recentOrders.map(order => (
                <motion.tr key={order.id} variants={itemVariants}>
                  <td>{order.id}</td>
                  <td>{order.product}</td>
                  <td>{order.date}</td>
                  <td>{order.status}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;