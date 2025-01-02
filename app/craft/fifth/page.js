"use client";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useAuth } from "@clerk/nextjs";
import { updateFemaleLeadName } from "../../../supabase/supabaseRequests.js";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const page = () => {
  // State and Functions for Step 1
  const { userId } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [femaleLeadName, setfemaleLeadName] = useState("");
  const [progress, setProgress] = useState(40);
  const [storyId, setStoryId] = useState(null);

  // Updates the Progress bar and sets the name equal to male lead name
  const handleNameChange = (e) => {
    const input = e.target.value;
    setfemaleLeadName(input);

    // Set progress based on the input length, maxing out at 10%
    const newProgress = Math.min(input.length, 10);
    setProgress(40 + newProgress);
  };

  useEffect(() => {
    // Retrieve the existing story ID and female_lead_name from local storage
    const savedStoryId = localStorage.getItem("story_id");
    const savedFemaleLeadName = localStorage.getItem("female_lead_name");

    if (savedStoryId) setStoryId(savedStoryId);
    if (savedFemaleLeadName) setfemaleLeadName(savedFemaleLeadName); // Set even if null
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!femaleLeadName || !storyId) return; // Ensure the name field and storyId are available

    setIsLoading(true);

    try {
      // Update the story row with matching story_id
      await updateFemaleLeadName(storyId, femaleLeadName);

      // Save female_lead_name to local storage
      localStorage.setItem("female_lead_name", femaleLeadName);

      // Redirect to the next page after successful update
      console.log("Name updated successfully");
      window.location.href = "/craft/sixth";
    } catch (error) {
      console.error("Error updating female lead name:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setProgress(50); // Ensures the bar fills to 50% upon successful submit
    }
  };

  return (
    <div className="w-full bg-[#F3F5F8] justify-center items-center lg:px-12 px-2 page-banner--container pt-12 flex flex-col-reverse md:flex-row min-h-screen">
      <div className="page-banner--inner-container wrap wrap-px z-10 md:w-1/2 flex justify-center items-center h-full">
        <div className="my-auto mx-auto w-full flex flex-col justify-start pt-8 lg:justify-center min-h-screen md:min-h-auto">
          <div className="flex h-max my-4 w-full justify-center items-center flex-col rounded-2xl bg-white px-2 sm:px-14">
            <Link href="/craft/fourth">
              <button
                type="button"
                className="bg-white text-black border border-gray-200 font-medium rounded-full text-sm p-2.5 inline-flex items-center mb-4 mt-4"
                onClick={() =>
                  localStorage.setItem("female_lead_name", femaleLeadName)
                }
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
              Let's introduce the female lead
            </h2>

            <div className="mt-4 flex w-full flex-col pb-4">
              <div className="relative mb-4">
                <label
                  htmlFor="name"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  What is her name?
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="You may put your own name here :)"
                  required
                  value={femaleLeadName}
                  onChange={handleNameChange}
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading || !femaleLeadName}
                className={`mt-3 flex items-center justify-center rounded-md py-3 font-medium text-white ${
                  isLoading || !femaleLeadName
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
