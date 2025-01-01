"use client";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Page = ({ params }) => {
  const { userId } = useAuth(); // Authentication from Clerk
  const [storyContent, setStoryContent] = useState(null); // State to manage story content
  const [isStoriesLoading, setIsStoriesLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const { story } = params; // Destructure params to get story ID

  useEffect(() => {
    if (!story) {
      console.error("Story ID is missing");
      setError("Invalid story ID.");
      setIsStoriesLoading(false);
      return;
    }

    console.log("Fetching story for story_id:", story);

    const fetchStory = async () => {
      try {
        // Fetch the story details
        const { data, error: fetchError } = await supabase
          .from("chapters")
          .select("*")
          .eq("story_id", story[0]); // Fetch story by ID

        console.log("Supabase response for story:", data, fetchError);

        if (fetchError) {
          console.error("Error fetching story:", fetchError);
          throw fetchError;
        }

        if (data.length === 0) {
          console.warn("No story found for the given ID:", story);
          setError("Story not found.");
        } else {
          console.log("Fetched story content:", data[0]);
          setStoryContent(data[story[1]]); // Set the fetched story content
        }
      } catch (fetchError) {
        console.error("Caught fetch error:", fetchError.message);
        setError(fetchError.message || "Failed to fetch the story.");
      } finally {
        setIsStoriesLoading(false);
      }
    };

    fetchStory();
  }, [story]);

  return (
    <div className="w-full bg-[#F3F5F8] flex justify-center items-center min-h-screen">
      {isStoriesLoading ? (
        // Show spinner while loading
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={48} />
        </Box>
      ) : (
        <div className="w-full max-w-[90%] lg:max-w-[60%] bg-white flex justify-center mt-24 mb-16 px-4 lg:px-8 py-6 shadow-md rounded-md">
          {error ? (
            // Display error message if any
            <div className="text-red-500">{error}</div>
          ) : (
            // Story content goes here
            <div className="text-gray-800 leading-relaxed">
              <p className="whitespace-pre-wrap font-serif text-lg leading-relaxed text-gray-800">{storyContent.content}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
