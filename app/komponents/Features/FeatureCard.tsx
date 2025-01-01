"use client";

import { Card } from "../card";
import { Sparkles } from "lucide-react";
import Image from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  image: any; // Updated to match the `next/image` module type
  comingSoon?: boolean;
}

export function FeatureCard({ title, description, image, comingSoon }: FeatureCardProps) {
  return (
    <Card className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-lg">
      {/* Adjusted Image Container */}
      <div className="relative w-full h-64 md:h-96 mb-4 rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain" // Ensures the image fits without being cut
          priority
        />
        {comingSoon && (
          <div className="absolute top-4 right-4 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            Coming Soon <Sparkles className="ml-1 h-4 w-4" />
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-pink-900 mb-3">{title}</h3>
      <p className="text-pink-700">{description}</p>
    </Card>
  );
}
