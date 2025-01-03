"use client";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { updateStoryPlot } from "../../../supabase/supabaseRequests.js";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ThirdPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [storyPlot, setStoryPlot] = useState(""); // Change state name
  const [progress, setProgress] = useState(80);
  const [storyId, setStoryId] = useState(null); // State for story ID

  const handleJobChange = (e) => {
    const input = e.target.value;
    setStoryPlot(input);

    // Update the progress bar based on the input length, maxing out at 20%
    const newProgress = Math.min(input.length / 10, 5);
    setProgress(80 + newProgress); // Starting from 80% to add to the previous progress
  };

  useEffect(() => {
    // Retrieve the existing story ID and story_plot from local storage
    const savedStoryId = localStorage.getItem("story_id");
    const savedStoryPlot = localStorage.getItem("story_plot");

    if (savedStoryId) setStoryId(savedStoryId);
    if (savedStoryPlot) setStoryPlot(savedStoryPlot); // Set even if null
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storyPlot || !storyId) return;

    setIsLoading(true);

    try {
      // Update the story row with the matching story_id
      await updateStoryPlot(storyId, storyPlot);

      // Save story_plot to local storage
      localStorage.setItem("story_plot", storyPlot);

      // Redirect to the next page after successful update
      console.log("Plot updated successfully");
      window.location.href = "/craft/tenth";
    } catch (error) {
      console.error("Error updating story plot:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setProgress(85); // Ensures the bar fills to 85% upon successful submit
    }
  };

  return (
    <div className="w-full bg-[#F3F5F8] justify-center items-center lg:px-12 px-2 page-banner--container pt-12 flex flex-col-reverse md:flex-row min-h-screen">
      <div className="page-banner--inner-container wrap wrap-px z-10 md:w-1/2 flex justify-center items-center h-full">
        <div className="my-auto mx-auto w-full flex flex-col justify-start pt-8 lg:justify-center min-h-screen md:min-h-auto">
          <div className="flex h-max my-4 w-full justify-center items-center flex-col rounded-2xl bg-white px-2 sm:px-14">
            <Link href="/craft/eighth">
              <button
                type="button"
                className="bg-white text-black border border-gray-200 font-medium rounded-full text-sm p-2.5 inline-flex items-center mb-4 mt-4"
                onClick={() => localStorage.setItem("story_plot", storyPlot)}
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
              You're almost there! what will be the plot for the first chapter?
            </h2>

            <div className="mt-4 flex w-full flex-col pb-4">
              <div className="relative mb-4">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="job"
                    className="block text-lg font-medium mb-2 text-gray-900"
                  >
                    How should the story start?
                  </label>
                  <span className="block mb-2 text-sm text-gray-500">
                    {storyPlot.length}/400
                  </span>
                </div>
                <textarea
                  type="text"
                  id="job"
                  name="job"
                  className="bg-gray-50 border border-gray-300 text-gray-900 h-[240px] text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Describe your chapter's world: the setting, side characters, and flow. Don't worry—it can all be edited and refined later!"
                  maxLength={400}
                  value={storyPlot}
                  onChange={handleJobChange}
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading || !storyPlot}
                className={`mt-3 flex items-center justify-center rounded-md py-3 font-medium text-white ${
                  isLoading || !storyPlot
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

export default ThirdPage;
