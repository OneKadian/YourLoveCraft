"use client";
import React, { useState, useEffect, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useAuth } from "@clerk/nextjs";
import DoneIcon from "@mui/icons-material/Done";
import { supabase } from "../../supabase/supabaseRequests.js";
import { useRouter } from "next/navigation";

const page = () => {
  const { userId } = useAuth();
  const [progress, setProgress] = useState(0);
  const [storyId, setStoryId] = useState(null);
  const router = useRouter(); // Initialize the router

  const [content, setContent] = useState(null); // Store the story content
  const hasFetched = useRef(false); // Prevent duplicate fetches
  const [sentences, setSentences] = useState([
    { text: "", isLoaded: false },
    { text: "", isLoaded: false },
    { text: "", isLoaded: false },
  ]);

  useEffect(() => {
    const fetchStoryFromSupabase = async () => {
      try {
        if (hasFetched.current) return; // Prevent multiple calls
        hasFetched.current = true;
        console.log(userId);
        console.log(localStorage.getItem("story_id"));
        console.log(storyId);

        setStoryId(localStorage.getItem("story_id"));

        // Retrieve user inputs from localStorage
        const maleLeadName =
          localStorage.getItem("male_lead_name") || "male lead";
        const maleLeadJob =
          localStorage.getItem("male_lead_job") || "unknown job";
        const maleLeadPersonality =
          localStorage.getItem("male_lead_personality") ||
          "unknown personality";

        const femaleLeadName =
          localStorage.getItem("female_lead_name") || "female lead";
        const femaleLeadAppearance =
          localStorage.getItem("female_lead_looks") || "unknown appearance";
        const femaleLeadJob =
          localStorage.getItem("female_lead_job") || "unknown job";
        const femaleLeadPersonality =
          localStorage.getItem("selectedFemalePersonality") ||
          localStorage.getItem("customFemaleInput") ||
          "unknown personality";

        const storyGenre =
          localStorage.getItem("story_genre") || "unknown genre";
        const storyPlot = localStorage.getItem("story_plot") || "unknown plot";
        const storyFantasies =
          localStorage.getItem("story_fantasies") || "no specific fantasies";
        const chapterLength =
          localStorage.getItem("chapter_length") || "an unspecified length";

        const requestBody = {
          formData: {
            maleLead: {
              name: maleLeadName,
              job: maleLeadJob,
              personality: maleLeadPersonality,
            },
            femaleLead: {
              name: femaleLeadName,
              appearance: femaleLeadAppearance,
              job: femaleLeadJob,
              personality: femaleLeadPersonality,
            },
            story: {
              genre: storyGenre,
              plot: storyPlot,
              fantasy: storyFantasies,
              length: chapterLength,
            },
          },
          storyId: localStorage.getItem("story_id"),
          userId,
        };

        // Call the Supabase edge function
        const { data, error } = await supabase.functions.invoke(
          "generate-story",
          {
            body: JSON.stringify(requestBody),
          }
        );

        if (error) {
          throw error;
        }

        if (data?.story) {
          setContent(data.story); // Save the generated story
        } else {
          throw new Error("No story was generated.");
        }
      } catch (error) {
        console.error("Error generating story:", error.message);
      }
    };

    const simulateLoading = () => {
      // Set initial loader sentences
      setSentences([
        { text: "Fetching the best storyline...", isLoaded: false },
        { text: "Crafting the perfect narrative...", isLoaded: false },
        { text: "Finalizing your story...", isLoaded: false },
      ]);

      const startTime = Date.now();

      // Update progress bar dynamically
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(100, Math.floor((elapsed / 50000) * 100)); // Fill in 50 seconds
        setProgress(progress);

        if (progress < 100) {
          requestAnimationFrame(updateProgress);
        }
      };

      updateProgress();

      // Simulate loading states for sentences
      const sentenceTimeouts = [
        setTimeout(() => {
          setSentences((prev) => {
            const updated = [...prev];
            updated[0].isLoaded = true;
            return updated;
          });
        }, 16000),
        setTimeout(() => {
          setSentences((prev) => {
            const updated = [...prev];
            updated[1].isLoaded = true;
            return updated;
          });
        }, 32000),
        setTimeout(() => {
          setSentences((prev) => {
            const updated = [...prev];
            updated[2].isLoaded = true;
            return updated;
          });
        }, 48000),
      ];

      // Cleanup timeouts
      return () => {
        sentenceTimeouts.forEach(clearTimeout);
      };
    };

    fetchStoryFromSupabase();
    const cleanup = simulateLoading();

    // Cleanup on component unmount
    return () => {
      cleanup();
    };
  }, [userId]);

  // Redirect to /library when progress reaches 100
  useEffect(() => {
    if (progress === 100) {
      router.push("/library"); // Redirect to the library page
    }
  }, [progress, router]);

  return (
    <div className="w-full bg-[#F3F5F8] justify-center items-center lg:px-12 px-2 page-banner--container pt-12 flex flex-col-reverse md:flex-row min-h-screen">
      <div className="page-banner--inner-container wrap wrap-px z-10 md:w-1/2 flex justify-center items-center h-full">
        <div className="my-auto mx-auto w-full flex flex-col justify-start pt-8 lg:justify-center min-h-screen md:min-h-auto">
          <div className="flex h-max my-4 w-full mt-16 lg:mt-0 justify-center items-center flex-col rounded-2xl bg-white px-4 sm:px-14 py-8">
            {/* Progress Bar */}
            <div className="relative w-full pt-4">
              <span
                className="absolute bottom-0 mb-4 -translate-x-1/2 w-12 h-10 bg-white shadow-[0px_12px_30px_0px_rgba(16,24,40,0.1)] rounded-full px-3.5 py-2 text-gray-800 text-xs font-medium flex justify-center items-center after:absolute after:bg-white after:flex after:bottom-[-5px] after:left-1/2 after:-z-10 after:h-3 after:w-3 after:-translate-x-1/2 after:rotate-45"
                style={{ left: `${progress}%` }}
              >
                {progress}%
              </span>
              <div className="relative flex w-full h-2.5 overflow-hidden rounded-3xl bg-gray-100 mt-2">
                <div
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: `${progress}%` }}
                  className="flex h-full items-center justify-center bg-indigo-600 text-white rounded-3xl"
                ></div>
              </div>
            </div>

            {/* Loading Sentences */}
            <div className="mt-8 space-y-6 text-black">
              {sentences.map((sentence, index) => (
                <div key={index} className="flex items-center space-x-4">
                  {sentence.isLoaded ? (
                    <DoneIcon className="text-green-500" />
                  ) : (
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
                  )}
                  <span className="text-lg text-gray-700">{sentence.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
