"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { Button } from "../Main";

const Footer = () => {
  const [email, setEmail] = React.useState("");
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <footer className="bg-[#222C1D]">
      <div className="container py-12">
        <div className="flex md:flex-row flex-col gap-y-12 lg:gap-x-24 md:gap-x-12">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={94}
                height={94}
                className="lg:w-24 lg:h-24 md:w-20 md:h-20 w-16 h-16"
              />
              <span className="text-white lg:text-5xl md:text-4xl text-3xl font-black">
                Planto.
              </span>
            </div>
            <p className="text-white lg:text-2xl md:text-xl text-lg mt-9">
              Your one-stop solution for plant care and maintenance needs. We
              provide expert advice, quality products, and exceptional service
              to help your plants thrive.
            </p>
          </div>
          <div>
            <h3 className="text-white lg:text-2xl md:text-xl text-lg font-extrabold">
              Quick Link’s
            </h3>
            <ul className="mt-6 flex flex-col gap-4 text-white/75 lg:text-xl md:text-lg text-base font-medium">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-500 ease-in-out"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-500 ease-in-out"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-500 ease-in-out"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="text-white lg:text-2xl md:text-xl text-lg font-extrabold">
              For Every Update.
            </h3>
            <div className="mt-6">
              <div
                className="group flex rounded-md border border-white p-0.5 overflow-hidden cursor-text"
                onClick={() => emailInputRef.current?.focus()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    emailInputRef.current?.focus();
                  }
                }}
                aria-label="Email subscription input"
              >
                <input
                  value={email}
                  ref={emailInputRef}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full flex-1 p-3 placeholder:text-white/75 md:placeholder:text-xl placeholder:text-base text-white text-xl focus:outline-none focus:ring-0 bg-transparent"
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                />
                <button
                  className="py-3 px-7 rounded-md md:text-lg text-base bg-white/90 text-black font-bold uppercase hover:bg-white cursor-pointer transition duration-300 ease-in-out"
                  type="button"
                  onClick={() => {
                    alert(`Subscribed with ${email}`);
                    setEmail("");
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex md:flex-row flex-col gap-y-9 items-center justify-between border-t border-white/20 pt-12">
          <div className="flex items-center gap-4">
            <Button iconOnly>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group block p-2 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-6 h-6 text-white"
                >
                  <rect
                    x="2.75"
                    y="2.75"
                    width="18.5"
                    height="18.5"
                    rx="5"
                    ry="5"
                    stroke="currentColor"
                  />
                  <circle cx="12" cy="12" r="4.25" stroke="currentColor" />
                  <circle
                    cx="17"
                    cy="7"
                    r="1.25"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
            </Button>
            <Button iconOnly>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group block p-2 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path d="M13.5 10.5V8.75c0-.6.4-.75.66-.75H16V5h-2.34C10.9 5 10 7.047 10 8.55v1.95H8v3h2v6h3.5v-6h2.07l.43-3h-2.5Z" />
                </svg>
              </a>
            </Button>
            <Button iconOnly>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="group block p-2 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path d="M3 4.5h4.8l4.17 5.94L16.8 4.5H21l-7.05 8.73L21.5 19.5h-4.8l-4.5-6.3-5.1 6.3H3l7.35-8.97L3 4.5Z" />
                </svg>
              </a>
            </Button>
          </div>
          <p className="text-white">&copy; 2024 Planto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
