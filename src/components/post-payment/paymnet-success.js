import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const orderNumber = searchParams.get("orderNumber");

    if (orderNumber) {
      setOrderNumber(orderNumber);
      setIsProcessing(false);
    } else {
      // Redirect to checkout if no order number is found
      navigate("/checkout");
    }
  }, [location, navigate]);

  const verifyPayment = async (token) => {
    try {
      const response = await axios.post(
        "http://localhost:8090/api/v1/users/verify-payment",
        { token }
      );
      console.log("Payment verified:", response.data);
      // Handle successful payment (e.g., clear cart, show success message)
    } catch (error) {
      console.error("Error verifying payment:", error);
      // Handle error (e.g., show error message, redirect to checkout)
      navigate("/checkout");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Order placed Successfully!
        </h1>
        <p className="text-lg text-gray-700 mb-4"></p>
        {orderNumber && (
          <p className="text-xl font-semibold text-gray-900">
            Your order ID is{" "}
            <span className="text-orange-500">{orderNumber}</span>
          </p>
        )}
        <p className="text-gray-600 mt-4">Thankyou for shopping with us!</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
