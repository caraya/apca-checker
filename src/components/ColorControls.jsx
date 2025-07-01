import React from 'react';

const ColorControls = ({
  textColor,
  textInputValue,
  onTextInputChange,
  bgColor,
  bgInputValue,
  onBgInputChange,
  swapColors,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl items-center">
      <div className="flex flex-col items-center">
        <label className="text-lg font-bold mb-3">
          Text Color
        </label>
        {/* Custom Color Swatch */}
        <div 
          className="w-24 h-24 rounded-xl border-4 border-gray-600"
          style={{ backgroundColor: textColor }}
        ></div>
        <input
          type="text"
          className="mt-3 w-48 bg-gray-700 text-center rounded-md p-2 font-mono"
          value={textInputValue}
          onChange={(e) => onTextInputChange(e.target.value)}
        />
      </div>

      <div className="flex justify-center">
        <button
          className="p-4 bg-gray-700 hover:bg-cyan-600 rounded-full transition-colors"
          aria-label="Swap text and background colors"
          onClick={swapColors}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center">
        <label className="text-lg font-bold mb-3">
          Background Color
        </label>
        {/* Custom Color Swatch */}
        <div 
          className="w-24 h-24 rounded-xl border-4 border-gray-600"
          style={{ backgroundColor: bgColor }}
        ></div>
        <input
          type="text"
          className="mt-3 w-48 bg-gray-700 text-center rounded-md p-2 font-mono"
          value={bgInputValue}
          onChange={(e) => onBgInputChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ColorControls;