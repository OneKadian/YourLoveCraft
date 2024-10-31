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
import stickyNote from "../public/stickyNote4.png";

const bannerTextContent = {
  badgeMessage: "'This is my entertainment, meditation and manifestation'",
  title: "Because nobody can write stories for you, better than you",
  description:
    "Don't let procrastination stop you, Launch your product fast, without starting from scratch.",
  buttons: {
    // So next time you're designing a button, don't just tell them what to do.
    // Show them what they'll become.
    buttonOne: {
      text: "Lets craft your story, together",
      href: "/sign-up",
    },
    buttonTwo: {
      text: "Build Your Portfolio",
      href: "https://github.com/onekadian",
    },
  },
};

const HomeBanner = () => {
  return (
    <SectionContainer className="w-[full] bg-[#F3F5F8] lg:px-12 px-2 page-banner--container  pt-12 lg:pb-12 flex flex-col-reverse md:flex-row-reverse">
      <SectionContainer className="page-banner--inner-container wrap wrap-px z-10 md:w-1/2">
        {/* Appear First */}
        {/* <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}> */}
        <div>
          <BadgeGroup alignment="center" className="lg:mt-0 mt-8">
            <BadgeMessage>{bannerTextContent.badgeMessage}</BadgeMessage>
          </BadgeGroup>
        </div>
        {/* </MotionBTTContainer> */}
        {/* <MotionBTTContainer transition={{ delay: 0.4, duration: 0.5 }}> */}
        <div>
          <PageTitle
            className="mx-auto px-[4px] lg:px-0 lg:text-center text-black"
            type="heavy"
          >
            {bannerTextContent.title}
          </PageTitle>
        </div>
        {/* </MotionBTTContainer> */}
        {/* <MotionBTTContainer transition={{ delay: 0.6, duration: 0.5 }}> */}
        <div className="text-sm">
          <Content className="flex justify-center" alignment="">
            <div className="md:w-4/5 w-11/12">
              <p className="mb-4">
                Every great story begins with a personal touch. Write chapters
                crafted just for you, by you. Here’s how it works:
              </p>
            </div>
          </Content>
          <Content className="flex justify-center mt-2" alignment="">
            <div className="md:w-4/5 w-11/12">
              <p className="">
                1. Share details such as character names and plot, so we know
                what you want
                <br />
                2. Read, create and share as many chapters and stories as you
                want, this is your space
              </p>
            </div>
          </Content>
          <Content className="flex justify-center mt-2" alignment="">
            <div className="md:w-4/5 w-11/12">
              <p className="mb-4">
                And just like that, you’re building your story, one chapter at a
                time!
              </p>
            </div>
          </Content>
        </div>

        {/* </MotionBTTContainer> */}
        <div className="mt-[30px] mb-16 text-center">
          <ButtonGroup alignment="center">
            <Button
              href={bannerTextContent.buttons.buttonOne.href}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg px-8 py-2 font-semibold text-black transition-colors duration-300 bg-secondary-500 md:w-auto"
            >
              {bannerTextContent.buttons.buttonOne.text}
            </Button>
          </ButtonGroup>
          {/* <div className="badge-group--message text-black"> */}
          {/* <div className="text-sm mt-2 text-black">
            Start every day inspired for just $5
          </div> */}
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
        <div>
          <Image
            src={stickyNote}
            width={500}
            height={500}
            alt="Page Banner"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      </SectionContainer>
    </SectionContainer>
  );
};

export default HomeBanner;
