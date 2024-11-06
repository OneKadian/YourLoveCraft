"use client";
import React, { useState, useEffect } from "react";
import SectionContainer from "../../components/SectionContainer.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { updateFemaleLeadAppearance } from "../../../supabase/supabaseRequests.js";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SecondPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [femaleLeadLooks, setFemaleLeadLooks] = useState("");
  const [progress, setProgress] = useState(50);
  const [storyId, setStoryId] = useState(null);

  const handleLooksChange = (e) => {
    const input = e.target.value;
    setFemaleLeadLooks(input);

    // Update the progress bar based on the input length, maxing out at 20%
    const newProgress = Math.min(input.length / 15, 10);
    setProgress(50 + newProgress); // Starting from 10% to add to the previous progress
  };

  useEffect(() => {
    // Retrieve the existing story ID and female_lead_appearance (looks) from local storage
    const savedStoryId = localStorage.getItem("story_id");
    const savedFemaleLeadLooks = localStorage.getItem("female_lead_looks");

    if (savedStoryId) setStoryId(savedStoryId);
    if (savedFemaleLeadLooks) setFemaleLeadLooks(savedFemaleLeadLooks); // Set even if null
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!femaleLeadLooks || !storyId) return;

    setIsLoading(true);

    try {
      // Update the story row with matching story_id
      await updateFemaleLeadAppearance(storyId, femaleLeadLooks);

      // Save female_lead_appearance to local storage
      localStorage.setItem("female_lead_looks", femaleLeadLooks);

      // Redirect to the next page after successful update
      console.log("Appearance updated successfully");
      window.location.href = "/craft/seventh";
    } catch (error) {
      console.error("Error updating female lead appearance:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setProgress(60); // Ensures the bar fills to 60% upon successful submit
    }
  };

  return (
    <SectionContainer className="w-full bg-[#F3F5F8] justify-center items-center lg:px-12 px-2 page-banner--container pt-12 flex flex-col-reverse md:flex-row min-h-screen">
      <SectionContainer className="page-banner--inner-container wrap wrap-px z-10 md:w-1/2 flex justify-center items-center h-full">
        <div className="my-auto mx-auto w-full flex flex-col justify-start pt-8 lg:justify-center min-h-screen md:min-h-auto">
          <div className="flex h-max my-4 w-full justify-center items-center flex-col rounded-2xl bg-white px-2 sm:px-14">
            <Link href="/craft/fifth">
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
              Is she as beautiful as you?
            </h2>

            <div className="mt-4 flex w-full flex-col pb-4">
              <div className="relative mb-4">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="looks"
                    className="block text-lg font-medium mb-2 text-gray-900"
                  >
                    Describe her appearance
                  </label>
                  <span className="block mb-2 text-sm text-gray-500">
                    {femaleLeadLooks.length}/300
                  </span>
                </div>
                <textarea
                  type="text"
                  id="looks"
                  name="looks"
                  className="bg-gray-50 border border-gray-300 text-gray-900 h-[240px] text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="With deep green eyes that hold a captivating sparkle, she has full lips and high cheekbones that frame a warm, inviting smile. Her long, wavy chestnut hair cascades down her shoulders, and her graceful, hourglass figure draws every eye. Her movements are poised, radiating confidence and allure."
                  maxLength={300}
                  value={femaleLeadLooks}
                  onChange={handleLooksChange}
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading || !femaleLeadLooks}
                className={`mt-3 flex items-center justify-center rounded-md py-3 font-medium text-white ${
                  isLoading || !femaleLeadLooks
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

export default SecondPage;
