"use client";
import { Rows2, Grid2X2 } from "lucide-react";
import React from "react";

interface ControlSectionProps {
  isCardView: boolean;
  setIsCardView: (isCardView: boolean) => void;
}

export default function ControlSection({
  isCardView,
  setIsCardView,
}: ControlSectionProps) {
  return (
    <div className="flex gap-x-2">
      <div className="border rounded-md py-2 px-2 flex items-center space-x-2">
        <button
          className={`focus:outline-none ${
            !isCardView ? "text-[#579DFF]" : "text-gray-400"
          } hover:text-[#579DFF]`}
          onClick={() => setIsCardView(false)}
        >
          <Rows2 className="w-4 h-4" />
        </button>
        <button
          className={`focus:outline-none ${
            isCardView ? "text-[#579DFF]" : "text-gray-400"
          } hover:text-[#579DFF]`}
          onClick={() => setIsCardView(true)}
        >
          <Grid2X2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
