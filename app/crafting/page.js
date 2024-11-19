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
  const [maleLeadName, setMaleLeadName] = useState("male lead");
  const [femaleLeadName, setFemaleLeadName] = useState("female lead");
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
    // Retrieve from localStorage

    const storedStoryId = localStorage.getItem("story_id");
    const maleName = localStorage.getItem("male_lead_name") || "male lead";
    const femaleName =
      localStorage.getItem("female_lead_name") || "female lead";

    // Update state
    if (storedStoryId) setStoryId(storedStoryId);
    setMaleLeadName(maleName);
    setFemaleLeadName(femaleName);

    // Initialize sentences after names are loaded
    setSentences([
      { text: `${maleName} looks really hot today!`, isLoaded: false },
      { text: `TBH, ${femaleName} is such a nice name!`, isLoaded: false },
      { text: "Making sure this chapter turns out nice", isLoaded: false },
    ]);

    console.log(localStorage.getItem("story_id"));
    console.log(localStorage.getItem("male_lead_name"));
    console.log(localStorage.getItem("female_lead_name"));

    console.log(localStorage.getItem(maleName));

    console.log(localStorage.getItem(femaleName));

    console.log(localStorage.getItem(storedStoryId));

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          window.location.href = "/library";
          return 100;
        }
        return prev + 4;
      });
    }, 1000);

    // Simulate loading sentences
    const sentenceTimeouts = [
      setTimeout(() => {
        setSentences((prev) => {
          const updated = [...prev];
          updated[0].isLoaded = true;
          return updated;
        });
      }, 8000),
      setTimeout(() => {
        setSentences((prev) => {
          const updated = [...prev];
          updated[1].isLoaded = true;
          return updated;
        });
      }, 16000),
      setTimeout(() => {
        setSentences((prev) => {
          const updated = [...prev];
          updated[2].isLoaded = true;
          return updated;
        });
      }, 24000),
    ];

    // Cleanup on unmount
    return () => {
      clearInterval(progressInterval);
      sentenceTimeouts.forEach(clearTimeout);
      // localStorage.removeItem("male_lead_name");
      // localStorage.removeItem("female_lead_name");
    };
  }, []);

  return (
    <SectionContainer className="w-full bg-[#F3F5F8] justify-center items-center lg:px-12 px-2 page-banner--container pt-12 flex flex-col-reverse md:flex-row min-h-screen">
      <SectionContainer className="page-banner--inner-container wrap wrap-px z-10 md:w-1/2 flex justify-center items-center h-full">
        <div className="my-auto mx-auto w-full flex flex-col justify-start pt-8 lg:justify-center min-h-screen md:min-h-auto">
          <div className="flex h-max my-4 w-full mt-16 lg:mt-0 justify-center items-center flex-col rounded-2xl bg-white px-4 sm:px-14 py-8">
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
            <div className="mt-8 space-y-6 text-black">
              {sentences.map((sentence, index) => (
                <div key={index} className="flex items-center space-x-4">
                  {sentence.isLoaded ? (
                    <DoneIcon className="text-green-500" />
                  ) : (
                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress color="inherit" size={24} />
                    </Box>
                  )}
                  <span className="text-lg text-gray-700">{sentence.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </SectionContainer>
  );
};

export default page;
