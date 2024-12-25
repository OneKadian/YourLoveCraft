"use client";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { updateFemaleLeadPersonality } from "../../../supabase/supabaseRequests.js";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const ThirdPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [femaleLeadPersonality, setFemaleLeadPersonality] = useState("");
  const [progress, setProgress] = useState(70);
  const [selectedOption, setSelectedOption] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [storyId, setStoryId] = useState(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleGoBack = () => {
    localStorage.setItem("selected_option", selectedOption);
    localStorage.setItem("custom_input", customInput);
  };

  const handleCustomInputChange = (e) => {
    const input = e.target.value;
    setCustomInput(input);
    setFemaleLeadPersonality(input);
    localStorage.setItem("customFemaleInput", input);
  };

  useEffect(() => {
    const savedStoryId = localStorage.getItem("story_id");
    const savedSelectedOption = localStorage.getItem(
      "selectedFemalePersonality"
    );
    const savedCustomInput = localStorage.getItem("customFemaleInput");

    if (savedStoryId) setStoryId(savedStoryId);

    if (savedSelectedOption) {
      setSelectedOption(savedSelectedOption);

      if (savedSelectedOption === "Create Your Own") {
        setIsCustomInput(true);
        setCustomInput(savedCustomInput || "");
        setFemaleLeadPersonality(savedCustomInput || "");
      } else {
        setIsCustomInput(false);
        setFemaleLeadPersonality(savedSelectedOption);
      }
    }

    setIsPageLoading(false);
  }, []);

  const handlePersonalityChange = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);

    if (option === "Create Your Own") {
      setIsCustomInput(true);
      setFemaleLeadPersonality(customInput);
      setProgress(70);
    } else {
      setIsCustomInput(false);
      setFemaleLeadPersonality(option);
      setProgress(80);
    }

    setCustomInput("");
    localStorage.setItem("selectedFemalePersonality", option);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!femaleLeadPersonality) return;

    setIsLoading(true);
    try {
      await updateFemaleLeadPersonality(storyId, femaleLeadPersonality);

      localStorage.setItem("female_lead_personality", femaleLeadPersonality);

      setTimeout(() => {
        window.location.assign("/craft/ninth");
      }, 1000);
    } catch (error) {
      console.error("Error updating story:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full bg-[#F3F5F8] justify-center items-center lg:px-12 px-2 page-banner--container pt-12 flex flex-col-reverse md:flex-row min-h-screen">
      <div className="page-banner--inner-container wrap wrap-px z-10 md:w-1/2 flex justify-center items-center h-full">
        <div className="my-auto mx-auto w-full flex flex-col justify-start pt-8 lg:justify-center min-h-screen md:min-h-auto">
          <div className="flex h-max my-4 w-full justify-center items-center flex-col rounded-2xl bg-white px-2 sm:px-14">
            <Link href="/craft/seventh">
              <button
                type="button"
                className="bg-white text-black border border-gray-200 font-medium rounded-full text-sm p-2.5 inline-flex items-center mb-4 mt-4"
                onClick={handleGoBack}
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
              And her personality?
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
                        <li
                          onClick={() =>
                            handlePersonalityChange(
                              "The Elegant Heiress: Sophisticated, poised, and has a hidden rebellious side..."
                            )
                          }
                        >
                          <p className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <span className="font-semibold">
                              The Elegant Heiress:
                            </span>{" "}
                            Sophisticated, poised, and has a hidden rebellious
                            side that the male lead brings out.
                          </p>
                        </li>
                        <li
                          onClick={() =>
                            handlePersonalityChange(
                              "The Strong-Willed Detective: Intelligent, brave, and has a no-nonsense attitude..."
                            )
                          }
                        >
                          <p className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <span className="font-semibold">
                              The Strong-Willed Detective:
                            </span>{" "}
                            Intelligent, brave, and has a no-nonsense attitude
                            that softens for the right person.
                          </p>
                        </li>
                        <li
                          onClick={() =>
                            handlePersonalityChange(
                              "The Girl Next Door: Kind-hearted, relatable, and effortlessly charming..."
                            )
                          }
                        >
                          <p className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <span className="font-semibold">
                              The Girl Next Door:
                            </span>{" "}
                            Kind-hearted, relatable, and effortlessly charming,
                            often bringing calmness to the male lead's life.
                          </p>
                        </li>
                        <li
                          onClick={() =>
                            handlePersonalityChange(
                              "The Best Friend: Supportive and loyal, a slow-burn romance..."
                            )
                          }
                        >
                          <p className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <span className="font-semibold">
                              The Best Friend:
                            </span>{" "}
                            Supportive and loyal, leading to a slow-burn romance
                            where friendship blossoms into love.
                          </p>
                        </li>
                        <li
                          onClick={() =>
                            handlePersonalityChange("Create Your Own")
                          }
                        >
                          <p className="block px-4 cursor-pointer font-semibold py-2 hover:bg-gray-100">
                            Create Your Own
                          </p>
                        </li>
                      </ul>
                    </div>
                  )}

                  {isCustomInput && (
                    <div>
                      <div className="flex justify-end items-center">
                        <span className="block mt-2 px-2 text-sm text-gray-500 justify-end">
                          {customInput.length}/200
                        </span>
                      </div>
                      <textarea
                        type="text"
                        id="job"
                        name="job"
                        className="bg-gray-50 border border-gray-300 text-gray-900 h-[240px] text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
                        placeholder="Describe her unique traits, background, or personality in 200 characters or less."
                        maxLength={200}
                        value={customInput}
                        onChange={handleCustomInputChange}
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading || !femaleLeadPersonality}
                  className={`mt-3 w-full flex items-center justify-center rounded-md py-3 font-medium text-white ${isLoading || !femaleLeadPersonality ? "bg-gray-400 opacity-50 cursor-not-allowed" : "bg-gray-900 cursor-pointer"}`}
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
                    "Continue"
                  )}
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
