import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ai from "../../assets/ai.png";
import FreeTrial from "./FreeTrial";
import FAQs from "./Faqs";

export default function Home() {
  return (
    <>
      <div className="bg-ai">
        <div className="relative isolate overflow-hidden pt-14">
          <img
            src={ai}
            alt="ai"
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 -z-10 bg-black bg-opacity-80"></div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold tracking-tight text-orange-500 sm:text-6xl">
                NexusTech Financial Insights
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                We offer integrated services and expert analysis across AI-based
                real estate ventures, IT & telecom innovations, and strategic
                financial investments. Explore actionable insights, tailored
                solutions, and pioneering strategies designed to drive growth
                and transformation in today's dynamic business landscape.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="https://www.instagram.com/omerhafeez.pk?utm_source=qr&igsh=MTdmcjJ3c2NjbWIzYQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                  >
                    Contact Us
                  </a>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/about"
                    className="text-sm font-semibold leading-6 text-orange-300 hover:text-orange-400"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <FreeTrial />
      <FAQs />
    </>
  );
}
