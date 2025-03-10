"use client"
import React from "react";
import { ReactTyped } from "react-typed";
import { Button } from "./ui/button";
import { Download, Github, Linkedin, Mail, Twitter, Youtube } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="  text-gray-800" id="home">
      <section className="flex flex-col md:flex-row items-center justify-evenly pt-10 mt-4 ">
        <div className="space-y-6 pt-8 px-4">
          <h1 className="text-6xl font-bold dark:text-white">
            Hi, I&apos;m Vijeet Shah
          </h1>
          <h2 className="text-4xl font-medium dark:text-white">
            <ReactTyped
              strings={[
                "I Love to Teach & Learn",
                "A Frontend Developer",
                "A Backend Developer",
                "A Full-Stack Developer",
                "A Tester",
              ]}
              typeSpeed={120}
              loop
            />
          </h2>
          <p className="max-w-xl text-lg dark:text-gray-400">
            Versatile software engineer, Committed to delivering high-quality
            and scalable web applications while maintaining a strong focus on
            user experience and code efficiency.
          </p>

          <div className="flex space-x-4">
            <a
              href="mailto:vijeetbshah@gmail.com"
              className="text-red-600 text-2xl hover:text-red-900"
            >
              <Mail />
            </a>
            <a
              href="https://www.linkedin.com/in/vijeet-shah/"
              className="text-blue-600 text-2xl hover:text-blue-900"
              target="_blank"
            >
              <Linkedin />
            </a>
            <a
              href="https://twitter.com/vijeetshah_"
              className="text-black text-2xl hover:text-gray-500 dark:text-white"
            >
              <Twitter />
            </a>{" "}
            <a
              href="https://github.com/vijeet-shah/"
              className="text-black text-2xl hover:text-gray-400 dark:text-white"
            >
              <Github />
            </a>
            <a
              href="https://www.youtube.com/@vijeetshah_"
              className="text-red-600 text-2xl hover:text-red-900"
            >
              <Youtube />
            </a>
          </div>

          <a href="/myresume23.pdf" download>
            <Button className="mt-5">
              <Download className="mr-4" />
              Resume
            </Button>{" "}
          </a>
        </div>

        <div className="hidden lg:block w-[30rem] h-[30rem] bg-yellow-800 rounded-md border-sm border-black overflow-hidden">
          <video
            autoPlay
            muted
            loop
            className="object-cover object-center w-full h-full"
            preload="none"
          >
            <source src="/vijeetshah.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;