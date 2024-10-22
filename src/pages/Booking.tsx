import React, { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { motion } from 'framer-motion';

interface BookingData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
}

const Booking: React.FC = () => {
  const [booking, setBooking] = useState<BookingData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
  });

  const bookAppointment = useMutation((bookingData: BookingData) => {
    // In a real app, this would be an API call to book the appointment
    return axios.post('/api/bookings', bookingData);
  }, {
    onSuccess: () => {
      alert('Booking submitted successfully!');
      setBooking({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBooking(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookAppointment.mutate(booking);
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
      <motion.h1 className="text-4xl font-bold text-center mb-12" variants={itemVariants}>Book a Service</motion.h1>
      <motion.form onSubmit={handleSubmit} className="max-w-lg mx-auto" variants={containerVariants}>
        <motion.div className="mb-4" variants={itemVariants}>
          <label htmlFor="name" className="block mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={booking.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </motion.div>
        <motion.div className="mb-4" variants={itemVariants}>
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={booking.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </motion.div>
        <motion.div className="mb-4" variants={itemVariants}>
          <label htmlFor="phone" className="block mb-2">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={booking.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </motion.div>
        <motion.div className="mb-4" variants={itemVariants}>
          <label htmlFor="service" className="block mb-2">Service</label>
          <select
            id="service"
            name="service"
            value={booking.service}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select a service</option>
            <option value="installation">Electrical Installation</option>
            <option value="repair">Repair and Maintenance</option>
            <option value="inspection">Safety Inspection</option>
            <option value="upgrade">Energy Efficiency Upgrade</option>
          </select>
        </motion.div>
        <motion.div className="mb-4" variants={itemVariants}>
          <label htmlFor="date" className="block mb-2">Preferred Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={booking.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </motion.div>
        <motion.div className="mb-4" variants={itemVariants}>
          <label htmlFor="time" className="block mb-2">Preferred Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={booking.time}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </motion.div>
        <motion.button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transitionduration-300"
          variants={itemVariants}
        >
          Book Appointment
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Booking;