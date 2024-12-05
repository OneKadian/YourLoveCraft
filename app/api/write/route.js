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

export async function POST(req) {
  try {
    const { prompt, storyId, userId } = await req.json();

    if (!prompt || !storyId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    console.log("Received prompt:", prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
    });

    const generatedStory = completion.choices[0]?.message?.content;

    if (!generatedStory) {
      console.error("Story generation failed.");
      return;
    }

    const { error } = await supabase.from("chapters").insert({
      story_id: storyId,
      user_id: userId,
      content: generatedStory,
    });

    if (error) {
      console.error("Supabase error:", error.message);
      return;
    }

    console.log("Story saved successfully.");
    return NextResponse.json({ message: "Story processed successfully." });
  } catch (error) {
    console.error("Error in /api/write:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
