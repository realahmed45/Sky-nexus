import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaHeadset, FaCogs } from "react-icons/fa";
import emailjs from "emailjs-com";

const services = [
  {
    name: "Data Security",
    description:
      "AHCyber Security Services, Tier 3 certified Data Center with ISO 2008 and PCC SI Compliance to international standard. Primary and Secondary Data Storage Facility to tailor on Customer Need for DR site as well as Upscale with client needs.",
    icon: FaShieldAlt,
  },
  {
    name: "Dedicated Customer Support",
    description:
      "We believe in empowering our users with continuous support. Our dedicated team is always on standby to assist with any queries, ensuring a smooth, uninterrupted experience in content creation.",
    icon: FaHeadset,
  },
  {
    name: "Customized Solutions",
    description:
      "We provide customized solutions that meet your unique needs and requirements, ensuring that our services align perfectly with your business goals and objectives.",
    icon: FaCogs,
  },
];

const Services = () => {
  useEffect(() => {
    emailjs.init("zVTuReodh-Rdvi0n_"); // Replace with your EmailJS public key
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    service: "",
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleAvailNowClick = (service) => {
    setFormData({ ...formData, service: service });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");

    try {
      if (!formData.service) {
        throw new Error("Please select a service");
      }

      // Send email using EmailJS
      const emailjsResponse = await emailjs.send(
        "service_clikdn4", // Replace with your EmailJS service ID
        "template_w2tst98", // Replace with your EmailJS template ID
        {
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          service: formData.service,
        }
      );

      if (emailjsResponse.status !== 200) {
        throw new Error("Failed to send email");
      }

      setSubmitSuccess(true);
      setIsModalOpen(false);

      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        service: "",
      });

      console.log(
        "Service request submitted successfully:",
        emailjsResponse.text
      );
    } catch (error) {
      console.error("Error submitting service request:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="bg-black text-white py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-orange-500 sm:text-6xl mb-6">
            NexusTech Financial Insights
          </h2>
          <p className="text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
            NexusTech Financial Insights offers integrated services and expert
            analysis across AI-based real estate ventures, IT & telecom
            innovations, and strategic financial investments. Explore actionable
            insights, tailored solutions, and pioneering strategies designed to
            drive growth and transformation in today's dynamic business
            landscape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="bg-gray-900 rounded-xl p-6 flex flex-col h-full"
            >
              <service.icon className="text-orange-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-orange-500 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-300 mb-6 flex-grow">
                {service.description}
              </p>
              <button
                onClick={() => handleAvailNowClick(service.name)}
                className="mt-auto w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-300"
              >
                Avail now
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white"
          >
            <h2 className="text-2xl font-bold mb-4 text-orange-500">
              Avail Service
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-gray-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="service" className="block text-gray-300">
                  Service
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  required
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.name} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <p className="text-gray-300">
                  We will contact you shortly once the form is submitted. Kindly
                  submit correct details. Thank you for choosing our services.
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mr-4 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {submitSuccess && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-500">Success!</h2>
            <p className="mb-6">
              Your service request has been submitted successfully.
            </p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Services;
