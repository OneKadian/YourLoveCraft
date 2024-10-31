"use client";
import React, { useState } from "react";
import Image from "next/image";
import SectionContainer from "../../components/SectionContainer.jsx";
import stickyNote from "../../public/stickyNote3.png";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useAuth } from "@clerk/nextjs";
import { supabase } from "../../../supabase/supabaseClient.js"; // Correctly import supabase from the supabase folder

const page = () => {
  // State and Functions for Step 1
  const { userId } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [maleLeadName, setMaleLeadName] = useState("");
  const [progress, setProgress] = useState(40);

  // Updates the Progess bar and sets the name equal to male lead name
  const handleNameChange = (e) => {
    const input = e.target.value;
    setMaleLeadName(input);

    // Set progress based on the input length, maxing out at 10%
    const newProgress = Math.min(input.length, 10);
    setProgress(40 + newProgress);
  };

  // Submit function ( does not submit to supabase, just takes to new page )
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!maleLeadName) return; // Ensure the name field is filled

    setIsLoading(true);

    try {
      // Simulating API request for data insertion
      // Replace with actual data insertion logic
      setTimeout(() => {
        window.location.href = "/craft/sixth";
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setProgress(50); // Ensures the bar fills to 10% upon successful submit
    }
  };

  // Submit function that sends to Supabase
  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // Prevent default form behavior

  //   if (!name || !email) return; // Ensure fields are filled and user is authenticated

  //   setIsLoading(true); // Start loading

  //   try {
  //     // Insert user data into Supabase
  //     const { error } = await supabase.from("kuvamaone").insert({
  //       name: name,
  //       email: email,
  //       user_id: userId,
  //     });

  //     if (error) throw error; // If there's an error, handle it

  //     // Redirect only after successful data insertion
  //     window.location.href = "/craft/second";
  //   } catch (error) {
  //     console.error("Error inserting data:", error);
  //     alert("An error occurred while submitting your data. Please try again.");
  //     setIsLoading(false); // Stop loading spinner only on error
  //   }
  // };

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
              Lets introduce the Female lead
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
                  value={maleLeadName}
                  onChange={handleNameChange}
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading || !maleLeadName}
                className={`mt-3 flex items-center justify-center rounded-md py-3 font-medium text-white ${
                  isLoading || !maleLeadName
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

      {/* Image Section */}
      {/* Just uncomment to put a picture in the right side on large screen and no image on mobile */}
      {/* <SectionContainer className="page-banner--image hidden md:flex md:w-1/2 justify-center items-center relative bg-[#F3F5F8] min-h-screen">
  <div className="relative">
    <Image
      src={stickyNote}
      width={500}
      height={500}
      alt="Page Banner"
      objectFit="cover"
      className="rounded-md"
    />
    <div className="absolute inset-0 flex justify-center items-center font-normal font-reenie">
      <div className="w-[400px] h-[400px] text-black rounded-md overflow-hidden z-10 flex flex-col justify-center items-center">
        <p className="w-full m-0 mb-2 overflow-hidden">
          Good morning, Anita! 🌞✨
        </p>
        <p className="w-full m-0 mb-2 mt-4 overflow-hidden text-caveat">
          Today is another beautiful day to attract everything you desire.
          The universe is aligning in your favor, bringing you closer to
          your dream job with every positive thought and action.
        </p>
        <p className="w-full m-0 mb-2 overflow-hidden text-ellipsis">
          You're attracting opportunities that are meant just for you, and
          they are on their way. Embrace today with a heart full of
          gratitude and a mind focused on your goals.
        </p>
        <p className="w-full m-0 overflow-hidden">
          Wishing you a day full of joy, success, and endless
          possibilities! 🚀🌈
        </p>
      </div>
    </div>
  </div>
</SectionContainer> */}
    </SectionContainer>
  );
};

export default page;
