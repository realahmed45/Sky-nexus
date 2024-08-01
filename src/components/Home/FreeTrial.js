import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function FreeTrial() {
  return (
    <div className="relative isolate overflow-hidden bg-black py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-orange-500 sm:text-4xl">
          Start using our app today.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
          We are here at your service. Adjust according to your needs.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="services"
              className="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              Choose your service
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="services"
              className="text-sm font-semibold leading-6 text-orange-300 hover:text-orange-400"
            ></Link>
          </motion.div>
        </div>
      </motion.div>
      <svg
        viewBox="0 0 1024 1024"
        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        aria-hidden="true"
      >
        <circle
          cx={512}
          cy={512}
          r={512}
          fill="url(#gradient)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="gradient">
            <stop stopColor="#FFA500" />
            <stop offset={1} stopColor="#FF4500" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
