import React from 'react';

const Services: React.FC = () => {
  const services = [
    { title: 'Electrical Installation', description: 'Professional installation of electrical systems for homes and businesses.' },
    { title: 'Repair and Maintenance', description: 'Quick and reliable repair services for all your electrical issues.' },
    { title: 'Energy Efficiency Upgrades', description: 'Upgrade your electrical systems to save energy and reduce costs.' },
    { title: 'Safety Inspections', description: 'Comprehensive safety inspections to ensure your electrical systems are up to code.' },
    { title: 'Emergency Services', description: '24/7 emergency electrical services for urgent issues.' },
    { title: 'Smart Home Integration', description: 'Installation and setup of smart home electrical systems.' },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;