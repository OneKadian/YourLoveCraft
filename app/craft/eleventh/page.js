"use client";
import React, { useState, useEffect } from "react";
import SectionContainer from "../../components/SectionContainer.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { updateStoryGenre } from "../../../supabase/supabaseRequests.js";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ThirdPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [storyGenre, setStoryGenre] = useState("");
  const [progress, setProgress] = useState(90);
  const [selectedOption, setSelectedOption] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [storyId, setStoryId] = useState(null);

  // Load story ID from localStorage

  // Handle dropdown toggle
  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // Handle option selection
  const handleGenreChange = (option) => {
    setSelectedOption(option);
    setCustomInput("");
    setIsDropdownOpen(false);

    // Set storyGenre based on option or custom input
    if (option === "Create Your Own") {
      setStoryGenre(customInput);
      setProgress(90);
    } else {
      setStoryGenre(option);
      setProgress(95);
    }
  };

  // Handle custom input change
  const handleCustomInputChange = (e) => {
    const input = e.target.value;
    setCustomInput(input);

    // Keep selectedOption as "Create Your Own" and only update storyGenre and progress
    if (selectedOption === "Create Your Own") {
      setStoryGenre(input);
      setProgress(input.length > 0 ? 95 : 90);
    }
  };

  // Handle form submission
  useEffect(() => {
    // Retrieve the existing story ID and story_genre from local storage
    const savedStoryId = localStorage.getItem("story_id");
    const savedStoryGenre = localStorage.getItem("story_genre");

    if (savedStoryId) setStoryId(savedStoryId);
    if (savedStoryGenre) setStoryGenre(savedStoryGenre); // Set even if null
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storyGenre || !storyId) return;

    setIsLoading(true);

    try {
      // Update the story row with the matching story_id
      await updateStoryGenre(storyId, storyGenre);

      // Save story_genre to local storage
      localStorage.setItem("story_genre", storyGenre);

      // Redirect to the next page after successful update
      console.log("Genre updated successfully");
      setTimeout(() => {
        window.location.href = "/craft/twelfth";
      }, 1000);
    } catch (error) {
      console.error("Error updating story genre:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setProgress(95); // Ensures the bar fills to 95% upon successful submit
    }
  };

  return (
    <SectionContainer className="w-full bg-[#F3F5F8] justify-center items-center lg:px-12 px-2 page-banner--container pt-12 flex flex-col-reverse md:flex-row min-h-screen">
      <SectionContainer className="page-banner--inner-container wrap wrap-px z-10 md:w-1/2 flex justify-center items-center h-full">
        <div className="my-auto mx-auto w-full flex flex-col justify-start pt-8 lg:justify-center min-h-screen md:min-h-auto">
          <div className="flex h-max my-4 w-full justify-center items-center flex-col rounded-2xl bg-white px-2 sm:px-14">
            <Link href="/craft/tenth">
              <button
                type="button"
                className="bg-white text-black border border-gray-200 font-medium rounded-full text-sm p-2.5 inline-flex items-center mb-4 mt-4"
                onClick={() => localStorage.setItem("story_genre", storyGenre)}
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
              What will be the genre for the chapter?
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
                      {[
                        "Romance – From sweet first loves to forbidden passions, romance remains one of the most popular genres.",
                        "Fantasy – Worlds filled with magic, mythical creatures, and epic adventures captivate many readers.",
                        "Teen Fiction – Stories about high school life, friendships, and the ups and downs of teenage relationships.",
                        "Mystery/Thriller – Intriguing plots with suspense, crime, or detective work that keep readers on edge.",
                        "Paranormal – Vampires, werewolves, and supernatural beings create an enticingly dark atmosphere.",
                        "Science Fiction – Futuristic settings, space travel, and advanced technology excite this genre.",
                        "Adventure – High-stakes quests and daring escapades are often featured here, perfect for thrill-seekers.",
                        "Action – Fast-paced scenes, battles, and resilient characters facing danger or challenges.",
                        "Horror – Eerie, unsettling, and often frightening, horror stories are popular for their spine-chilling narratives.",
                        "Fanfiction – Stories involving popular characters or celebrities, reimagined in unique scenarios by fans.",
                      ].map((option, index) => (
                        <li
                          key={index}
                          onClick={() => handleGenreChange(option)}
                        >
                          <p className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            {option}
                          </p>
                        </li>
                      ))}
                      <li onClick={() => handleGenreChange("Create Your Own")}>
                        <p className="block px-4 cursor-pointer font-semibold py-2 hover:bg-gray-100">
                          Create Your Own
                        </p>
                      </li>
                    </ul>
                  </div>
                )}

                {/* Textarea for custom input */}
                {selectedOption === "Create Your Own" && (
                  <div>
                    <div className="flex justify-end items-center">
                      <span className="block mt-2 px-2 text-sm text-gray-500 justify-end">
                        {customInput.length}/100
                      </span>
                    </div>
                    <textarea
                      type="text"
                      id="genre"
                      name="genre"
                      className="bg-gray-50 border border-gray-300 text-gray-900 h-[100px] text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
                      placeholder="Describe your own unique genre for this chapter."
                      maxLength={100}
                      value={customInput}
                      onChange={handleCustomInputChange}
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={
                  isLoading || (!storyGenre && customInput.length === 0)
                }
                className={`mt-3 w-full flex items-center justify-center rounded-md py-3 font-medium text-white ${
                  isLoading || (!storyGenre && customInput.length === 0)
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
