import React from 'react';

const ColorControls = ({
  textColor,
  textInputValue,
  onTextInputChange,
  bgColor,
  bgInputValue,
  onBgInputChange,
  textInputValid,
  bgInputValid,
  swapColors,
}) => {
  return (
    <section aria-labelledby="color-controls-heading" className="w-full max-w-4xl">
      <h3 id="color-controls-heading" className="sr-only">Color controls</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <div className="flex flex-col items-center">
        <label htmlFor="textColorHex" className="text-lg font-bold mb-3">
          Text Color
        </label>
        {/* Custom Color Swatch */}
        <div
          className="w-24 h-24 rounded-xl border-4 border-gray-600"
          style={{ backgroundColor: textColor }}
          role="img"
          aria-label={`Text color preview ${textColor}`}
        ></div>
        <input
          type="text"
          id="textColorHex"
          inputMode="text"
          aria-describedby="textColorHelp textColorError"
          aria-invalid={!textInputValid}
          className="mt-3 w-48 text-center rounded-md p-2 font-mono color-token-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          style={{ '--input-bg': textInputValid ? textInputValue : '#374151' }}
          value={textInputValue}
          onChange={(e) => onTextInputChange(e.target.value)}
        />
        <p id="textColorHelp" className="mt-2 text-xs text-gray-300">Enter a CSS color like #112233 or rgb(17 34 51).</p>
        <p id="textColorError" className="mt-1 text-xs text-amber-300 min-h-[1.25rem]" role="status" aria-live="polite">
          {textInputValid ? '' : 'Enter a valid text color value.'}
        </p>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="p-4 min-h-11 min-w-11 bg-gray-700 hover:bg-cyan-600 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
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
            aria-hidden="true"
            focusable="false"
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
        <label htmlFor="bgColorHex" className="text-lg font-bold mb-3">
          Background Color
        </label>
        {/* Custom Color Swatch */}
        <div
          className="w-24 h-24 rounded-xl border-4 border-gray-600"
          style={{ backgroundColor: bgColor }}
          role="img"
          aria-label={`Background color preview ${bgColor}`}
        ></div>
        <input
          type="text"
          id="bgColorHex"
          inputMode="text"
          aria-describedby="bgColorHelp bgColorError"
          aria-invalid={!bgInputValid}
          className="mt-3 w-48 text-center rounded-md p-2 font-mono color-token-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          style={{ '--input-bg': bgInputValid ? bgInputValue : '#374151' }}
          value={bgInputValue}
          onChange={(e) => onBgInputChange(e.target.value)}
        />
        <p id="bgColorHelp" className="mt-2 text-xs text-gray-300">Enter a CSS color like #000000 or oklch(40% 0.1 220).</p>
        <p id="bgColorError" className="mt-1 text-xs text-amber-300 min-h-[1.25rem]" role="status" aria-live="polite">
          {bgInputValid ? '' : 'Enter a valid background color value.'}
        </p>
      </div>
    </div>
    </section>
  );
};

export default ColorControls;