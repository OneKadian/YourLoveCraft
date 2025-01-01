"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FeatureCard } from "./FeatureCard";
import pic1 from "../../public/pic1.png"
import pic2 from "../../public/pic2.png";
import pic3 from "../../public/pic3.png";
import pic4 from "../../public/pic4.png";
import pic5 from "../../public/pic5.png";

const features = [
  {
    title: "Create your own characters",
    description: "Name him, decide what he looks like, behaves like, decide what he does, for work and to her : )",
    image: pic1,
  },
  {
    title: "Write your own story",
    description: "From meet-cutes to happily-ever-afters, bring your romantic fantasies to life, decide the plot, the twists, the fantasies",
    image: pic2,
  },
  {
    title: "Visualize the scenes",
    description: "Bring him to life, create his images, dress him up the way you want, put him in scenarios",
    image: pic3,
    comingSoon: true,
  },
  {
    title: "Imagine yourself with him",
    description: "Upload your own picture, create an avatar and create the pictures where he gets to explore you",
    image: pic4,
    comingSoon: true,
  },
  {
    title: "Talk to him",
    description: "Wanna hear his deep manly voice as he confesses to you? Talk to all your characters, either over text or hear them",
    image: pic5,
    comingSoon: true,
  },
]

export function FeaturesCarousel() {
  const [currentFeature, setCurrentFeature] = useState(0);

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  return (
    <div className="relative">
      <button
        onClick={prevFeature}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
      >
        <ChevronLeft className="h-8 w-8 text-pink-600" />
      </button>
      <button
        onClick={nextFeature}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
      >
        <ChevronRight className="h-8 w-8 text-pink-600" />
      </button>
      
      <div className="flex justify-center mb-6">
        {features.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              currentFeature === index ? "bg-pink-600" : "bg-pink-200"
            }`}
          />
        ))}
      </div>

      <FeatureCard {...features[currentFeature]} />
    </div>
  );
}