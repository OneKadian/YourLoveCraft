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
     <div className="px-4 py-8 min-h-screen flex justify-center items-center bg-gradient-to-b from-pink-50 to-white">

      <div className="flex flex-col items-center gap-6 w-screen">
        {/* Toggle */}
        <div className="flex items-center gap-3 bg-pink-100 rounded-full px-3 py-1 border border-pink-500">
          <span
            className={`text-md font-medium ${
              !isAnnual ? "text-pink-500 font-bold" : "text-gray-800"
            }`}
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
            <div className="relative w-10 h-5 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-pink-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-500"></div>
          </label>
          <span
            className={`text-md font-medium ${
              isAnnual ? "text-pink-500 font-bold" : "text-gray-800"
            }`}
          >
            Annual
          </span>
        </div>

        {/* Pricing Card */}
        <Card className="w-full max-w-sm border border-pink-500 shadow-md">
          <CardHeader className="text-center">
            <p className="text-base font-semibold mb-2 text-gray-800">
              {currentPlan.title}
            </p>
            <div className="flex justify-center">
              <Image
                src={currentPlan.image}
                alt={isAnnual ? "Cafe mocha" : "Caramel Latte"}
                className={`w-32 h-auto object-contain ${
                  isAnnual ? "animate-carousel-left" : "animate-carousel-right"
                }`}
                loading="eager"
                height={150}
                width={150}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-pink-500">
                    {currentPlan.price}
                  </span>
                  <span className="text-base text-gray-800">
                    /{currentPlan.period}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{currentPlan.billing}</p>
              </div>

              {/* Free months section with fixed height */}
              <div className={`h-6 mt-4 ${!isAnnual ? "hidden" : ""}`}>
                {currentPlan.freeMonths && (
                  <p className="text-sm font-bold text-pink-500 mt-1 animate-bounce">
                    {currentPlan.freeMonths}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2 text-md text-gray-800">
              <p>{currentPlan.intro}</p>
              <ul className="space-y-1">
                <li>
                  - Unlimited stories for the whole{" "}
                  {isAnnual ? "year" : "month"}?
                </li>
                <li>- Nonstop drama for {currentPlan.duration}</li>
                <li>- Create pictures, listen his voice</li>
                <li>
                  - Share, create and read nonstop for {currentPlan.duration}!
                </li>
              </ul>
            </div>

            <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pricing;
