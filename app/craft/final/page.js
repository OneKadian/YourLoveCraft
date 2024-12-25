"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import stickyNote from "../../public/stickyNote3.png";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useAuth } from "@clerk/nextjs";
import { updateStoryTitle } from "../../../supabase/supabaseRequests.js";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const page = () => {
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [storyTitle, setStoryTitle] = useState("");
  const [progress, setProgress] = useState(98);
  const [storyId, setStoryId] = useState(null);

  // Fetch storyId from localStorage on component mount
  useEffect(() => {
    const storedStoryId = localStorage.getItem("story_id");
    if (storedStoryId) {
      setStoryId(storedStoryId);
    }
  }, []);

  // Handle title input change and update progress
  const handleTitleChange = (e) => {
    const input = e.target.value;
    setStoryTitle(input);

    // Update progress based on input length
    const newProgress = Math.min(input.length, 2);
    setProgress(98 + newProgress);
  };

  // Submit the story title to the database and navigate to /crafting
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storyTitle || !storyId) return;

    setIsLoading(true);

    try {
      // Submit the title using updateStoryTitle function
      await updateStoryTitle(storyId, storyTitle);

      // After successful submission, remove all related items from localStorage
      // localStorage.removeItem("story_id");
      // Existing localStorage remove items
      // localStorage.removeItem("male_lead_name");
      // localStorage.removeItem("male_lead_job");
      // localStorage.removeItem("male_lead_personality");
      // // localStorage.removeItem("female_lead_name");
      // localStorage.removeItem("female_lead_looks");
      // localStorage.removeItem("female_lead_job");
      // localStorage.removeItem("story_plot");
      // localStorage.removeItem("story_fantasies");
      // localStorage.removeItem("story_genre");
      // localStorage.removeItem("chapter_length");
      // localStorage.removeItem("selectedMalePersonality");
      // localStorage.removeItem("customMaleInput");

      // // Additional localStorage items for female personality and genre
      // localStorage.removeItem("selectedFemalePersonality");
      // localStorage.removeItem("customFemaleInput");
      // localStorage.removeItem("selected_option"); // genre dropdown selection
      // localStorage.removeItem("custom_input"); // custom genre input

      setTimeout(() => {
        window.location.href = "/crafting";
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setProgress(100); // Complete progress bar upon successful submission
    }
  };

  return (
    <div className="w-full bg-[#F3F5F8] justify-center items-center lg:px-12 px-2 page-banner--container pt-12 flex flex-col-reverse md:flex-row min-h-screen">
      <div className="page-banner--inner-container wrap wrap-px z-10 md:w-1/2 flex justify-center items-center h-full">
        <div className="my-auto mx-auto w-full flex flex-col justify-start pt-8 lg:justify-center min-h-screen md:min-h-auto">
          <div className="flex h-max my-4 w-full justify-center items-center flex-col rounded-2xl bg-white px-2 sm:px-14">
            <Link href="/craft/twelfth">
              <button
                type="button"
                className="bg-white text-black border border-gray-200 font-medium rounded-full text-sm p-2.5 inline-flex items-center mb-4 mt-4"
              >
                <ArrowBackIcon className="w-4 h-4 mr-2" />
                <span>Go back</span>
              </button>
            </Link>
            {/* Progress Bar */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-[#a50062] h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <h2 className="text-3xl font-semibold text-gray-700 text-center mt-12">
              Give a title to this story, my lady
            </h2>

            <div className="mt-4 flex w-full flex-col pb-4">
              <div className="relative mb-4">
                <label
                  htmlFor="name"
                  className="block mb-2 text-lg font-medium text-gray-900"
                ></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Don't overthink it, This can be changed later"
                  required
                  value={storyTitle}
                  onChange={handleTitleChange}
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading || !storyTitle}
                className={`mt-3 flex items-center justify-center rounded-md py-3 font-medium text-white ${
                  isLoading || !storyTitle
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
                    <p>Finish</p>
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
