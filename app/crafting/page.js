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
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [storyTitle, setStoryTitle] = useState("");
  const [storyId, setStoryId] = useState(null);
  const [sentences, setSentences] = useState([
    { text: "", isLoaded: false },
    { text: "", isLoaded: false },
    { text: "", isLoaded: false },
  ]);

  // Fetch storyId and male/female lead names from localStorage
  useEffect(() => {
    const storedStoryId = localStorage.getItem("story_id");
    const maleLeadName =
      localStorage.getItem("male_lead_name") || "your male lead";
    const femaleLeadName =
      localStorage.getItem("female_lead_name") || "female lead";

    if (storedStoryId) setStoryId(storedStoryId);
    setSentences([
      { text: `Damn, ${maleLeadName} looks really hot today`, isLoaded: false },
      { text: `TBH, ${femaleLeadName} is such a nice name!`, isLoaded: false },
      { text: "Making sure this chapter turns out nice", isLoaded: false },
    ]);

    // Simulate loading progress and sentences
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          //   setTimeout(() => (window.location.href = "/library"), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 1000);

    const sentenceTimeouts = sentences.map((_, i) => {
      return setTimeout(
        () => {
          setSentences((prev) => {
            const updatedSentences = [...prev];
            updatedSentences[i].isLoaded = true;
            return updatedSentences;
          });
        },
        (i + 1) * 3000
      );
    });

    return () => {
      clearInterval(progressInterval);
      sentenceTimeouts.forEach(clearTimeout);
    };
  }, []);
  return (
    <SectionContainer className="w-full bg-[#F3F5F8] justify-center items-center lg:px-12 px-2 page-banner--container pt-12 flex flex-col-reverse md:flex-row min-h-screen">
      <SectionContainer className="page-banner--inner-container wrap wrap-px z-10 md:w-1/2 flex justify-center items-center h-full">
        <div className="my-auto mx-auto w-full flex flex-col justify-start pt-8 lg:justify-center min-h-screen md:min-h-auto">
          <div className="flex h-max my-4 w-full justify-center items-center flex-col rounded-2xl bg-white px-4 sm:px-14 py-8">
            {/* Progress Bar */}
            <div className="relative w-full pt-4">
              <span
                className="absolute bottom-0 mb-4 -translate-x-1/2 w-12 h-10 bg-white shadow-[0px_12px_30px_0px_rgba(16,24,40,0.1)] rounded-full px-3.5 py-2 text-gray-800 text-xs font-medium flex justify-center items-center after:absolute after:bg-white after:flex after:bottom-[-5px] after:left-1/2 after:-z-10 after:h-3 after:w-3 after:-translate-x-1/2 after:rotate-45"
                style={{ left: `${progress}%` }}
              >
                {progress}%
              </span>
              <div className="relative flex w-full h-2.5 overflow-hidden rounded-3xl bg-gray-100 mt-2">
                <div
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: `${progress}%` }}
                  className="flex h-full items-center justify-center bg-indigo-600 text-white rounded-3xl"
                ></div>
              </div>
            </div>

            {/* Loading Sentences */}
            <div className="mt-8 space-y-4 text-center">
              {sentences.map((sentence, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: sentence.isLoaded ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center"
                >
                  {sentence.isLoaded ? (
                    <DoneIcon className="text-green-500 mr-2" />
                  ) : (
                    <CircularProgress size={20} className="mr-2" />
                  )}
                  <span className="text-lg text-gray-700">{sentence.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </SectionContainer>
  );
};

export default page;
