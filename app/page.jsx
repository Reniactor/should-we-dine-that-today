"use client";
import Image from "next/image";
import RouletteWheel from "./components/rouletteWheel";
import { useState } from "react";

export default function Home() {
  let [inputSubmitState, setInputSubmitState] = useState(false);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-32 p-24">
      <div className="flex flex-col items-center gap-7">
        <h1 className="text-black text-4xl text-center md:text-6xl">
          Should we dine that{" "}
          <span className="font-serif font-semibold">today?</span>
        </h1>

        {/* <button
          type="submit"
          className="w-[160px] h-[40px] bg-[#fcb01f] rounded-[0.2rem]"
        >
          Custom Input?
        </button> */}
      </div>
      <RouletteWheel array={[undefined, undefined]} />
    </main>
  );
}
