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

const Page = () => {
  const { userId } = useAuth(); // Authentication from Clerk
  const [stories, setStories] = useState([]); // State to store fetched stories
  const [isStoriesLoading, setIsStoriesLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch stories on mount
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data, error } = await supabase
          .from("storycraftform")
          .select("story_id, storyplot, storytitle")
          .eq("user_id", userId);

        if (error) {
          console.error("Error fetching stories:", error.message);
          setError("Failed to fetch stories. Please try again later.");
        } else {
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
    }
  }, [userId]);

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
              {/* Replace this with actual story content */}
              <p>
                This is a placeholder for the story content. Users can scroll
                and read the entire story here.
              </p>
              <p>
                "How can you say that when he dumped you after two weeks?" My
                hands were balled into fists, and I tried so hard to keep the
                anger out of my voice. She wasn't the one I was furious with —
                he was. The audacity. The freaking nerve of this guy. Sure, his
                very existence bothered me — seeing him date two different girls
                a month without any bad rumors following him was unfair,
                unusual, unnatural. But now? Now he'd done it to one of my best
                friends. His little jedi mind trick, or whatever it was that he
                pulled, and seeing it firsthand, was both terrifying and
                infuriating. "It's really not like that, Sky. He was good to me
                for the two weeks we were together. I knew the chances he would
                fall for me were slim. That wasn't even why I did it." There was
                a small smile on her face, a complete contrast to the tears
                streaming down it. Furrowing my brows, I stared at her, totally
                incredulous. "Lily, what are you even saying? He's a jerk! Noah
                plays around with girls and then he tosses them aside when he's
                done. I don't know how he threatened you, but—" "I told you he's
                not like that!" Despite her distraught demeanor, Lily's voice
                raised a few octaves, and my eyebrows shot up in surprise. She
                let out a deep sigh and entwined her fingers together. "Sorry,
                but don't—don't talk about him like that. He's a really good
                guy. I think he's seriously just looking for a girl to fall in
                love with." Letting out a frustrated huff, I bumped my head
                against the back of her couch and closed my eyes. It was like
                she'd been brainwashed. Who spoke like that about someone who
                had dated them for a measly two weeks before tossing them like
                yesterday's garbage? Everyone who dated Noah Archer, apparently.
                Pulling my knees up to my chest, I shook my head in disbelief.
                "Then help me understand. You're the best person ever, so I find
                it impossible that he'd be actually looking for love and then
                not fall for you." There had to be a way I could get her to see
                this my way. Lily sighed, a sad but soft smile on her lips.
                "It's not. Being with him was like living in a different world,
                Sky. Almost like a dream, really... To be honest, I don't think
                I could even keep up with him." She chuckled. Chuckled! This was
                starting to feel a lot like the teen romance version of the Body
                Snatchers. "Sounds more like a nightmare," I muttered through
                gritted teeth and crossed my arms over my chest. "Sky, stop it.
                I had a great two weeks. Like I already said, I knew from the
                start that he wouldn't fall for me." She shrugged as if it was
                no big deal, but just looking at her face would tell you she was
                far from indifferent. "Then why did you even—" I felt bile
                rising up my throat and jumped to my feet, afraid I would
                actually end up vomiting all over her burgundy carpet. Pacing
                around her living room, I tried to organize my thoughts. Lily
                had always been a kind person, but this went beyond just simple
                kindness — and she was far from being the only one to act in
                this disturbing way. There wasn't one single speck of dirt on
                Noah's reputation, and that just wasn't right. "I just wanted to
                make some good memories before—" She stopped mid-sentence, and I
                froze in place. All the spiteful images that had flared through
                my mind — of tripping Noah at school tomorrow and watching him
                faceplant onto the disgusting floor — instantly dissipated.
                Maybe there was more to the sadness that coated her eyes.
                "Before... what?" It was hard to keep the dread out of my voice.
                Nothing good ever came after a but or a before. My stomach
                clenched. Lily let out a sigh and glanced up at me, guilt and
                regret clear in every crease of her pretty face. "Will you
                please just sit back down first? You're making me nervous...."
              </p>
              {/* Add more paragraphs or dynamically render content */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
