"use client";
import { FaCaretDown } from "react-icons/fa";
import React, { useEffect } from "react";
import "../globals.css";

const RouletteWheel = () => {
  let handleClick;

  useEffect(() => {
    const wheel = document.querySelector(".wheel");
    let pointer = document.getElementById("v");
    if (wheel) {
      let value = Math.ceil(Math.random() * 3600);

      handleClick = () => {
        pointer.classList.replace(
          "animate-bounce",
          "animate-[bounce_1s_infinite_paused]"
        );
        wheel.style.transform = "rotate(" + value + "deg)";
        value += Math.ceil(Math.random() * 3600);
        setTimeout(
          () =>
            pointer.classList.replace(
              "animate-[bounce_1s_infinite_paused]",
              "animate-bounce"
            ),
          5000
        );
      };

      document.querySelector("button").addEventListener("click", handleClick);

      return () => {
        // Cleanup event listener to avoid memory leaks
        document
          .querySelector("button")
          .removeEventListener("click", handleClick);
      };
    }
  }, []);
  return (
    <>
      <div className="container">
        <FaCaretDown
          className="text-2xl absolute top-[-10%] text-black font-bold z-[50] animate-bounce transition-all duration-1000"
          id="v"
        />
        <div className="wheel">
          <div className="number" style={{ "--i": 1, "--clr": "white" }}>
            <span style={{ "--clr": "black" }}>yes</span>
          </div>
          <div className="number" style={{ "--i": 2, "--clr": "black" }}>
            <span style={{ "--clr": "white" }}>no</span>
          </div>
          <div className="number" style={{ "--i": 3, "--clr": "white" }}>
            <span style={{ "--clr": "black" }}>yes</span>
          </div>
          <div className="number" style={{ "--i": 4, "--clr": "black" }}>
            <span style={{ "--clr": "white" }}>no</span>
          </div>
          <div className="number" style={{ "--i": 5, "--clr": "white" }}>
            <span style={{ "--clr": "black" }}>yes</span>
          </div>
          <div className="number" style={{ "--i": 6, "--clr": "black" }}>
            <span style={{ "--clr": "white" }}>no</span>
          </div>
          <div className="number" style={{ "--i": 7, "--clr": "white" }}>
            <span style={{ "--clr": "black" }}>yes</span>
          </div>
          <div className="number" style={{ "--i": 8, "--clr": "black" }}>
            <span style={{ "--clr": "white" }}>no</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="font-medium text-lg"
        >
          Lets see!
        </button>
      </div>
    </>
  );
};
export default RouletteWheel;
