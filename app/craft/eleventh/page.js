"use client";
import React, { useState, useEffect } from "react";
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
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [storyId, setStoryId] = useState(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleGenreChange = (option) => {
    setSelectedOption(option);
    setCustomInput("");
    setIsDropdownOpen(false);

    if (option === "Create Your Own") {
      setProgress(90);
    } else {
      setStoryGenre(option);
      setProgress(95);
    }
    localStorage.setItem("selected_option", option);
  };

  const handleCustomInputChange = (e) => {
    const input = e.target.value;
    setCustomInput(input);
    setStoryGenre(input);
    setProgress(input.length > 0 ? 95 : 90);
    localStorage.setItem("custom_input", input);
  };

  const handleGoBack = () => {
    localStorage.setItem("story_genre", storyGenre);
    window.location.href = "/craft/tenth";
  };

  useEffect(() => {
    const savedStoryId = localStorage.getItem("story_id");
    const savedStoryGenre = localStorage.getItem("story_genre");
    const savedOption = localStorage.getItem("selected_option");
    const savedCustomInput = localStorage.getItem("custom_input");

    if (savedStoryId) setStoryId(savedStoryId);
    if (savedStoryGenre) setStoryGenre(savedStoryGenre);
    if (savedOption) setSelectedOption(savedOption);
    if (savedOption === "Create Your Own" && savedCustomInput) {
      setCustomInput(savedCustomInput);
      setStoryGenre(savedCustomInput);
    }

    setTimeout(() => {
      setIsPageLoading(false);
    }, 500);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storyGenre || !storyId) return;

    setIsLoading(true);

    try {
      await updateStoryGenre(storyId, storyGenre);
      localStorage.setItem("story_genre", storyGenre);
      setTimeout(() => {
        window.location.href = "/craft/twelfth";
      }, 1000);
    } catch (error) {
      console.error("Error updating story genre:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setProgress(95);
    }
  };

  return (
    <div className="w-full bg-[#F3F5F8] justify-center items-center lg:px-12 px-2 page-banner--container pt-12 flex flex-col-reverse md:flex-row min-h-screen">
      <div className="page-banner--inner-container wrap wrap-px z-10 md:w-1/2 flex justify-center items-center h-full">
        <div className="my-auto mx-auto w-full flex flex-col justify-start pt-8 lg:justify-center min-h-screen md:min-h-auto">
          <div className="flex h-max my-4 w-full justify-center items-center flex-col rounded-2xl bg-white px-2 sm:px-14">
            <Link href="/craft/tenth">
              <button
                type="button"
                className="bg-white text-black border border-gray-200 font-medium rounded-full text-sm p-2.5 inline-flex items-center mb-4 mt-4"
                onClick={handleGoBack}
              >
                <ArrowBackIcon className="w-4 h-4 mr-2" />
                <span>Go back</span>
              </button>
            </Link>

            <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-[#a50062] h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <h2 className="text-3xl font-semibold text-gray-700 text-center mt-12">
              What will be the genre for the chapter?
            </h2>
            {isPageLoading ? (
              <div className="w-full h-max flex justify-center mt-4">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "4px",
                  }}
                >
                  <CircularProgress />
                </Box>
              </div>
            ) : (
              <div className="mt-4 flex w-full flex-col pb-4">
                <div className="relative mb-4 w-full">
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
                              <span className="font-semibold">
                                {option.split(" – ")[0]}:
                              </span>{" "}
                              {option.split(" – ")[1]}
                            </p>
                          </li>
                        ))}
                        <li
                          onClick={() => handleGenreChange("Create Your Own")}
                        >
                          <p className="block px-4 cursor-pointer font-semibold py-2 hover:bg-gray-100">
                            Create Your Own
                          </p>
                        </li>
                      </ul>
                    </div>
                  )}

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

                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading || !storyGenre}
                  className={`mt-3 w-full flex items-center justify-center rounded-md py-3 font-medium text-white ${
                    isLoading || !storyGenre
                      ? "bg-gray-400 opacity-50 cursor-not-allowed"
                      : "bg-gray-900 cursor-pointer"
                  }`}
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdPage;
