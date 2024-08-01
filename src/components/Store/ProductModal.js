import React from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTimes } from "react-icons/fa";

const ProductModal = ({ product, isOpen, onClose, addToCart }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 p-8 rounded-lg max-w-2xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-3xl font-bold text-orange-500">{product.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white">
            <FaTimes size={24} />
          </button>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-4 md:mb-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-6">
            <p className="text-gray-300 mb-4">{product.description}</p>
            <p className="text-2xl font-bold text-orange-500 mb-4">
              ${product.price.toFixed(2)}
            </p>
            <button
              onClick={() => addToCart(product.id)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 flex items-center"
            >
              <FaPlus className="mr-2" /> Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductModal;
