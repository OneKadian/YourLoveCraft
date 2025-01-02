"use client";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useAuth } from "@clerk/nextjs";
import {
  addStory,
  updateMaleLeadName,
} from "../../../supabase/supabaseRequests.js";

const page = () => {
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [maleLeadName, setMaleLeadName] = useState(null);
  const [localMaleLeadName, setLocalMaleLeadName] = useState(null);
  const [progress, setProgress] = useState(0);
  const [storyId, setStoryId] = useState(null);

  useEffect(() => {
    if (userId) {
      // Check if a story_id already exists in local storage
      const existingStoryId = localStorage.getItem("story_id");

      if (existingStoryId) {
        // Use the existing story_id from local storage
        setStoryId(existingStoryId);
      } else {
        // Generate a new story_id and save it in local storage
        const generateUniqueStoryId = () => {
          const randomDigits = Math.floor(1000 + Math.random() * 9000);
          return `${userId}-${randomDigits}`;
        };

        const generatedStoryId = generateUniqueStoryId();
        setStoryId(generatedStoryId);
        localStorage.setItem("story_id", generatedStoryId);
      }

      // Fetch male_lead_name from local storage and set it to state if it exists
      const savedMaleLeadName = localStorage.getItem("male_lead_name");
      if (savedMaleLeadName) {
        setMaleLeadName(savedMaleLeadName);
        setLocalMaleLeadName(savedMaleLeadName);
      }
    }
  }, [userId]);

  const handleNameChange = (e) => {
    const input = e.target.value;
    setMaleLeadName(input);
    setProgress(Math.min(input.length, 10));
  };

  //   if (!maleLeadName) return;

  //   setIsLoading(true); // Start spinner

  //   try {
  //     await addStory(userId, storyId, maleLeadName);

  //     // Redirect to the new page after successful insertion
  //     console.log("Story inserted successfully");
  //     window.location.assign("/craft/second");
  //   } catch (error) {
  //     console.error("Error submitting story:", error);
  //   }
  //   // We no longer stop the spinner here, so it keeps spinning
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!maleLeadName) return;

    setIsLoading(true);

    try {
      if (localMaleLeadName === null) {
        // Insert if no previous record exists
        await addStory(userId, storyId, maleLeadName);
        console.log("Story inserted successfully");
      } else {
        // Update if record exists
        await updateMaleLeadName(storyId, maleLeadName);
        console.log("Male lead name updated successfully");
      }

      // Save to local storage
      localStorage.setItem("male_lead_name", maleLeadName);
      window.location.assign("/craft/second");
    } catch (error) {
      console.error("Error submitting story:", error);
    } finally {
      setProgress(10);
    }
  };

  return (
    <div className="w-full bg-[#F3F5F8] justify-center items-center lg:px-12 px-2 page-banner--container pt-12 flex flex-col-reverse md:flex-row min-h-screen">
      <div className="page-banner--inner-container wrap wrap-px z-10 md:w-1/2 flex justify-center items-center h-full">
        <div className="my-auto mx-auto w-full flex flex-col justify-start pt-8 lg:justify-center min-h-screen md:min-h-auto">
          <div className="flex h-max my-4 w-full justify-center items-center flex-col rounded-2xl bg-white px-2 sm:px-14">
            {/* Progress Bar */}
            <div className="mt-4 w-full rounded-full h-2.5 bg-gray-700">
              <div
                className="bg-[#a50062] h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <h2 className="text-3xl font-semibold text-gray-700 text-center mt-12">
              Let's talk about the male lead, my lady
            </h2>

            <div className="mt-4 flex w-full flex-col pb-4">
              <div className="relative mb-4">
                <label
                  htmlFor="name"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  What is his name?
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Adrian Knight"
                  required
                  value={maleLeadName}
                  onChange={handleNameChange}
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading || !maleLeadName}
                className={`mt-3 flex items-center justify-center rounded-md py-3 font-medium text-white ${
                  isLoading || !maleLeadName
                    ? "bg-gray-400 opacity-50 cursor-not-allowed"
                    : "bg-gray-900 cursor-pointer"
                }`}
              >
                {isLoading ? (
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
                ) : (
                  <>
                    <p>Continue</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-4 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
