import React from "react";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Extra() {
  return (
    <div className="bg-black text-white py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold mb-8 text-center text-orange-500"
        >
          DISCOVER MORE POSSIBILITIES
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-xl mb-12 text-center max-w-4xl mx-auto leading-relaxed"
        >
          Your journey doesn't end here! We've got an exciting world of products
          and services waiting for you to explore. From innovative items that'll
          revolutionize your daily life to services that'll exceed your
          expectations - there's so much more to uncover. Ready to take your
          experience to the next level?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center"
        >
          <Link
            to="/store"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-300 flex items-center justify-center mx-auto"
            style={{
              display: "inline-flex",
              width: "auto",
              maxWidth: "fit-content",
            }}
          >
            <FaRocket className="mr-2" />
            EXPLORE NOW!
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="text-lg mt-8 text-center text-gray-400 max-w-3xl mx-auto"
        >
          Click above to unveil a curated selection of top-notch products and
          services designed to enhance every aspect of your life. The adventure
          continues!
        </motion.p>
      </div>
    </div>
  );
}
