import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import CheckoutForm from "./CheckoutForm";

const Cart = ({ cart, removeFromCart, addToCart, products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const getTotalItems = () =>
    Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  const getTotalPrice = () =>
    Object.entries(cart).reduce(
      (sum, [productId, quantity]) =>
        sum +
        products.find((p) => p.id === parseInt(productId)).price * quantity,
      0
    );

  const handleCheckout = () => {
    setShowCheckoutForm(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckoutForm(false);
  };

  const handleOrderPlaced = () => {
    setIsOpen(false);
    setShowCheckoutForm(false);
    // Clear cart or perform other actions if needed
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed top-20 right-0 z-50"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-5 rounded-l-lg text-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 flex items-center shadow-lg"
        >
          <FaShoppingCart className="mr-2" />
          <span className="bg-white text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-inner">
            {getTotalItems()}
          </span>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 rounded-lg max-w-md w-full h-4/5 mx-4 relative shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {showCheckoutForm ? (
                <CheckoutForm
                  cart={cart}
                  products={products}
                  totalPrice={getTotalPrice()}
                  onClose={handleCloseCheckout}
                  onOrderPlaced={handleOrderPlaced}
                />
              ) : (
                <>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  >
                    <FaTimes size={24} />
                  </button>
                  <h2 className="text-3xl font-bold text-orange-600 mb-6">
                    Your Cart
                  </h2>
                  {Object.entries(cart).map(([productId, quantity]) => {
                    const product = products.find(
                      (p) => p.id === parseInt(productId)
                    );
                    return (
                      <div
                        key={productId}
                        className="flex items-center justify-between mb-4 p-4 border-b border-gray-300 rounded-lg bg-gray-100"
                      >
                        <div className="flex items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover mr-4 rounded-lg border border-gray-300"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {product.name}
                            </h3>
                            <p className="text-gray-600">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => addToCart(product.id)}
                            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded-full mr-2 transition-colors duration-300 shadow-md"
                          >
                            <FaPlus />
                          </button>
                          <span className="text-gray-800">{quantity}</span>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded-full ml-2 transition-colors duration-300 shadow-md"
                          >
                            <FaMinus />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex justify-between items-center mt-6 border-t pt-4 border-gray-300">
                    <span className="text-xl font-semibold text-gray-800">
                      Total
                    </span>
                    <span className="text-xl font-semibold text-orange-600">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full mt-6 transition-colors duration-300 shadow-lg"
                  >
                    Proceed to Checkout
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;
