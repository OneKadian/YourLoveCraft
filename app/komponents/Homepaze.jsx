"use client";

import { Button } from "./button";
import { Heart } from "lucide-react";
import { FeaturesCarousel } from "./Features/FeaturesCarousel";
import { TryItOutSection } from "./TryItOut/TryItOutSection";


export default function Home1() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-pink-900 mb-6">
            Your Romance, Your Way
          </h1>
          <p className="text-xl md:text-2xl text-pink-700 mb-8">
            Craft the perfect love story, uniquely inspired by your own ideas.
          </p>
          <Button
            size="lg"
            className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all hover:scale-105"
          >
            Start creating for Free <Heart className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Step 1",
                description:
                  "Decide everything about him, from his looks, personality, to his line of work",
              },
              {
                title: "Step 2",
                description:
                  "Fill up everything about her, looks, personality, put your own name here 😉",
              },
              {
                title: "Step 3",
                description:
                  "Let us Generate your personalized story, make changes, add your own twists and continue the journey",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative p-6 rounded-2xl bg-pink-50 shadow-md hover:shadow-lg transition-all"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-pink-900 mt-4 mb-3">
                  {step.title}
                </h3>
                <p className="text-pink-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Try It Out Section */}
      <TryItOutSection />

      {/* Features Section */}
      <section className="py-20 px-4 bg-pink-50">
        <div className="max-w-6xl mx-auto">
          <FeaturesCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-900 mb-6">
            Ever read a story and thought, hmm, only if it has this, it would be
            so much better!
          </h2>
          <p className="text-xl text-pink-700 mb-8">
            Been there? Well, do it now, write your stories with a few clicks,
            in your own way
          </p>
          <Button
            size="lg"
            className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all hover:scale-105"
          >
            Start creating <Heart className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </main>
  );
}
