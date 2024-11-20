"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import SectionContainer from "../components/SectionContainer.jsx";
// import stickyNote from "../../public/stickyNote3.png";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useAuth } from "@clerk/nextjs";
import { updateStoryTitle } from "../../supabase/supabaseRequests.js";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import DoneIcon from "@mui/icons-material/Done";

const page = () => {
  const { userId } = useAuth();
  const [storyId, setStoryId] = useState(null);

  // Fetch storyId and male/female lead names from localStorage
  useEffect(() => {}, []);

  const cards = [
    {
      title: "Noteworthy technology acquisitions 2021",
      description:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    },
    {
      title: "Top programming languages to learn in 2023",
      description:
        "Explore the most popular programming languages to level up your skills this year.",
    },
    {
      title: "Advancements in AI and Machine Learning",
      description:
        "Discover how AI and ML are shaping the future across industries.",
    },
    {
      title: "Cybersecurity trends in 2023",
      description:
        "Stay updated on the latest cybersecurity measures and threats.",
    },
    {
      title: "Web development frameworks you should know",
      description:
        "A quick guide to the most in-demand web development frameworks.",
    },
    {
      title: "How to ace technical interviews",
      description: "Tips and tricks to excel in your next technical interview.",
    },
  ];

  return (
    <div className="w-full bg-[#F3F5F8] flex justify-center items-center min-h-screen">
      <div className="w-full max-w-7xl flex justify-center mt-24 mb-16 lg:mb-0 lg:mt-0 px-4 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md"
            >
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {card.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700">
                {card.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Read more
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
