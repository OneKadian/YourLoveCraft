"use client";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

const Header = () => {
  const { userId } = useAuth();

  return (
    <header
      id="header"
      className="header fixed left-0 w-full top-0 z-30 bg-white"
    >
      <div className="header--container wrap wrap-px bg-white border-[1px] border-transparent border-gradient-to-b from-neutral-100 to-neutral-500">
        {/* Logo here */}
        {/* <div className="header-logo--container">
          <h1 className="logo mb-0">
            <Link href="/">
              <Image
                src={Logo}
                alt="logo"
                className="h-6 w-auto"
                height="24"
                width="100"
              />
            </Link>
          </h1>
        </div> */}
        <div className="flex md:flex-row-reverse items-center ml-auto">

          <div className="block mx-2 md:mx-0">

            {!userId ? (


              <>
                <Link
                  href="/sign-in"
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white hidden cursor-pointer md:inline-flex mx-1 items-center justify-center gap-3 rounded-lg px-8 py-2 btn btn--secondary md:w-auto"
                >
                  Login
                </Link>
                <Link
                  href="/sign-in"
                  className="inline-flex bg-pink-600 hover:bg-pink-700 text-white text-base md:hidden mx-1 w-max cursor-pointer items-center justify-center gap-3 rounded-lg px-4 py-2 btn btn--secondary md:w-auto"
                >
                  Login
                </Link>


                <Link
                  href="/sign-up"
                  // className="btn btn--secondary ml-4"
                  // className="inline-flex w-full  cursor-pointer  items-center justify-center gap-3 rounded-lg px-8 py-2 font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 ml-4 to-neutral-500 border border-solid border-neutral-400 transition-colors duration-300 md:w-auto"
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white hidden cursor-pointer mx-1 md:inline-flex items-center justify-center gap-3 rounded-lg px-8 py-2 btn btn--secondary md:w-auto"
                >
                  Lets craft
                </Link>
                <Link
                  href="/sign-up"
                  className="inline-flex bg-pink-600 hover:bg-pink-700 text-white mx-1 text-base md:hidden w-max cursor-pointer items-center justify-center gap-3 rounded-lg px-4 py-2 btn btn--secondary md:w-auto"

                >
                  Lets craft
                </Link>
              </>
            ) : (
              <div className="flex">

                <Link
                  href="/craft/first"
                  className="inline-flex bg-pink-600 hover:bg-pink-700 text-white text-base mx-4 w-max cursor-pointer items-center justify-center gap-3 rounded-lg px-4 py-2 btn btn--secondary md:w-auto"
                >
                  <button
                    type="button"
                    onClick={() => {
                      // Clear all specified items from localStorage
                      // Existing localStorage remove items
                      localStorage.removeItem("male_lead_name");
                      localStorage.removeItem("male_lead_job");
                      localStorage.removeItem("male_lead_looks");
                      localStorage.removeItem("male_lead_personality");
                      localStorage.removeItem("female_lead_name");
                      localStorage.removeItem("female_lead_looks");
                      localStorage.removeItem("female_lead_job");
                      localStorage.removeItem("story_plot");
                      localStorage.removeItem("story_fantasies");
                      localStorage.removeItem("story_genre");
                      localStorage.removeItem("chapter_length");
                      localStorage.removeItem("selectedMalePersonality");
                      localStorage.removeItem("customMaleInput");
                      localStorage.removeItem("story_id");
                      // Additional localStorage items for female personality and genre
                      localStorage.removeItem("selectedFemalePersonality");
                      localStorage.removeItem("customFemaleInput");
                      localStorage.removeItem("selected_option"); // genre dropdown selection
                      localStorage.removeItem("custom_input"); // custom genre input
                    }}
                  >
                    Craft
                  </button>
                </Link>

                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
