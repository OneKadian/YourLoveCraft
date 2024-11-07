"use client";
import React, { useEffect, useState } from "react";
import { updateStoryFantasies } from "../../../supabase/supabaseRequests.js"; // Import the updateStoryFantasies function
import SectionContainer from "../../components/SectionContainer.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ThirdPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [storyFantasies, setStoryFantasies] = useState("");
  const [progress, setProgress] = useState(85);
  const [storyId, setStoryId] = useState(null);
  const [fantasiesOption, setFantasiesOption] = useState("Yes");

  const handleFantasiesChange = (event) => {
    if (fantasiesOption === "Yes") {
      setStoryFantasies(event.target.value); // Update text only if "Yes" is selected
    }
  };

  // New function to handle "Go back" button click
  const handleGoBack = () => {
    // Save the current values of storyFantasies and fantasiesOption to local storage
    localStorage.setItem("story_fantasies", storyFantasies);
    localStorage.setItem("fantasies_option", fantasiesOption);
  };

  const handleFantasiesOptionChange = (event) => {
    const selectedOption = event.target.value;
    setFantasiesOption(selectedOption);

    if (selectedOption === "No") {
      setStoryFantasies("No"); // Set to "No" if the user selects "No"
    } else {
      setStoryFantasies(""); // Clear the text if the user selects "Yes"
    }

    // Update local storage immediately for both selections
    localStorage.setItem(
      "story_fantasies",
      selectedOption === "No" ? "No" : ""
    );
    localStorage.setItem("fantasies_option", selectedOption);
  };

  // useEffect(() => {
  //   // Retrieve data from local storage when component mounts
  //   const savedStoryId = localStorage.getItem("story_id");
  //   const savedStoryFantasies = localStorage.getItem("story_fantasies");
  //   const savedFantasiesOption = localStorage.getItem("fantasies_option");

  //   if (savedStoryId) setStoryId(savedStoryId);
  //   if (savedStoryFantasies) setStoryFantasies(savedStoryFantasies);
  //   if (savedFantasiesOption) setFantasiesOption(savedFantasiesOption);
  // }, []);

  // const handleFantasiesOptionChange = (event) => {
  //   const selectedOption = event.target.value;
  //   setFantasiesOption(selectedOption);

  //   if (selectedOption === "No") {
  //     setStoryFantasies("No"); // Set to "No" if the user selects "No"
  //   } else {
  //     setStoryFantasies(""); // Clear the text if the user selects "Yes"
  //   }
  // };

  // useEffect(() => {
  //   // Retrieve the existing data from local storage
  //   const savedStoryId = localStorage.getItem("story_id");
  //   const savedStoryFantasies = localStorage.getItem("story_fantasies");
  //   const savedFantasiesOption = localStorage.getItem("fantasies_option");

  //   if (savedStoryId) setStoryId(savedStoryId);
  //   if (savedStoryFantasies) setStoryFantasies(savedStoryFantasies);
  //   if (savedFantasiesOption) setFantasiesOption(savedFantasiesOption); // Set option even if null
  // }, []);

  useEffect(() => {
    // Retrieve the existing data from local storage
    const savedStoryId = localStorage.getItem("story_id");
    const savedStoryFantasies = localStorage.getItem("story_fantasies");
    const savedFantasiesOption = localStorage.getItem("fantasies_option");

    if (savedStoryId) setStoryId(savedStoryId);
    if (savedStoryFantasies) setStoryFantasies(savedStoryFantasies);
    if (savedFantasiesOption) setFantasiesOption(savedFantasiesOption);

    // Set loading to false once data is fetched
    setIsPageLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storyFantasies || !storyId) return;

    setIsLoading(true);

    try {
      await updateStoryFantasies(storyId, storyFantasies);

      // Save both storyFantasies and fantasiesOption to local storage
      localStorage.setItem("story_fantasies", storyFantasies);
      localStorage.setItem("fantasies_option", fantasiesOption);

      console.log("Fantasies updated successfully");
      window.location.href = "/craft/eleventh";
    } catch (error) {
      console.error("Error updating story fantasies:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setProgress(90);
    }
  };

  return (
    <SectionContainer className="w-full bg-[#F3F5F8] justify-center items-center lg:px-12 px-2 page-banner--container pt-12 flex flex-col-reverse md:flex-row min-h-screen">
      <SectionContainer className="page-banner--inner-container wrap wrap-px z-10 md:w-1/2 flex justify-center items-center h-full">
        <div className="my-auto mx-auto w-full flex flex-col justify-start pt-8 lg:justify-center min-h-screen md:min-h-auto">
          <div className="flex h-max my-4 w-full justify-center items-center flex-col rounded-2xl bg-white px-2 sm:px-14">
            {/* <Link href="/craft/ninth">
              <button
                type="button"
                className="bg-white text-black border border-gray-200 font-medium rounded-full text-sm p-2.5 inline-flex items-center mb-4 mt-4"
                onClick={() =>
                  localStorage.setItem("story_fantasies", storyFantasies)
                }
              >
                <ArrowBackIcon className="w-4 h-4 mr-2" />
                <span>Go back</span>
              </button>
            </Link> */}

            <Link href="/craft/ninth">
              <button
                type="button"
                className="bg-white text-black border border-gray-200 font-medium rounded-full text-sm p-2.5 inline-flex items-center mb-4 mt-4"
                onClick={handleGoBack} // Call handleGoBack on click
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
              Any fantasies you wish to live or enjoy during the first chapter,
              my lady?
            </h2>

            {isPageLoading ? (
              <div className="w-full h-max flex justify-center">
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              </div>
            ) : (
              <div className="mt-4 flex w-full flex-col pb-4">
                <div className="relative mb-4">
                  <label
                    htmlFor="fantasies-dropdown"
                    className="block text-lg font-medium mb-2 text-gray-900"
                  >
                    Would you like to live and enjoy any fantasies during the
                    first chapter, my lady?
                  </label>

                  {/* Dropdown for Yes/No selection */}
                  <select
                    id="fantasies-dropdown"
                    value={fantasiesOption}
                    onChange={handleFantasiesOptionChange}
                    className="w-full border border-gray-300 bg-[#F3F5F8] rounded-lg text-md px-5 py-3 text-left text-black font-medium mb-4"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>

                  {/* Fantasy text area, displayed if user selects "Yes" */}
                  {fantasiesOption === "Yes" && (
                    <div>
                      <div className="flex justify-between items-center">
                        <label
                          htmlFor="job"
                          className="block text-lg font-medium mb-2 text-gray-900"
                        >
                          Try making some connection to the plot
                        </label>
                        <span className="block mb-2 text-sm text-gray-500">
                          {storyFantasies.length}/200
                        </span>
                      </div>
                      <textarea
                        type="text"
                        id="job"
                        name="job"
                        className="bg-gray-50 border border-gray-300 text-gray-900 h-[240px] text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="She would stumble into his arms, his breath warm on her neck as his hand lingers just a little too long, without a word, he grabs her waist, pulling her close, declaring her his with a fierce, unyielding kiss."
                        maxLength={200}
                        value={storyFantasies}
                        onChange={handleFantasiesChange}
                      />
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={
                    isLoading || (!storyFantasies && fantasiesOption === "Yes")
                  }
                  className={`mt-3 flex items-center justify-center rounded-md py-3 font-medium text-white ${
                    isLoading || (!storyFantasies && fantasiesOption === "Yes")
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
            )}
          </div>
        </div>
      </SectionContainer>
    </SectionContainer>
  );
};

export default ThirdPage;
