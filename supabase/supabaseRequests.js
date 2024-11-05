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
  maleLeadLooks,
  maleLeadJob,
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
    maleleadappearance: maleLeadLooks,
    maleleadoccupation: maleLeadJob,
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
  maleLeadLooks,
  maleLeadJob,
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
      maleleadappearance: maleLeadLooks,
      maleleadoccupation: maleLeadJob,
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

export const updateMaleLeadJob = async (storyId, maleLeadJob) => {
  const { data, error } = await supabase
    .from("storycraftform")
    .update({ maleleadoccupation: maleLeadJob })
    .eq("story_id", storyId);

  if (error) {
    console.error("Error updating male lead job:", error);
    return null;
  }

  console.log("Male lead job updated successfully:", data);
  return data;
};

export const updateMaleLeadLooks = async (storyId, maleLeadLooks) => {
  const { data, error } = await supabase
    .from("storycraftform")
    .update({ maleleadappearance: maleLeadLooks })
    .eq("story_id", storyId);

  if (error) {
    console.error("Error updating male lead looks:", error);
    return null;
  }

  console.log("Male lead looks updated successfully:", data);
  return data;
};

// Update male lead personality
export const updateMaleLeadPersonality = async (
  storyId,
  maleLeadPersonality
) => {
  const { data, error } = await supabase
    .from("storycraftform")
    .update({ maleleadpersonality: maleLeadPersonality })
    .eq("story_id", storyId);

  if (error) {
    console.error("Error updating male lead personality:", error);
    return null;
  }

  console.log("Male lead personality updated successfully:", data);
  return data;
};

// Update female lead name
export const updateFemaleLeadName = async (storyId, femaleLeadName) => {
  const { data, error } = await supabase
    .from("storycraftform")
    .update({ femaleleadname: femaleLeadName })
    .eq("story_id", storyId);

  if (error) {
    console.error("Error updating female lead name:", error);
    return null;
  }

  console.log("Female lead name updated successfully:", data);
  return data;
};

// Update female lead appearance
export const updateFemaleLeadAppearance = async (
  storyId,
  femaleLeadAppearance
) => {
  const { data, error } = await supabase
    .from("storycraftform")
    .update({ femaleleadappearance: femaleLeadAppearance })
    .eq("story_id", storyId);

  if (error) {
    console.error("Error updating female lead appearance:", error);
    return null;
  }

  console.log("Female lead appearance updated successfully:", data);
  return data;
};

// Update female lead occupation
export const updateFemaleLeadOccupation = async (
  storyId,
  femaleLeadOccupation
) => {
  const { data, error } = await supabase
    .from("storycraftform")
    .update({ femaleleadoccupation: femaleLeadOccupation })
    .eq("story_id", storyId);

  if (error) {
    console.error("Error updating female lead occupation:", error);
    return null;
  }

  console.log("Female lead occupation updated successfully:", data);
  return data;
};

// Update female lead personality
export const updateFemaleLeadPersonality = async (
  storyId,
  femaleLeadPersonality
) => {
  const { data, error } = await supabase
    .from("storycraftform")
    .update({ femaleleadpersonality: femaleLeadPersonality })
    .eq("story_id", storyId);

  if (error) {
    console.error("Error updating female lead personality:", error);
    return null;
  }

  console.log("Female lead personality updated successfully:", data);
  return data;
};

// Update story plot
export const updateStoryPlot = async (storyId, storyPlot) => {
  const { data, error } = await supabase
    .from("storycraftform")
    .update({ storyplot: storyPlot })
    .eq("story_id", storyId);

  if (error) {
    console.error("Error updating story plot:", error);
    return null;
  }

  console.log("Story plot updated successfully:", data);
  return data;
};

// Update story fantasies
export const updateStoryFantasies = async (storyId, storyFantasies) => {
  const { data, error } = await supabase
    .from("storycraftform")
    .update({ storyfantasies: storyFantasies })
    .eq("story_id", storyId);

  if (error) {
    console.error("Error updating story fantasies:", error);
    return null;
  }

  console.log("Story fantasies updated successfully:", data);
  return data;
};

// Update story genre
export const updateStoryGenre = async (storyId, storyGenre) => {
  const { data, error } = await supabase
    .from("storycraftform")
    .update({ storygenre: storyGenre })
    .eq("story_id", storyId);

  if (error) {
    console.error("Error updating story genre:", error);
    return null;
  }

  console.log("Story genre updated successfully:", data);
  return data;
};

// Update story length
export const updateStoryLength = async (storyId, storyLength) => {
  const { data, error } = await supabase
    .from("storycraftform")
    .update({ storylength: storyLength })
    .eq("story_id", storyId);

  if (error) {
    console.error("Error updating story length:", error);
    return null;
  }

  console.log("Story length updated successfully:", data);
  return data;
};

// Update story title
export const updateStoryTitle = async (storyId, storyTitle) => {
  const { data, error } = await supabase
    .from("storycraftform")
    .update({ storytitle: storyTitle })
    .eq("story_id", storyId);

  if (error) {
    console.error("Error updating story title:", error);
    return null;
  }

  console.log("Story title updated successfully:", data);
  return data;
};
