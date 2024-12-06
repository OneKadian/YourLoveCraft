import OpenAI from "openai";
import { NextResponse } from "next/server";
import * as dotenv from "dotenv";
import { supabase } from "../../../supabase/supabaseRequests";
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API Key in environment variables.");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateAndSaveStory(prompt, storyId, userId) {
  try {
    // Generate the story using OpenAI
    console.log(
      `[INFO] Generating story for storyId: ${storyId}, userId: ${userId}`
    );
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Use GPT-3.5
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
    });

    const generatedStory = completion.choices[0]?.message?.content;

    if (!generatedStory) {
      console.error(`[ERROR] Story generation failed for storyId: ${storyId}`);
      throw new Error(
        "Story generation failed. No content received from OpenAI."
      );
    }

    // Save the story to Supabase
    console.log(`[INFO] Saving story to Supabase for storyId: ${storyId}`);
    const { error } = await supabase.from("chapters").insert({
      story_id: storyId,
      user_id: userId,
      content: generatedStory,
    });

    if (error) {
      console.error(
        `[ERROR] Supabase error for storyId: ${storyId}: ${error.message}`
      );
      throw new Error(`Supabase error: ${error.message}`);
    }

    console.log(`[SUCCESS] Story saved successfully for storyId: ${storyId}`);
  } catch (error) {
    console.error(
      `[ERROR] Error in generateAndSaveStory for storyId: ${storyId}: ${error.message}`
    );
    // You can integrate additional monitoring tools here (e.g., Sentry, LogRocket)
  }
}

export async function POST(req) {
  try {
    const { prompt, storyId, userId } = await req.json();

    if (!prompt || !storyId || !userId) {
      console.error("[ERROR] Missing required fields in the request.");
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    console.log(`[INFO] Received prompt for storyId: ${storyId}`);

    // Immediately respond to the client
    generateAndSaveStory(prompt, storyId, userId) // No need for setTimeout
      .then(() =>
        console.log(`[INFO] Background task completed for storyId: ${storyId}`)
      )
      .catch((error) =>
        console.error(
          `[ERROR] Background task failed for storyId: ${storyId}: ${error.message}`
        )
      );

    return NextResponse.json({ message: "Order received." }, { status: 202 });
  } catch (error) {
    console.error(`[ERROR] Error in /api/write: ${error.message}`);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
