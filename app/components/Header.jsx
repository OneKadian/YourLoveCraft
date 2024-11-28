"use client";
import Link from "next/link";
import Image from "next/image";
import SectionContainer from "./SectionContainer";
import Nav from "./Nav";
import ButtonGroup from "./ButtonGroup";
import Logo from "../public/ihklogo.png";
import { FaArrowRight } from "react-icons/fa";
import { UserButton } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

const Header = () => {
  // const Header = async () => {
  // const user = await currentUser();
  const { userId } = useAuth();

  return (
    <header
      id="header"
      // className="header fixed left-0 w-full top-0 z-30 bg-black border-b border-transparent border-gradient-to-b from-neutral-100 to-neutral-500"
      className="header fixed left-0 w-full top-0 z-30 bg-white"
    >
      <SectionContainer className="header--container wrap wrap-px bg-white border-[1px] border-transparent border-gradient-to-b from-neutral-100 to-neutral-500">
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
        <SectionContainer className="flex md:flex-row-reverse items-center ml-auto">
          {/* <Nav userStatus={user} /> */}
          {/* <Nav userStatus={user} /> */}
          {/* <ButtonGroup className="hidden md:block"> */}
          <ButtonGroup className="block mx-2 md:mx-0">
            {!userId ? (
              // {!user ? (

              <>
                <Link
                  href="/sign-in"
                  // className="btn btn--secondary ml-4"
                  // className="inline-flex w-full  cursor-pointer  items-center justify-center gap-3 rounded-lg px-8 py-2 font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 ml-4 to-neutral-500 border border-solid border-neutral-400 transition-colors duration-300 md:w-auto"
                  className="w-full hidden cursor-pointer md:inline-flex mx-1 items-center justify-center gap-3 rounded-lg px-8 py-2 btn btn--secondary md:w-auto"
                >
                  Login
                  {/* <FaArrowRightLong className="text-white" /> */}
                  {/* <FaArrowRight className="text-black" /> */}
                </Link>
                <Link
                  href="/sign-in"
                  className="inline-flex text-base md:hidden mx-1 w-max cursor-pointer items-center justify-center gap-3 rounded-lg px-4 py-2 btn btn--secondary md:w-auto"
                >
                  Login
                </Link>
                {/* <SignInButton forceRedirectUrl="/gallery">
                  <button className="inline-flex text-base md:hidden mx-1 w-max cursor-pointer items-center justify-center gap-3 rounded-lg px-4 py-2 btn btn--secondary md:w-auto">
                    Login
                  </button>
                </SignInButton> */}

                <Link
                  href="/sign-up"
                  // className="btn btn--secondary ml-4"
                  // className="inline-flex w-full  cursor-pointer  items-center justify-center gap-3 rounded-lg px-8 py-2 font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 ml-4 to-neutral-500 border border-solid border-neutral-400 transition-colors duration-300 md:w-auto"
                  className="w-full hidden cursor-pointer mx-1 md:inline-flex items-center justify-center gap-3 rounded-lg px-8 py-2 btn btn--secondary md:w-auto"
                >
                  Lets craft
                  {/* <FaArrowRightLong className="text-white" /> */}
                </Link>
                <Link
                  href="/sign-up"
                  // className="btn btn--secondary ml-4"
                  className="inline-flex mx-1 text-base md:hidden w-max cursor-pointer items-center justify-center gap-3 rounded-lg px-4 py-2 btn btn--secondary md:w-auto"
                  // className="text-lg font-semibold leading-6 mx-2 inline-flex md:hidden
                  // cursor-pointer items-center justify-center gap-3 rounded-lg bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 ml-4 to-neutral-500 border border-solid border-neutral-400 transition-colors duration-300
                  // "
                >
                  Lets craft
                </Link>
              </>
            ) : (
              <div className="flex">
                {/* <Link
                  href="/craft/first"
                  className="inline-flex text-base mx-4 w-max cursor-pointer items-center justify-center gap-3 rounded-lg px-4 py-2 btn btn--secondary md:w-auto"
                >
                  Craft
                </Link> */}
                <Link
                  href="/craft/first"
                  className="inline-flex text-base mx-4 w-max cursor-pointer items-center justify-center gap-3 rounded-lg px-4 py-2 btn btn--secondary md:w-auto"
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
          </ButtonGroup>
          {/* <Nav /> */}
        </SectionContainer>
      </SectionContainer>
    </header>
  );
};

export default Header;
