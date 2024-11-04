import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
);

// Function to add a new story to the "storyCraftForm" table
export const addStory = async (
  userId,
  storyId,
  maleLeadName,
  maleLeadAppearance,
  maleLeadOccupation,
  maleLeadPersonality,
  femaleLeadName,
  femaleLeadAppearance,
  femaleLeadOccupation,
  femaleLeadPersonality,
  storyPlot,
  storyFantasies,
  storyGenre,
  storyLength,
  storyTitle
) => {
  const { data, error } = await supabase.from("storycraftform").insert({
    user_id: userId,
    story_id: storyId,
    maleleadname: maleLeadName,
    maleleadappearance: maleLeadAppearance,
    maleleadoccupation: maleLeadOccupation,
    maleleadpersonality: maleLeadPersonality,
    femaleleadname: femaleLeadName,
    femaleleadappearance: femaleLeadAppearance,
    femaleleadoccupation: femaleLeadOccupation,
    femaleleadpersonality: femaleLeadPersonality,
    storyplot: storyPlot,
    storyfantasies: storyFantasies,
    storygenre: storyGenre,
    storylength: storyLength,
    storytitle: storyTitle,
  });

  if (error) {
    console.error("Error inserting story:", error);
    return null;
  }

  console.log("Story inserted successfully:", data);
  return data;
};

// Function to retrieve stories for a specific user and story ID
export const getStories = async (userId, storyId) => {
  const { data: stories, error } = await supabase
    .from("storycraftform")
    // .from("storyCraftForm")

    .select("*")
    .eq("user_id", userId)
    .eq("story_id", storyId);

  if (error) {
    console.error("Error fetching stories:", error);
    return [];
  }

  return stories;
};

export const updateStoryByStoryId = async (
  storyId,
  maleLeadAppearance,
  maleLeadOccupation,
  maleLeadPersonality,
  femaleLeadName,
  femaleLeadAppearance,
  femaleLeadOccupation,
  femaleLeadPersonality,
  storyPlot,
  storyFantasies,
  storyGenre,
  storyLength,
  storyTitle
) => {
  const { data, error } = await supabase
    .from("storycraftform")
    .update({
      maleleadappearance: maleLeadAppearance,
      maleleadoccupation: maleLeadOccupation,
      maleleadpersonality: maleLeadPersonality,
      femaleleadname: femaleLeadName,
      femaleleadappearance: femaleLeadAppearance,
      femaleleadoccupation: femaleLeadOccupation,
      femaleleadpersonality: femaleLeadPersonality,
      storyplot: storyPlot,
      storyfantasies: storyFantasies,
      storygenre: storyGenre,
      storylength: storyLength,
      storytitle: storyTitle,
    })
    .eq("story_id", storyId);

  if (error) {
    console.error("Error updating story:", error);
    return null;
  }

  console.log("Story updated successfully:", data);
  return data;
};
