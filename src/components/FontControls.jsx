import React from 'react';

const FontControls = ({ fontSize, setFontSize, fontWeight, setFontWeight }) => (
  <div className="grid md:grid-cols-2 gap-6 mb-8">
    <div className="bg-gray-700 p-4 rounded-lg">
      <label htmlFor="fontSize" className="block mb-2 font-semibold text-gray-300">
        Font Size (px)
      </label>
      <input
        type="number"
        id="fontSize"
        value={fontSize}
        onChange={(e) => setFontSize(parseFloat(e.target.value))}
        className="w-full bg-gray-800 rounded p-2"
      />
    </div>
    <div className="bg-gray-700 p-4 rounded-lg">
      <label htmlFor="fontWeight" className="block mb-2 font-semibold text-gray-300">
        Font Weight
      </label>
      <select
        id="fontWeight"
        value={fontWeight}
        onChange={(e) => setFontWeight(parseInt(e.target.value, 10))}
        className="w-full bg-gray-800 rounded p-2"
      >
        <option value="100">100 (Thin)</option>
        <option value="200">200 (Extra Light)</option>
        <option value="300">300 (Light)</option>
        <option value="400">400 (Regular)</option>
        <option value="500">500 (Medium)</option>
        <option value="600">600 (Semi Bold)</option>
        <option value="700">700 (Bold)</option>
        <option value="800">800 (Extra Bold)</option>
        <option value="900">900 (Black)</option>
      </select>
    </div>
  </div>
);

export default FontControls;