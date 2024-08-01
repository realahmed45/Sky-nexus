import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import ProductModal from "./ProductModal";
import Cart from "./Cart";

const products = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 199.99,
    image: "headphones.jpg",
    description:
      "Experience crystal-clear audio with our premium noise-cancelling headphones. Perfect for music lovers and professionals alike.",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 249.99,
    image: "smartwatch.jpg",
    description:
      "Stay connected and track your fitness with our feature-packed smartwatch. Sleek design meets cutting-edge technology.",
  },
  {
    id: 3,
    name: "Wireless Keyboard",
    price: 79.99,
    image: "keyboard.jpg",
    description:
      "Type with ease using our ergonomic wireless keyboard. Long battery life and responsive keys for a superior typing experience.",
  },
  {
    id: 4,
    name: "4K Webcam",
    price: 129.99,
    image: "webcam.jpg",
    description:
      "Look your best in video calls with our 4K webcam. Crystal clear video and built-in noise-cancelling microphone.",
  },
  {
    id: 5,
    name: "Portable SSD",
    price: 159.99,
    image: "ssd.jpg",
    description:
      "Lightning-fast data transfer in a compact, durable design. Perfect for professionals on the go.",
  },
];

export default function Store() {
  const [cart, setCart] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notification, setNotification] = useState("");

  const addToCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
    setNotification("Item added to cart successfully.");
    setTimeout(() => {
      setNotification("");
    }, 3000); // Hide notification after 3 seconds
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  return (
    <div className="bg-[#c9c2ad] text-gray-900 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold mb-12 text-center text-orange-600"
        >
          Our Products
        </motion.h1>

        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-4 right-4 bg-orange-500 text-white p-4 rounded shadow-lg"
          >
            {notification}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-black text-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-orange-400">
                  {product.name}
                </h3>
                <p className="text-orange-300 text-2xl font-bold mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product.id);
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 flex items-center"
                >
                  <FaPlus className="mr-2" /> Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          addToCart={addToCart}
        />

        <Cart
          cart={cart}
          setCart={setCart}
          removeFromCart={removeFromCart}
          addToCart={addToCart}
          products={products}
        />
      </div>
    </div>
  );
}
