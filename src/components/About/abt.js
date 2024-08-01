import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaDatabase, FaHeadset, FaCogs } from "react-icons/fa";

export default function AboutUs() {
  const services = [
    {
      icon: FaShieldAlt,
      title: "Data Security",
      description:
        "Ensuring your data remains protected with state-of-the-art security measures.",
    },
    {
      icon: FaDatabase,
      title: "Data Storage",
      description:
        "Reliable and scalable storage solutions to meet your growing data needs.",
    },
    {
      icon: FaHeadset,
      title: "Customer Support",
      description:
        "24/7 dedicated support to assist you with any queries or issues.",
    },
    {
      icon: FaCogs,
      title: "Customized Plans",
      description:
        "Tailored solutions designed to fit your specific business requirements.",
    },
  ];

  return (
    <div className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          About Us
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg mb-12 text-center max-w-3xl mx-auto"
        >
          We offer integrated services and expert analysis across AI-based real
          estate ventures, IT & telecom innovations, and strategic financial
          investments. Explore actionable insights, tailored solutions, and
          pioneering strategies designed to drive growth and transformation in
          today's dynamic business landscape.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="bg-orange-600 rounded-lg p-6 hover:bg-orange-700 transition-colors duration-300"
            >
              <service.icon className="text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-4">Our Commitment</h3>
          <p className="max-w-2xl mx-auto">
            We are dedicated to providing top-notch services in data security,
            storage, and customer support. Our team of experts works tirelessly
            to create customized plans that fit your unique needs, ensuring your
            business stays ahead in the ever-evolving digital landscape.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
