"use client";
import React, { useEffect } from "react";
import "../globals.css";

const RouletteWheel = () => {
  let handleClick;
  useEffect(() => {
    const wheel = document.querySelector(".wheel");

    if (wheel) {
      let value = Math.ceil(Math.random() * 3600);

      handleClick = () => {
        wheel.style.transform = "rotate(" + value + "deg)";
        value += Math.ceil(Math.random() * 3600);
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
        <div className="absolute top-[-9%] text-white z-[50]">V</div>
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
        <button type="button" onClick={handleClick}>
          lets see!
        </button>
      </div>
    </>
  );
};
export default RouletteWheel;
