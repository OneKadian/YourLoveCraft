"use client";
import React, { useState } from "react";
import SectionContainer from "../../components/SectionContainer.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ThirdPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [maleLeadJob, setMaleLeadJob] = useState("");
  const [progress, setProgress] = useState(70);
  const [selectedOption, setSelectedOption] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleJobChange = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);

    if (option !== "Create Your Own") {
      setMaleLeadJob(option);
      setCustomInput("");
      setProgress(75);
    } else {
      setMaleLeadJob("");
      setProgress(70);
    }
  };

  const handleCustomInputChange = (e) => {
    const input = e.target.value;
    setCustomInput(input);
    setMaleLeadJob(input);

    // Update progress based on input length
    if (selectedOption === "Create Your Own" && input.length > 0) {
      setProgress(75);
    } else if (selectedOption === "Create Your Own" && input.length === 0) {
      setProgress(70);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!maleLeadJob) return;

    setIsLoading(true);
    try {
      setTimeout(() => {
        window.location.href = "/craft/ninth";
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setProgress(80); // Ensures the bar fills to 10% upon successful submit
    }
  };

  return (
    <SectionContainer className="w-full bg-[#F3F5F8] justify-center items-center lg:px-12 px-2 page-banner--container pt-12 flex flex-col-reverse md:flex-row min-h-screen">
      <SectionContainer className="page-banner--inner-container wrap wrap-px z-10 md:w-1/2 flex justify-center items-center h-full">
        <div className="my-auto mx-auto w-full flex flex-col justify-start pt-8 lg:justify-center min-h-screen md:min-h-auto">
          <div className="flex h-max my-4 w-full justify-center items-center flex-col rounded-2xl bg-white px-2 sm:px-14">
            {/* Progress Bar */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-[#a50062] h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <h2 className="text-3xl font-semibold text-gray-700 text-center mt-12">
              And her personality?
            </h2>

            <div className="mt-4 flex w-full flex-col pb-4">
              <div className="relative mb-4 w-full">
                {/* Dropdown button */}
                <button
                  id="dropdownDefaultButton"
                  onClick={handleDropdownToggle}
                  className="text-black w-full border border-x-black-50 bg-[#F3F5F8] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-3 text-left inline-flex items-center justify-between"
                  type="button"
                >
                  {selectedOption || "Make your selection"}
                  <svg
                    className="w-2.5 h-2.5 ml-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div
                    id="dropdown"
                    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full mt-2"
                  >
                    <ul className="py-2 text-md text-gray-700">
                      <li
                        onClick={() =>
                          handleJobChange(
                            "The Dreamer: Creative and imaginative, she often sees the world through a lens of possibility, drawn to passionate men who inspire her dreams, fostering deep and meaningful relationships."
                          )
                        }
                      >
                        <p className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          The Dreamer: Creative and imaginative, she often sees
                          the world through a lens of possibility, drawn to
                          passionate men who inspire her dreams, fostering deep
                          and meaningful relationships.
                        </p>
                      </li>
                      <li
                        onClick={() =>
                          handleJobChange(
                            "The Independent Spirit: Strong-willed and self-reliant, she values her freedom and seeks men who respect her independence, building relationships based on mutual support and respect."
                          )
                        }
                      >
                        <p className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          The Independent Spirit: Strong-willed and
                          self-reliant, she values her freedom and seeks men who
                          respect her independence, building relationships based
                          on mutual support and respect.
                        </p>
                      </li>
                      <li
                        onClick={() =>
                          handleJobChange(
                            "The Caregiver: Nurturing and empathetic, she is always there for her loved ones, often attracted to vulnerable men, but she values partners who appreciate and reciprocate her nurturing nature."
                          )
                        }
                      >
                        <p className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          The Caregiver: Nurturing and empathetic, she is always
                          there for her loved ones, often attracted to
                          vulnerable men, but she values partners who appreciate
                          and reciprocate her nurturing nature.
                        </p>
                      </li>
                      <li
                        onClick={() =>
                          handleJobChange(
                            "The Adventurer: Spontaneous and fearless, she thrives on new experiences and is often drawn to thrill-seeking men, handling relationships with excitement while knowing when to avoid toxic dynamics."
                          )
                        }
                      >
                        <p className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          The Adventurer: Spontaneous and fearless, she thrives
                          on new experiences and is often drawn to
                          thrill-seeking men, handling relationships with
                          excitement while knowing when to avoid toxic dynamics.
                        </p>
                      </li>
                      <li onClick={() => handleJobChange("Create Your Own")}>
                        <p className="block px-4 cursor-pointer font-semibold py-2 hover:bg-gray-100">
                          Create Your Own
                        </p>
                      </li>
                    </ul>
                  </div>
                )}

                {/* Textarea for custom input */}
                {selectedOption === "Create Your Own" && (
                  <div>
                    <div className="flex justify-end items-center">
                      <span className="block mt-2 px-2 text-sm text-gray-500 justify-end">
                        {customInput.length}/200
                      </span>
                    </div>
                    <textarea
                      type="text"
                      id="job"
                      name="job"
                      className="bg-gray-50 border border-gray-300 text-gray-900 h-[240px] text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
                      placeholder="Describe his unique traits, background, or personality in 200 characters or less."
                      maxLength={200}
                      value={customInput}
                      onChange={handleCustomInputChange}
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={
                  isLoading || (!maleLeadJob && customInput.length === 0)
                }
                className={`mt-3 w-full flex items-center justify-center rounded-md py-3 font-medium text-white ${
                  isLoading || (!maleLeadJob && customInput.length === 0)
                    ? "bg-gray-400 opacity-50 cursor-not-allowed"
                    : "bg-gray-900 cursor-pointer"
                }`}
              >
                {isLoading ? (
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress color="inherit" size={24} />
                  </Box>
                ) : (
                  <>
                    <p>Continue</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-4 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </SectionContainer>
    </SectionContainer>
  );
};

export default ThirdPage;
