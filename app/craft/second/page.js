"use client";
import React, { useState, useEffect } from "react";
import SectionContainer from "../../components/SectionContainer.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { updateMaleLeadLooks } from "../../../supabase/supabaseRequests.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

const SecondPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [maleLeadLooks, setMaleLeadLooks] = useState("");
  const [progress, setProgress] = useState(10);
  const [storyId, setStoryId] = useState(null);
  const [toastDisplay, setToastDisplay] = useState(false);
  const [userToastDisplay, setUserToastDisplay] = useState(true);

  const handleLooksChange = (e) => {
    const input = e.target.value;
    setMaleLeadLooks(input);

    // Update the progress bar based on the input length, maxing out at 20%
    const newProgress = Math.min(input.length / 15, 10);
    setProgress(10 + newProgress); // Starting from 10% to add to the previous progress
  };

  useEffect(() => {
    // Retrieve the existing story ID and male_lead_looks from local storage
    const savedStoryId = localStorage.getItem("story_id");
    const savedMaleLeadLooks = localStorage.getItem("male_lead_looks");

    if (savedStoryId) setStoryId(savedStoryId);
    if (savedMaleLeadLooks) setMaleLeadLooks(savedMaleLeadLooks); // Set even if null
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!maleLeadLooks) return;

    setIsLoading(true); // Start spinner

    try {
      // Update the story row with matching story_id
      await updateMaleLeadLooks(storyId, maleLeadLooks);

      // Save maleLeadLooks to local storage
      localStorage.setItem("male_lead_looks", maleLeadLooks);

      // Redirect to the next page after successful update
      console.log("Looks updated successfully");
      window.location.assign("/craft/third");
    } catch (error) {
      console.error("Error updating story:", error);
    }
    // Spinner keeps spinning as per requirement
  };

  return (
    <SectionContainer className="w-full bg-[#F3F5F8] justify-center items-center lg:px-12 px-2 page-banner--container pt-12 flex flex-col-reverse md:flex-row min-h-screen">
      <SectionContainer className="page-banner--inner-container wrap wrap-px z-10 md:w-1/2 flex justify-center items-center h-full">
        <div className="my-auto mx-auto w-full flex flex-col justify-start pt-8 lg:justify-center min-h-screen md:min-h-auto">
          <div className="flex h-max my-4 w-full justify-center items-center flex-col rounded-2xl bg-white px-2 sm:px-14">
            {/* <Link href="/craft/first">
              <button
                type="button"
                className="bg-white text-black border border-gray-200 font-medium rounded-full text-sm p-2.5 inline-flex items-center mb-4 mt-4"
              >
                <ArrowBackIcon className="w-4 h-4 mr-2" />
                <span>Go back</span>
              </button>
            </Link> */}
            <Link href="/craft/first">
              <button
                type="button"
                className="bg-white text-black border border-gray-200 font-medium rounded-full text-sm p-2.5 inline-flex items-center mb-4 mt-4"
                onClick={() =>
                  localStorage.setItem("male_lead_looks", maleLeadLooks)
                } // Save value to local storage on click
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
              What does this handsome look like?
            </h2>

            <div className="mt-4 flex w-full flex-col pb-4">
              <div className="relative mb-4">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="looks"
                    className="block text-lg font-medium mb-2 text-gray-900"
                  >
                    Describe his appearance
                  </label>
                  <span className="block mb-2 text-sm text-gray-500">
                    {maleLeadLooks.length}/300
                  </span>
                </div>
                <textarea
                  type="text"
                  id="looks"
                  name="looks"
                  className="bg-gray-50 border border-gray-300 text-gray-900 h-[240px] text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="He's a tall 6'4 with intense brown eyes that seem to hold a thousand secrets. His strong jawline complements a faint dimpled smile, while his tousled dark hair and lean, muscular frame radiate quiet strength. His long arms and confident stride make him impossible to ignore"
                  maxLength={300}
                  value={maleLeadLooks}
                  onChange={handleLooksChange}
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading || !maleLeadLooks}
                className={`mt-3 flex items-center justify-center rounded-md py-3 font-medium text-white ${
                  isLoading || !maleLeadLooks
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
      {userToastDisplay && (
        <AnimatePresence>
          {userToastDisplay && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              id="toast-bottom-right"
              className="fixed flex items-center z-10 w-max p-4 space-x-4 text-gray-500 bg-gray-200 divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow right-5 bottom-5 lg:max-w-xs"
              role="alert"
            >
              <div className="flex">
                <div className="ms-3 text-sm font-normal flex flex-col justify-center">
                  <span className="mb-1 text-sm text-center flex justify-center font-semibold text-gray-900">
                    You must be logged in
                  </span>
                  <div className="mb-2 mt-2 text-sm font-normal">
                    Please login before moving forward
                  </div>
                  <div className="grid grid-cols-1 gap-2 h-10">
                    <div className="flex justify-center">
                      <Link
                        href="/sign-in"
                        className="inline-flex justify-center items-center w-3/4 h-full px-2 py-1.5 text-sm font-semibold text-center text-black bg-secondary-500 rounded-lg hover:bg-secondary-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className={`ms-auto -mx-1.5 -my-1.5  items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8`}
                  data-dismiss-target="#toast-interactive"
                  aria-label="Close"
                  onClick={() => {
                    setUserToastDisplay(false);
                  }}
                >
                  <RxCross1 className="text-black" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </SectionContainer>
  );
};

export default SecondPage;
