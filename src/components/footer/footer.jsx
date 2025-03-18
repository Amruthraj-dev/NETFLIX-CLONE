import React, { useState } from "react";

const Footer = () => {

  return (
    <footer className="bg-black text-gray-400 py-10">
      <div className="max-w-full-lg mx-auto text-center">
        <div className="mb-6">
          <h2 className="text-md mb-4 mt-10 text-white">
            Ready to watch? Enter your email to create or restart your
            membership.
          </h2>
          <div className="flex justify-center items-center space-x-2">
            <input
              type="email"
              className="px-2 py-1 w-[200px] sm:w-[400px] text-white bg-black border-[1px] rounded-sm h-[30px] sm:h-[40px]"
              placeholder="Email address"
            />

            <button className="bg-red-600 text-white px-4 py-1 sm:px-6 sm:py-2 rounded-sm text-lg xs:text-base sm:text-xl md:text-2xl">
              Get Started
            </button>
          </div>
        </div>

        <div className="text-gray-400 mt-8 mb-8">
          <span
            href="tel:000-800-919-1694"
            className="text-gray-400 underline cursor-pointer  hover:text-white"
          >
            Questions? Call 000-800-919-1694
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 text-md">
          <span href="#" className="cursor-pointer hover:underline">
            FAQ
          </span>
          <span href="#" className="cursor-pointer hover:underline">
            Help Centre
          </span>
          <span href="#" className="cursor-pointer hover:underline">
            Account
          </span>
          <span href="#" className="cursor-pointer hover:underline">
            Media Centre
          </span>

          <span href="#" className="cursor-pointer hover:underline">
            Investor Relations
          </span>
          <span href="#" className="cursor-pointer hover:underline">
            Jobs
          </span>
          <span href="#" className="cursor-pointer hover:underline">
            Ways to Watch
          </span>
          <span href="#" className="cursor-pointer hover:underline">
            Terms of Use
          </span>

          <span href="#" className="cursor-pointer hover:underline">
            Privacy
          </span>
          <span href="#" className="cursor-pointer hover:underline">
            Cookie Preferences
          </span>
          <span href="#" className="cursor-pointer hover:underline">
            Corporate Information
          </span>
          <span href="#" className="cursor-pointer hover:underline">
            Contact Us
          </span>

          <span href="#" className="cursor-pointer hover:underline">
            Speed Test
          </span>
          <span href="#" className="cursor-pointer hover:underline">
            Legal Notices
          </span>
          <span href="#" className="cursor-pointer hover:underline">
            Only on Netflix
          </span>
        </div>

        <div className="mt-6">
          <button className="border border-gray-500 px-3 py-1 rounded-sm text-white">
            English
          </button>
        </div>

        <div className="mt-4">
          <p className="text-sm">Netflix India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
