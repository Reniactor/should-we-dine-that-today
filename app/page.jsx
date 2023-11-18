"use client";
import Image from "next/image";
import RouletteWheel from "./components/rouletteWheel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-32 p-24">
      <h1 className="text-white text-5xl">
        Should we dine that{" "}
        <span className="font-serif font-semibold">today?</span>
      </h1>
      <RouletteWheel />
    </main>
  );
}
