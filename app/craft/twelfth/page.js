"use client";
import React, { useState, useEffect } from "react";
import SectionContainer from "../../components/SectionContainer.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { updateStoryLength } from "../../../supabase/supabaseRequests.js";

const ThirdPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chapterLength, setChapterLength] = useState("");
  const [progress, setProgress] = useState(95);
  const [selectedOption, setSelectedOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [storyId, setStoryId] = useState(null);

  // Mapping options to their respective word counts
  const optionsMap = {
    "Short (500 words)": 500,
    "Medium (1000 words)": 1000,
    "Long (1500 words)": 1500,
  };

  // Toggle dropdown menu
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Update chapter length based on selected option
  const handleGenreChange = (option) => {
    setSelectedOption(option);
    setChapterLength(optionsMap[option]); // Set chapter length to the corresponding number
    setIsDropdownOpen(false);
    setProgress(98); // Update progress on selection
  };

  // Submit the selected chapter length
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!chapterLength || !storyId) return;

    setIsLoading(true);
    try {
      await updateStoryLength(storyId, chapterLength); // Update chapter length
      setTimeout(() => {
        setProgress(100); // Set final progress
        window.location.href = "/craft/final"; // Redirect to final page
      }, 1000);
    } catch (error) {
      console.error("Error updating chapter length:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setProgress(98); // Update progress on selection
    }
  };

  useEffect(() => {
    const savedStoryId = localStorage.getItem("story_id");
    if (savedStoryId) {
      setStoryId(savedStoryId);
    }
  }, []);

  return (
    <SectionContainer className="w-full bg-[#F3F5F8] justify-center items-center lg:px-12 px-2 page-banner--container pt-12 flex flex-col-reverse md:flex-row min-h-screen">
      <SectionContainer className="page-banner--inner-container wrap wrap-px z-10 md:w-1/2 flex justify-center items-center h-full">
        <div className="my-auto mx-auto w-full flex flex-col justify-start pt-8 lg:justify-center min-h-screen md:min-h-auto">
          <div className="flex h-max my-4 w-full justify-center items-center flex-col rounded-2xl bg-white px-2 sm:px-14">
            {/* Progress Bar */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-[#a50062] h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <h2 className="text-3xl font-semibold text-gray-700 text-center mt-12">
              How long do you want this chapter to be?
            </h2>

            <div className="mt-4 flex w-full flex-col pb-4">
              <div className="relative mb-4 w-full">
                {/* Dropdown button */}
                <button
                  id="dropdownDefaultButton"
                  onClick={handleDropdownToggle}
                  className="text-black w-full border border-x-black-50 bg-[#F3F5F8] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-3 text-left inline-flex items-center justify-between"
                  type="button"
                >
                  {selectedOption || "Make your selection"}
                  <svg
                    className="w-2.5 h-2.5 ml-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div
                    id="dropdown"
                    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full mt-2"
                  >
                    <ul className="py-2 text-md text-gray-700">
                      {Object.keys(optionsMap).map((option, index) => (
                        <li
                          key={index}
                          onClick={() => handleGenreChange(option)}
                        >
                          <p className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            {option}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading || !chapterLength}
                className={`mt-3 w-full flex items-center justify-center rounded-md py-3 font-medium text-white ${
                  isLoading || !chapterLength
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
      </SectionContainer>
    </SectionContainer>
  );
};

export default ThirdPage;
