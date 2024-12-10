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
    console.log("Story generation started.");

    // Generate the story
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
    });

    const generatedStory = completion.choices[0]?.message?.content;

    if (!generatedStory) {
      console.error("Story generation failed.");
      return;
    }
    console.log("Story generated successfully:", generatedStory);

    // Save the story in Supabase
    const { error } = await supabase.from("chapters").insert({
      story_id: storyId,
      user_id: userId,
      content: generatedStory,
    });

    if (error) {
      console.error("Supabase insertion error:", error.message);
      return;
    }

    console.log("Story saved successfully in Supabase.");
  } catch (error) {
    console.error("Error in generateAndSaveStory:", error.message);
  }
}

export async function POST(req) {
  try {
    const { prompt, storyId, userId } = await req.json();

    if (!prompt || !storyId || !userId) {
      console.error("Validation failed: Missing required fields.");
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    console.log("Received prompt:", prompt);

    // Process in the background
    setTimeout(async () => {
      console.log("Calling generateAndSaveStory...");
      await generateAndSaveStory(prompt, storyId, userId);
      console.log("generateAndSaveStory completed.");
    }, 0);

    return NextResponse.json({ message: "Order received." }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/write handler:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
