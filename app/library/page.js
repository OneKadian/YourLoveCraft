"use client";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Page = () => {
  const { userId } = useAuth(); // Authentication from Clerk
  const [stories, setStories] = useState([]); // State to store fetched stories
  const [isStoriesLoading, setIsStoriesLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const router = useRouter(); // Initialize the router

  // Fetch stories on mount
  // useEffect(() => {


  //   const fetchStories = async () => {
  //     try {
  //       const { data, error } = await supabase
  //         .from("storycraftform")
  //         .select("story_id, storyplot, storytitle")
  //         .eq("user_id", userId);

  //       if (error) {
  //         console.error("Error fetching stories:", error.message);
  //         setError("Failed to fetch stories. Please try again later.");
  //       } else {
  //         setStories(data); // Set stories data
  //       }
  //     } catch (err) {
  //       console.error("Unexpected error:", err);
  //       setError("An unexpected error occurred. Please try again.");
  //     } finally {
  //       setIsStoriesLoading(false); // Set loading state to false
  //     }
  //   };

  //   if (userId) {
  //     fetchStories(); // Fetch stories only if userId exists
  //   }
  // }, [userId]);

useEffect(() => {
  const fetchStories = async () => {
    try {
      console.log("Fetching stories for user ID:", userId);
      const { data, error } = await supabase
        .from("storycraftform")
        .select("story_id, storyplot, storytitle")
        .eq("user_id", userId);

      if (error) {
        console.error("Supabase Error:", error.message);
        setError("Failed to fetch stories. Please try again later.");
      } else {
        console.log("Fetched stories:", data);
        setStories(data); // Set stories data
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsStoriesLoading(false); // Set loading state to false
    }
  };

  if (userId) {
    fetchStories(); // Fetch stories only if userId exists
  } else {
    console.warn("User ID is not defined.");
  }
}, [userId]);


  return (
    <div className="w-full bg-[#F3F5F8] flex justify-center items-center min-h-screen">
      {isStoriesLoading ? ( // Show spinner while loading
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
        <div className="w-full max-w-7xl flex justify-center mt-24 mb-16 lg:mb-0 lg:mt-0 px-4 lg:px-12">
          {error ? ( // Display error message if any
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <div
                  key={story.story_id} // Use story_id as the unique key
                  className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md"
                >
                  {/* Title */}
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {story.storytitle.length > 40
                      ? `${story.storytitle.slice(0, 40)}...`
                      : story.storytitle}
                  </h5>

                  {/* Plot */}
                  <p className="mb-3 font-normal text-gray-700">
                    {story.storyplot.length > 100
                      ? `${story.storyplot.slice(0, 100)}...`
                      : story.storyplot}
                  </p>

                  {/* Read Button */}
                  <button
                    className="inline-flex mt-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    onClick={() => {
                      // Redirect to the dynamic route
                      router.push(`/read/${story.story_id}/0`);
                    }}
                  >
                    Read
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
