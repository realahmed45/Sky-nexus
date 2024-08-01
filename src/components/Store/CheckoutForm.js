import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import axios from "axios";

const CheckoutForm = ({
  cart = {},
  totalPrice = 0,
  onClose,
  onOrderPlaced,
  products = [],
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    specialInstructions: "",
    paymentMethod: "cod", // Only COD is available
    cartItems: cart,
    totalPrice: totalPrice,
  });
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState(""); // State to store the order number
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Generate a unique order number
    const generatedOrderNumber = `ORDER-${Date.now()}`;
    setOrderNumber(generatedOrderNumber);

    try {
      // Handle Cash on Delivery using EmailJS
      const cartSummary = Object.entries(cart)
        .map(([productId, quantity]) => {
          const product = products.find((p) => p.id === parseInt(productId));
          return product
            ? {
                name: product.name,
                quantity: quantity,
                price: product.price,
                totalItemPrice: product.price * quantity,
              }
            : null;
        })
        .filter(Boolean);

      const orderDetails = cartSummary.map(
        (item) =>
          `${item.name} (Quantity: ${
            item.quantity
          }, Price: $${item.price.toFixed(
            2
          )}, Total: $${item.totalItemPrice.toFixed(2)})`
      );

      const emailData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        specialInstructions: formData.specialInstructions,
        paymentMethod: formData.paymentMethod,
        orderDetails: orderDetails.join("\n"),
        totalPrice: totalPrice.toFixed(2),
        orderNumber: generatedOrderNumber, // Add order number to the email data
      };

      console.log("Sending data via EmailJS:", emailData);

      emailjs
        .send(
          "service_clikdn4",
          "template_5hp6qar",
          emailData,
          "zVTuReodh-Rdvi0n_"
        )
        .then((response) => {
          console.log(
            "Email successfully sent!",
            response.status,
            response.text
          );
          // Navigate to success page with the order number
          navigate(`/payment-success?orderNumber=${generatedOrderNumber}`);
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          setMessage("Failed to send email. Please try again.");
          setIsProcessing(false);
        });

      setIsProcessing(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage(`An error occurred: ${error.message}`);
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-2xl w-full mx-4 relative overflow-y-auto max-h-screen">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300"
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-3xl font-bold text-orange-500 mb-6">Checkout</h2>

        {/* Cart Summary */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Order Summary
          </h3>
          {Object.entries(cart).map(([productId, quantity]) => {
            const product = products.find((p) => p.id === parseInt(productId));
            if (!product) return null;
            return (
              <div key={productId} className="flex items-center mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-900">{product.name}</p>
                  <p className="text-gray-600">Quantity: {quantity}</p>
                  <p className="text-gray-600">
                    Price: ${(product.price * quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
          <p className="text-2xl font-bold text-gray-900 mt-4">
            Total: $
            {typeof totalPrice === "number" ? totalPrice.toFixed(2) : "0.00"}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-900">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-900">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-900">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-900">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="specialInstructions"
              className="block text-gray-900"
            >
              Special Instructions
            </label>
            <textarea
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-900">Payment Method</label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleInputChange}
                className="mr-2"
                disabled
              />
              <label htmlFor="cod" className="text-gray-900">
                Cash on Delivery
              </label>
            </div>
          </div>
          {message && (
            <p className="text-red-500 text-center mb-4">{message}</p>
          )}
          <button
            type="submit"
            className={`w-full py-3 rounded text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-300 ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
