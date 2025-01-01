"use client";

interface StoryDisplayProps {
  name: string;
}

export function StoryDisplay({ name }: StoryDisplayProps) {
  const storyContent = `The hum of energy in the gym was almost palpable as ${name} adjusted the weights on the dumbbell rack. Her sleek green eyes scanned the room casually, not expecting to find anything more than the usual crowd of fitness enthusiasts and grunting men. That was until her gaze landed on Adrian, his intimidating reputation preceded him. He stood with quiet dominance near the rowing machines, his chiseled form an artwork of strength and discipline.

They hadn't met before, but she'd heard his name whispered among fellow professionals, tales of his sharp business acumen and seemingly endless ambition. Intrigued by how he carried himself, she couldn't help but admire the muscles flexing under his shirt as he worked through his exercise routine.`;

  return (
    <div className="text-gray-800 max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
      <p className="whitespace-pre-wrap font-serif text-base sm:text-lg leading-relaxed text-gray-800 text-justify sm:text-left">
        {storyContent}
      </p>
    </div>
  );
}
