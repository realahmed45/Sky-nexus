import React, { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { createStripePaymentIntentAPI } from "../../apis/stripePayment/stripePayment";
import StatusMessage from "../Alert/StatusMessage";
import { FaCreditCard, FaMoneyBillWave, FaArrowLeft } from "react-icons/fa";

const CheckoutForm = ({ cart, totalItems, totalPrice }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const plan = params.plan;
  const amount = searchParams.get("amount");
  const mutation = useMutation({
    mutationFn: createStripePaymentIntentAPI,
  });

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (paymentMethod === "cash") {
      // Handle cash on delivery
      console.log("Cash on delivery order placed");
      return;
    }
    if (elements === null) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      return;
    }
    try {
      const data = {
        amount,
        plan,
      };
      mutation.mutate(data);

      if (mutation?.isSuccess) {
        const { error } = await stripe.confirmPayment({
          elements,
          clientSecret: mutation?.data?.clientSecret,
          confirmParams: {
            return_url: "http://localhost:3000/success",
          },
        });
        if (error) {
          setErrorMessage(error?.message);
        }
      }
    } catch (error) {
      setErrorMessage(error?.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-orange-500 text-white">
          <h2 className="text-2xl font-bold">Checkout</h2>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center text-orange-500 hover:text-orange-700"
          >
            <FaArrowLeft className="mr-2" />
            Back to Cart
          </button>

          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
            <p className="mt-1 text-sm text-gray-600">
              Total Items: {totalItems}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Total Price: ${totalPrice.toFixed(2)}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Delivery Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    id="card"
                    name="paymentMethod"
                    type="radio"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300"
                  />
                  <label
                    htmlFor="card"
                    className="ml-3 flex items-center text-sm font-medium text-gray-700"
                  >
                    <FaCreditCard className="mr-2 text-orange-500" />
                    Credit/Debit Card
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="cash"
                    name="paymentMethod"
                    type="radio"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                    className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300"
                  />
                  <label
                    htmlFor="cash"
                    className="ml-3 flex items-center text-sm font-medium text-gray-700"
                  >
                    <FaMoneyBillWave className="mr-2 text-green-500" />
                    Cash on Delivery
                  </label>
                </div>
              </div>
            </div>

            {paymentMethod === "card" && (
              <div className="mb-4">
                <PaymentElement />
              </div>
            )}

            {mutation?.isPending && (
              <StatusMessage
                type="loading"
                message="Processing please wait..."
              />
            )}

            {mutation?.isError && (
              <StatusMessage
                type="error"
                message={mutation?.error?.response?.data?.error}
              />
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Place Order
            </button>
          </form>

          {errorMessage && (
            <div className="mt-4 text-sm text-red-600">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
