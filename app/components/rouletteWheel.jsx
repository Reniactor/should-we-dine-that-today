"use client";
import { FaCaretDown } from "react-icons/fa";
import React, { useState } from "react";
import "../globals.css";

const RouletteWheel = ({
  arrayForRouletteWheel,
  rouletteWheelSize,
  mainColor,
  secondColor,
}) => {
  //Set button's state: Let's see || Wait...
  const [disabledButton, setDisabledButton] = useState(false);

  //Rotation value. Kept within an useState to keep track of the previous value.
  let [rotationValue, setRotationValue] = useState(
    Math.ceil(Math.random() * 3600)
  );

  //Value array to be populated within the popup modal.
  const valueArray = arrayForRouletteWheel;

  //Slice array size & definition
  const arrayPopulation = rouletteWheelSize || 8;
  const sliceArray = Array.from({ length: arrayPopulation }, (num, index) =>
    index % 2 !== 0 ? 2 : 1
  );

  //Testing inputs
  let firstInput;
  let secondInput;

  //Click handle function definition, to be later assigned to a function after window's not undefined.
  let handleClick;
  if (typeof window !== "undefined") {
    //Wheel, bouncy arrow and spin value definition.
    const wheel = document.querySelector(".wheel");
    let pointer = document.getElementById("v");

    // handleClick function
    handleClick = () => {
      //First, toggle the button to disabled and "Wait..."
      setDisabledButton(true);

      //Replace classLists within the bouncy arrow to pause the animation.
      pointer.classList.replace(
        "animate-bounce",
        `animate-[bounce_1s_infinite_paused]`
      );

      //Wheel rotation animation. With the value from the spin value definition @26:04
      wheel.style.transform = "rotate(" + rotationValue + "deg)";

      //Adding random value with same formula so spins are kept clockwise.
      setRotationValue((rotationValue += Math.ceil(Math.random() * 3600)));

      /*Set timeout with the same duration of the spin
      To synchronize bouncy arrow animation with wheel stopping.*/
      setTimeout(() => {
        //Unpausing the bouncy arrow animation.
        pointer.classList.replace(
          `animate-[bounce_1s_infinite_paused]`,
          "animate-bounce"
        );
        setDisabledButton(false);
      }, 5000);
    };
  }

  return (
    <>
      <div className="container">
        <FaCaretDown
          style={{ color: secondColor }}
          className="text-2xl absolute top-[-10%] font-bold z-[50] animate-bounce transition-all duration-1000"
          id="v"
        />
        <div className="wheel">
          {sliceArray.map((num, index) => {
            return (
              <div
                className="number"
                style={{
                  "--i": `${index + 1}`,
                  "--i2": `${index}`,
                  "--clr": `${num % 2 === 0 ? "black" : "white"}`,
                  "--deg": `${360 / rouletteWheelSize}deg`,
                  "--percentage": `${-11 * rouletteWheelSize + 146}%`,
                  "--transform-origin": `${
                    rouletteWheelSize != 2 ? "bottom right" : "center"
                  }`,
                  "--formula": `${
                    rouletteWheelSize != 2
                      ? "rotate(calc(var(--deg) * var(--i)))"
                      : "translateY(calc(160px * var(--i2)))"
                  }`,
                  "--size": `${rouletteWheelSize != 2 ? "50%" : "100%"}`,
                }}
                key={index}
              >
                <span
                  style={{ "--clr": `${num % 2 === 0 ? "white" : "black"}` }}
                  key={index + 1}
                >
                  {num % 2 === 0 && typeof valueArray !== "undefined"
                    ? valueArray[index] || "no"
                    : valueArray[index] || "yes"}
                </span>
              </div>
            );
          })}
        </div>
        {!disabledButton ? (
          <button
            type="button"
            onClick={handleClick}
            className="font-medium text-lg"
          >
            Lets see!
          </button>
        ) : (
          <button className="font-medium text-lg" disabled>
            Wait...
          </button>
        )}
      </div>
    </>
  );
};
export default RouletteWheel;
