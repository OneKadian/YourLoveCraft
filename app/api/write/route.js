import OpenAI from "openai"; // Correctly import the OpenAI package
import { NextResponse } from "next/server";
import * as dotenv from "dotenv";

dotenv.config();

// Ensure the OpenAI API key is available
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API Key in environment variables.");
}

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // API key from environment variables
});

export async function POST(req) {
  try {
    // Parse the incoming request body
    const { prompt } = await req.json();

    // Validate the prompt
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required and must be a string." },
        { status: 400 }
      );
    }

    // Validate the prompt length
    if (prompt.length > 9000) {
      return NextResponse.json(
        { error: "Prompt is too long. Please shorten your input." },
        { status: 400 }
      );
    }

    // Call OpenAI API using the updated client
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // Use GPT-4 or specify another model as needed
      messages: [
        {
          role: "system",
          content:
            "You are a skilled writer, KIM, who follows the below guidelines.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 1500, // Adjust token limits as per requirements
      temperature: 1.0, // High creativity
      top_p: 1, // Full probability distribution
    });

    // Extract the response message
    const responseMessage = completion.choices[0]?.message?.content;

    if (!responseMessage) {
      return NextResponse.json(
        { error: "Failed to generate the story. Please try again." },
        { status: 500 }
      );
    }

    // Return the generated story
    return NextResponse.json({ story: responseMessage }, { status: 200 });
  } catch (error) {
    // Log detailed error for debugging
    console.error("Error connecting to OpenAI:", error.stack || error.message);

    // Return a generic error message to the client
    return NextResponse.json(
      { error: "An error occurred while connecting to OpenAI." },
      { status: 500 }
    );
  }
}
