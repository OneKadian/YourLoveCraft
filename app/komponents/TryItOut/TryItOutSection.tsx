"use client";

import { useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { Loader2 } from "lucide-react";
import { StoryDisplay } from "./StoryDisplay";

export function TryItOutSection() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showStory, setShowStory] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    setIsLoading(true);
    // Simulate loading for 4 seconds
    await new Promise(resolve => setTimeout(resolve, 4000));
    setIsLoading(false);
    setShowStory(true);
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-pink-900 mb-12">
          Try it out now!
        </h2>
        
        {!showStory ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-lg p-6 rounded-lg border border-gray-400"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !name}
              className="w-full bg-pink-900 hover:bg-pink-800 text-white p-6 text-lg rounded-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </form>
        ) : (
          <StoryDisplay name={name} />
        )}
      </div>
    </section>
  );
}