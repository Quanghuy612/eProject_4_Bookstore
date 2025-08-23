import type React from "react";

import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function PriceRangeFilter({
  min,
  max,
  value,
  onChange,
}: PriceRangeFilterProps) {
  const [localValue, setLocalValue] = useState<[number, number]>(value);
  const [inputMin, setInputMin] = useState<string>(value[0].toString());
  const [inputMax, setInputMax] = useState<string>(value[1].toString());

  // Update local state when props change
  useEffect(() => {
    setLocalValue(value);
    setInputMin(value[0].toString());
    setInputMax(value[1].toString());
  }, [value]);

  // Handle slider change
  const handleSliderChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setLocalValue(newValue as [number, number]);
      setInputMin(newValue[0].toString());
      setInputMax(newValue[1].toString());
      onChange(newValue as [number, number]);
    }
  };

  // Handle min input change
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = e.target.value;
    setInputMin(newMin);

    if (newMin === "") return;

    const numValue = Number.parseInt(newMin, 10);
    if (!isNaN(numValue)) {
      const validMin = Math.max(min, Math.min(numValue, localValue[1] - 1));
      const newValue: [number, number] = [validMin, localValue[1]];
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  // Handle max input change
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = e.target.value;
    setInputMax(newMax);

    if (newMax === "") return;

    const numValue = Number.parseInt(newMax, 10);
    if (!isNaN(numValue)) {
      const validMax = Math.min(max, Math.max(numValue, localValue[0] + 1));
      const newValue: [number, number] = [localValue[0], validMax];
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  // Handle blur events to ensure valid values
  const handleMinBlur = () => {
    if (inputMin === "" || isNaN(Number.parseInt(inputMin, 10))) {
      setInputMin(localValue[0].toString());
      return;
    }

    const numValue = Number.parseInt(inputMin, 10);
    const validMin = Math.max(min, Math.min(numValue, localValue[1] - 1));
    setInputMin(validMin.toString());

    if (validMin !== localValue[0]) {
      const newValue: [number, number] = [validMin, localValue[1]];
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  const handleMaxBlur = () => {
    if (inputMax === "" || isNaN(Number.parseInt(inputMax, 10))) {
      setInputMax(localValue[1].toString());
      return;
    }

    const numValue = Number.parseInt(inputMax, 10);
    const validMax = Math.min(max, Math.max(numValue, localValue[0] + 1));
    setInputMax(validMax.toString());

    if (validMax !== localValue[1]) {
      const newValue: [number, number] = [localValue[0], validMax];
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-6">
      <Slider
        range
        min={min}
        max={max}
        value={localValue}
        onChange={handleSliderChange}
        className="mb-4"
        trackStyle={[{ backgroundColor: "#3b82f6" }]}
        handleStyle={[
          { borderColor: "#3b82f6", backgroundColor: "#3b82f6" },
          { borderColor: "#3b82f6", backgroundColor: "#3b82f6" },
        ]}
        railStyle={{ backgroundColor: "#e5e7eb" }}
      />

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label
            htmlFor="min-price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Min Price
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              $
            </span>
            <input
              type="text"
              id="min-price"
              value={inputMin}
              onChange={handleMinChange}
              onBlur={handleMinBlur}
              className="block w-full rounded-md border border-gray-300 pl-7 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex-1">
          <label
            htmlFor="max-price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Max Price
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              $
            </span>
            <input
              type="text"
              id="max-price"
              value={inputMax}
              onChange={handleMaxChange}
              onBlur={handleMaxBlur}
              className="block w-full rounded-md border border-gray-300 pl-7 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
