import OpenAI from "openai"; // Correctly import the OpenAI package
import { NextResponse } from "next/server";
import * as dotenv from "dotenv";
import { supabase } from "../../../supabase/supabaseRequests";
dotenv.config();

// Ensure the OpenAI API key is available
// if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
if (!process.env.OPENAI_API_KEY) {

  throw new Error("Missing OpenAI API Key in environment variables.");
}

// Initialize the OpenAI client
const openai = new OpenAI({
  // apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // API key from environment variables
  apiKey: process.env.OPENAI_API_KEY, // API key from environment variables
});

export async function POST(req) {
  try {
    // Parse the incoming request body
    const { prompt, storyId, userId } = await req.json();

    // Validate the inputs
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required and must be a string." },
        { status: 400 }
      );
    }
    if (!storyId || !userId) {
      return NextResponse.json(
        { error: "Story ID and User ID are required." },
        { status: 400 }
      );
    }
    if (prompt.length > 9000) {
      return NextResponse.json(
        { error: "Prompt is too long. Please shorten your input." },
        { status: 400 }
      );
    }

    // Send immediate confirmation response to the client
    const response = NextResponse.json(
      { message: "Order received. Processing the story." },
      { status: 200 }
    );

    // Asynchronously process the story generation and database insertion
    (async () => {
      try {
        // Generate the story using OpenAI
        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content:
                "You are a skilled writer, KIM, who follows the below guidelines.",
            },
            { role: "user", content: prompt },
          ],
          max_tokens: 1500,
          temperature: 1.0,
          top_p: 1,
        });

        // Extract the generated story
        const generatedStory = completion.choices[0]?.message?.content;

        if (!generatedStory) {
          console.error("Failed to generate the story. No content received.");
          return;
        }

        // Insert the generated story into the Supabase database
        const { error } = await supabase.from("chapters").insert({
          story_id: storyId,
          user_id: userId,
          content: generatedStory,
        });

        if (error) {
          console.error(
            "Error inserting story into chapters table:",
            error.message
          );
        } else {
          console.log("Story inserted successfully.");
        }
      } catch (error) {
        console.error(
          "Error during story generation or database insertion:",
          error
        );
      }
    })();

    // Return the confirmation response immediately
    return response;
  } catch (error) {
    // Log detailed error for debugging
    console.error(
      "Error handling /api/write request:",
      error.stack || error.message
    );

    // Return a generic error message to the client
    return NextResponse.json(
      { error: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}
