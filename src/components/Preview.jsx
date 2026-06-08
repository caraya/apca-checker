import React from 'react';

const Preview = ({ textColor, bgColor, fontSize, fontWeight, contrast, children }) => {
  const previewStyle = {
    backgroundColor: bgColor,
    color: textColor,
  };

  const h2Style = {
    fontSize: `${fontSize * 1.5}px`,
    fontWeight,
  };

  const pStyle = {
    fontSize: `${fontSize}px`,
    fontWeight,
  };

  return (
    <section
      aria-labelledby="preview-heading"
      className="relative rounded-xl p-8 md:p-12 mb-8 transition-colors duration-300 flex flex-col items-center justify-center text-center min-h-[300px]"
      style={previewStyle}
    >
      <div className="absolute top-4 right-4 text-sm bg-black bg-opacity-20 px-2 py-1 rounded-md" role="status" aria-live="polite" aria-atomic="true">
        <span className="sr-only">Current APCA contrast value</span>
        <span className="font-bold text-2xl">Lc {contrast.toFixed(1)}</span>
      </div>

      {children}

      <div className="mt-8">
        <h2 id="preview-heading" className="text-4xl font-bold" style={h2Style}>Sample Heading</h2>
        <p className="mt-2 text-lg" style={pStyle}>
          This is a paragraph of sample text to demonstrate the contrast.
        </p>
      </div>
    </section>
  );
};

export default Preview;