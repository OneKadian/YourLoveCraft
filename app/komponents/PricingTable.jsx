"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../components/card.tsx";
import { Button } from "../components/button.tsx";
import Caramel from "../public/caramel.png";
import Dark from "../public/dark.png";
import Image from "next/image.js";
const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const planDetails = {
    monthly: {
      price: "$8",
      period: "month",
      image: Caramel,
      title: "Costs as much as this Caramel Latte here",
      intro: "Would you consume this once or have:",
      duration: "30 days",
      billing: "You will be billed once monthly",
      freeMonths: "",
    },
    annual: {
      price: "$6.6",
      period: "month",
      image: Dark,
      title: "Costs as much as this Cafe mocha here",
      intro: "Would you consume this once or have:",
      duration: "365 days",
      billing: "You will be billed once annually",
      freeMonths: "2 MONTHS FREE! 🎊",
    },
  };

  const currentPlan = isAnnual ? planDetails.annual : planDetails.monthly;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-6 mt-12">
        {/* Toggle */}
        <div className="flex items-center gap-3 bg-accent/30 rounded-full px-4 py-2">
          <span
            className={`text-sm font-medium ${!isAnnual ? "text-primary" : ""}`}
          >
            Monthly
          </span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink-500"></div>
          </label>
          <span
            className={`text-sm font-medium ${isAnnual ? "text-primary" : ""}`}
          >
            Annual
          </span>
        </div>

        {/* Pricing Card */}
        <Card className="w-full max-w-md border-2 border-primary">
          <CardHeader className="text-center">
            <p className="text-lg mb-2">{currentPlan.title}</p>
            <div className="flex justify-center">
              {/* Preload both images */}
              <link rel="preload" as="image" href={planDetails.monthly.image} />
              <link rel="preload" as="image" href={planDetails.annual.image} />
              <Image
                src={currentPlan.image}
                alt={isAnnual ? "Cafe mocha" : "Caramel Latte"}
                className={`w-48 h-auto object-contain ${
                  isAnnual ? "animate-carousel-left" : "animate-carousel-right"
                }`}
                loading="eager"
                height={100}
                width={100}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl font-bold text-primary">
                  {currentPlan.price}
                </span>
                <span className="text-xl">/{currentPlan.period}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {currentPlan.billing}
              </p>
              {currentPlan.freeMonths && (
                <p className="text-lg font-bold text-primary mt-2 animate-bounce">
                  {currentPlan.freeMonths}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <p>{currentPlan.intro}</p>
              <ul className="space-y-2">
                <li>
                  - Unlimited stories for the whole{" "}
                  {isAnnual ? "year" : "month"}?
                </li>
                <li>- Nonstop drama for {currentPlan.duration}</li>
                <li>- Create pictures, listen his voice</li>
                <li>
                  - Shar, create and read nonstop for {currentPlan.duration}!
                </li>
              </ul>
            </div>

            <Button className="w-full">Get Started</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pricing;
