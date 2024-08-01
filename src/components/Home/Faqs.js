import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQs = () => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the timeline of this project?",
      answer:
        "The project timeline is estimated to be 12-18 months, divided into phases including planning, development, testing, and deployment.",
    },
    {
      question: "What is the estimated budget for this project?",
      answer:
        "The estimated budget for this project is $500,000 to $750,000, covering all aspects from development to marketing and initial operational costs.",
    },
    {
      question: "Who are the target customers for this smart home concept?",
      answer:
        "The target customers include tech-savvy homeowners, young professionals, families seeking convenience and energy efficiency, and individuals with specific needs for home automation and security.",
    },
    {
      question: "What are the key features of the proposed smart home system?",
      answer:
        "Key features include integrated home automation, energy management, advanced security systems, voice control, mobile app integration, and AI-powered predictive maintenance.",
    },
    {
      question: "How will this project address privacy and security concerns?",
      answer:
        "The project will implement robust encryption protocols, regular security audits, user data protection measures, and provide transparent privacy policies to address these concerns.",
    },
    {
      question:
        "What is the expected return on investment (ROI) for this project?",
      answer:
        "The expected ROI is projected to be 20-25% within the first three years of operation, based on market analysis and projected sales growth.",
    },
    {
      question:
        "How will this smart home concept differentiate itself from competitors?",
      answer:
        "This concept will differentiate itself through seamless integration of multiple systems, user-friendly interfaces, advanced AI capabilities, exceptional customer support, and continuous innovation in smart home technologies.",
    },
  ];

  return (
    <section className="py-10 bg-black sm:py-16 lg:py-24">
      <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold leading-tight text-orange-500 sm:text-4xl lg:text-5xl">
            Questions & Answers
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-300">
            Explore some common answers to your queries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 mt-12 md:mt-20 md:grid-cols-2 gap-y-16 gap-x-20">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-start"
            >
              <div
                className="flex items-center justify-between w-full cursor-pointer"
                onClick={() => toggleQuestion(index)}
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full">
                    <span className="text-lg font-semibold text-white">?</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-xl font-semibold text-orange-300">
                      {faq.question}
                    </p>
                  </div>
                </div>
                <div className="ml-auto">
                  <span className="text-lg font-semibold text-orange-300">
                    {openQuestionIndex === index ? "-" : "+"}
                  </span>
                </div>
              </div>
              <AnimatePresence>
                {openQuestionIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 overflow-hidden"
                  >
                    <p className="text-base text-gray-400">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center mt-12 md:mt-20"
        >
          <div className="px-8 py-4 text-center bg-orange-900 rounded-full">
            <p className="text-gray-50">
              Didn't find the answer you are looking for?{" "}
              <a
                href="mailto:ommerhafeez@gmail.com"
                className="text-orange-300 transition-all duration-200 hover:text-orange-400 focus:text-orange-400 hover:underline"
              >
                Contact our support
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQs;
