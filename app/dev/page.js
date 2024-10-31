"use client";

import Button from "../components/Button";
import ButtonGroup from "../components/ButtonGroup";
import Content from "../components/Content";
import BadgeGroup from "../components/BadgeGroup";
import BadgeMessage from "../components/BadgeMessage";
import MotionBTTContainer from "../components/MotionBTTContainer";
import SectionContainer from "../components/SectionContainer";
import PageTitle from "../components/PageTitle";
import MainGraphic from "../public/MainGaphix.png";
import Image from "next/image";
// import stickyNote from "../public/stickyNote2.png";
import stickyNote from "../public/stickyNote3.png";

const bannerTextContent = {
  badgeMessage: "Its the first thing I read in the morning - Anita",
  title: "The Best way to start your day ✨",
  description:
    "Don't let procrastination stop you, Launch your product fast, without starting from scratch.",
  buttons: {
    // So next time you're designing a button, don't just tell them what to do.
    // Show them what they'll become.
    buttonOne: {
      text: "Manifest anything with notes!",
      href: "#features",
    },
    buttonTwo: {
      text: "Build Your Portfolio",
      href: "https://github.com/onekadian",
    },
  },
};

const HomeBanner = () => {
  return (
    <SectionContainer className="w-[full] bg-[#F3F5F8] lg:px-12 px-2 page-banner--container lg:py-32 pt-32 py-0 flex flex-col-reverse md:flex-row-reverse">
      <SectionContainer className="page-banner--inner-container wrap wrap-px z-10 md:w-1/2">
        {/* Appear First */}
        {/* <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}> */}
        <div>
          <BadgeGroup alignment="center" className="lg:mt-0 mt-8">
            <BadgeMessage>{bannerTextContent.badgeMessage}</BadgeMessage>
          </BadgeGroup>
        </div>
        {/* </MotionBTTContainer> */}
        {/* Appear Second */}
        {/* <MotionBTTContainer transition={{ delay: 0.4, duration: 0.5 }}> */}
        <div>
          <PageTitle
            className="text-center mx-auto md:mx-0 text-black"
            type="heavy"
          >
            {bannerTextContent.title}
          </PageTitle>
        </div>
        {/* </MotionBTTContainer> */}
        {/* Appear Third */}
        {/* <MotionBTTContainer transition={{ delay: 0.6, duration: 0.5 }}> */}
        <div>
          <Content className="flex justify-center" alignment="">
            <div className="md:w-4/5 w-11/12">
              <p className="mb-4">
                I have generated $13.4M using this exact playbook for finding
                business ideas on Reddit…. and I'm giving it away for free
              </p>
              <p className="">
                1. How to find trending topics
                <br />
                2. How to build an audience and community and launch a
                profitable business
              </p>
            </div>
          </Content>
        </div>
        {/* </MotionBTTContainer> */}
        <div className="mt-6 mb-16 text-center">
          <ButtonGroup alignment="center">
            <Button
              href={bannerTextContent.buttons.buttonOne.href}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg px-8 py-2 font-semibold text-black transition-colors duration-300 bg-secondary-500 md:w-auto"
            >
              {bannerTextContent.buttons.buttonOne.text}
            </Button>
          </ButtonGroup>
          {/* <div className="badge-group--message text-black"> */}
          <div className="text-sm mt-2 text-black">
            Get started for Free. No Card required
          </div>
        </div>
      </SectionContainer>
      {/* <SectionContainer className="page-banner--image md:w-1/2 flex justify-center items-center">
        <MotionBTTContainer transition={{ delay: 0.8, duration: 0.5 }}>
          <Image
            src={stickyNote}
            width={500}
            height={500}
            alt="Page Banner"
            objectFit="cover"
            className="rounded-md "
          />
        </MotionBTTContainer>
      </SectionContainer> */}
      <SectionContainer className="page-banner--image md:w-1/2 flex justify-center items-center relative">
        {" "}
        {/* Added relative positioning */}
        <MotionBTTContainer transition={{ delay: 0.8, duration: 0.5 }}>
          <Image
            src={stickyNote}
            width={500}
            height={500}
            alt="Page Banner"
            objectFit="cover"
            className="rounded-md"
          />

          {/* Textbox Overlay */}
          <div className="absolute inset-0 flex justify-center items-center  font-reenie">
            {" "}
            {/* Centered absolutely */}
            <div className="w-[400px] h-[400px] text-black rounded-md overflow-hidden z-10 flex flex-col justify-center items-center">
              <p className="w-full m-0 mb-2 overflow-hidden ">
                {" "}
                {/* Remove margin and add bottom margin */}
                Good morning, Anita! 🌞✨
              </p>
              <p className="w-full m-0 mb-2 mt-4 overflow-hidden text-ellipsis">
                {" "}
                {/* Remove margin and add bottom margin */}
                Today is another beautiful day to attract everything you desire.
                The universe is aligning in your favor, bringing you closer to
                your dream job with every positive thought and action. Believe
                in your power, and let that belief guide your day
              </p>
              <p
                className="w-full m-0 mb-2 overflow-hidden text-ellipsis"
                // style={{ fontFamily: "Moonshine" }}
              >
                {" "}
                {/* Remove margin and add bottom margin */}
                You're attracting opportunities that are meant just for you, and
                they are on their way. Embrace today with a heart full of
                gratitude and a mind focused on your goals. Remember, the energy
                you put out is the energy you get back—so let’s make today
                radiate with positivity! 🌟
              </p>
              <p className="w-full m-0 overflow-hidden">
                Wishing you a day full of joy, success, and endless
                possibilities! 🚀🌈
              </p>
            </div>
          </div>
        </MotionBTTContainer>
      </SectionContainer>
    </SectionContainer>
  );
};

export default HomeBanner;
