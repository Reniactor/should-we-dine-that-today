"use client";
import Image from "next/image";
import RouletteWheel from "./components/rouletteWheel";
import { useState } from "react";
import { FaCog } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { Fredoka } from "next/font/google";
import { IoClose } from "react-icons/io5";

const fredoka = Fredoka({
  src: "next/font/google",
  display: "fallback",
  subsets: ["latin"],
});

export default function Home() {
  let mainColor = "#F9F9F9";
  let rgbaMainColor = "rgba(249, 249, 249, 0.8)";
  let secondColor = "#000000";
  let accentColor = "#FFA500";
  let submitButtonColor = "#8EE4AF";
  let clearButtonColor = "#FF3333";
  let dialogBox;
  let inputFields;

  //Show / hide settings
  let [inputSubmitState, setInputSubmitState] = useState(true);

  //Change header if inputs change
  let [changeHeader, setChangeHeader] = useState(false);

  //Number of slices to be on the roulette wheel
  let [menuItemsArrayLength, setMenuItemsArrayLength] = useState(8);

  let [wordsForTheRoulette, setWordsForTheRoulette] = useState([]);

  const [inputValues, setInputValues] = useState(
    Array.from({ length: menuItemsArrayLength }, () => "")
  );

  if (typeof window !== "undefined") {
    dialogBox = document.querySelector("dialog");
    inputFields = document.querySelectorAll("input");
    console.log(inputFields);
  }
  const handleClearButton = () => {
    inputFields.forEach((item) => {
      return (item.value = "");
    });
    setInputValues([]);
    setWordsForTheRoulette([]);
    alert("Roulette back to default!");
    setChangeHeader(false);
  };

  const handleSubmitButton = () => {
    // Check if all input fields are filled
    const allInputsFilled = Array.from(inputFields).every(
      (input) => input.value.trim() !== ""
    );

    if (allInputsFilled) {
      // Convert NodeList to an array of input values
      const inputValues = Array.from(inputFields).map((input) =>
        input.value.trim()
      );

      // Proceed with setting the words
      setWordsForTheRoulette(inputValues);
      alert("Roulette updated!");
    } else {
      // Handle the case where not all inputs are filled
      alert("Please fill in all input fields.");
    }
    setChangeHeader(true);
  };

  const handleDialogBox = () => {
    // If dialog box is hidden, reveal it.
    dialogBox.classList.replace("hidden", "flex") ||
      // If dialog box's visible, hide it after 0.5s.
      setTimeout(() => dialogBox.classList.replace("flex", "hidden"), 500);

    // Switch dialog box's animation.
    dialogBox.classList.replace("animate-fadeOut", "animate-fadeIn") ||
      dialogBox.classList.replace("animate-fadeIn", "animate-fadeOut");

    setInputSubmitState(!inputSubmitState);
  };

  //Handle input boxes text
  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const augmentItems = () => {
    if (menuItemsArrayLength == 8) {
      return setMenuItemsArrayLength(2);
    }
    return setMenuItemsArrayLength(menuItemsArrayLength * 2);
  };
  const decreaseItems = () => {
    if (menuItemsArrayLength == 2) {
      return setMenuItemsArrayLength(8);
    }
    return setMenuItemsArrayLength(menuItemsArrayLength / 2);
  };
  return (
    <main
      style={{ backgroundColor: mainColor }}
      className={`flex min-h-screen flex-col items-center justify-center gap-32 p-24`}
    >
      <section className="flex flex-col items-center gap-7">
        <h1
          style={{ color: secondColor }}
          className={`text-4xl text-center md:text-6xl`}
        >
          {changeHeader ? "What should we do" : "Should we dine that"}
          <span className="font-serif font-semibold">today?</span>
        </h1>
        <FaCog
          style={{ color: accentColor }}
          className={`absolute top-4 right-4 text-3xl hover:cursor-pointer`}
          onClick={handleDialogBox}
        />
      </section>
      <dialog
        style={{ backgroundColor: rgbaMainColor }}
        className="fixed min-h-screen min-w-full z-[80] hidden justify-center items-center animate-fadeOut"
      >
        <menu
          style={{
            width: `min(max(368px, 50%), 745px)`,
            backgroundColor: mainColor,
            boxShadow: `0 4px 8px rgba(0, 0, 0, 0.1)`,
          }}
          className="relative h-[600px] rounded-lg flex flex-col justify-evenly items-center"
        >
          <h1 className="text-5xl">Settings!</h1>
          <IoClose
            className="absolute top-6 right-6 text-2xl hover:cursor-pointer"
            onClick={handleDialogBox}
          />
          <div className="flex flex-col gap-12 items-center justify-around h-4/5 w-4/5">
            <span className="flex h-16 w-full justify-center items-center gap-10">
              <FaMinusCircle
                style={{ fill: submitButtonColor }}
                className="text-2xl hover:cursor-pointer"
                onClick={decreaseItems}
              />
              <p
                style={{
                  borderColor: secondColor,
                  color: secondColor,
                }}
                className={`font-sans h-8 w-8 text-center mt-[-5px] text-3xl`}
              >
                {menuItemsArrayLength}
              </p>
              <FaPlusCircle
                style={{ fill: submitButtonColor }}
                className="text-2xl hover:cursor-pointer"
                onClick={augmentItems}
              />
            </span>
            <div className="grid grid-cols-2 gap-y-6 gap-x-[8vw]">
              {Array.from({ length: menuItemsArrayLength }, (val, index) => {
                return (
                  <input
                    key={index}
                    className="border-2 rounded-sm border-slate-200 w-36 h-12 text-2xl"
                    type="text"
                    placeholder={`Input ${index + 1}`}
                    name="inputFields"
                    value={inputValues[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    maxLength={10}
                    required
                  />
                );
              })}
            </div>
            <div className="flex justify-between w-4/5 justify-self-end">
              <button
                type="button"
                onClick={handleClearButton}
                className="w-28 h-12 text-white text-2xl font-medium rounded-md bg-[#FF3333] hover:bg-[#FF7070] duration-200"
              >
                Clear
              </button>{" "}
              <button
                type="button"
                onClick={handleSubmitButton}
                className="w-28 h-12 text-white text-2xl font-medium rounded-md bg-[#8EE4AF] hover:bg-[#BDEFD0] duration-200"
              >
                Submit
              </button>
            </div>
          </div>
        </menu>
      </dialog>
      <RouletteWheel
        arrayForRouletteWheel={wordsForTheRoulette}
        mainColor={mainColor}
        secondColor={secondColor}
        rouletteWheelSize={menuItemsArrayLength}
      />
    </main>
  );
}
