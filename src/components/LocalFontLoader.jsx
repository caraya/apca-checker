import React, { useState, useEffect, useRef } from 'react';
import * as opentype from 'opentype.js';

const LocalFontLoader = ({ setCurrentFontMetrics }) => {
  const [localFonts, setLocalFonts] = useState([]);
  const [fontStatus, setFontStatus] = useState('');
  const [isFontLoading, setIsFontLoading] = useState(false);
  const previewTextRef = useRef(null);

  const loadLocalFonts = async () => {
    if (!('queryLocalFonts' in window)) {
      setFontStatus('Local Font Access API not supported in this browser.');
      return;
    }
    setFontStatus('Loading fonts... Permission may be required.');
    try {
      const fonts = await window.queryLocalFonts();
      const uniqueFonts = [...new Map(fonts.map((font) => [font.fullName, font])).values()];
      setLocalFonts(uniqueFonts.sort((a, b) => a.fullName.localeCompare(b.fullName)));
      setFontStatus(`${uniqueFonts.length} fonts loaded. Select one to apply.`);
    } catch (err) {
      setFontStatus(`Error loading fonts: ${err.message}`);
      console.error(err);
    }
  };

  const applyFont = async (postscriptName) => {
    if (!postscriptName) {
      if (previewTextRef.current) {
        previewTextRef.current.style.fontFamily = '';
      }
      setCurrentFontMetrics(null);
      return;
    }

    const fontData = localFonts.find((f) => f.postscriptName === postscriptName);
    if (!fontData) return;

    setFontStatus(`Analyzing ${fontData.fullName}...`);
    setIsFontLoading(true);

    try {
      const fontBlob = await fontData.blob();
      const arrayBuffer = await fontBlob.arrayBuffer();
      const font = opentype.parse(arrayBuffer);

      const fontFace = new FontFace(font.names.fontFamily.en, arrayBuffer);
      document.fonts.add(fontFace);
      await fontFace.load();

      if (previewTextRef.current) {
        previewTextRef.current.style.fontFamily = `"${font.names.fontFamily.en}"`;
      }

      const unitsPerEm = font.unitsPerEm;
      const xHeight = font.tables.os2.sxHeight;
      const newMetrics = {
        xHeight: xHeight / unitsPerEm, // Normalize x-height
      };
      setCurrentFontMetrics(newMetrics);

      setFontStatus(`Applied ${fontData.fullName}. x-height: ${newMetrics.xHeight.toFixed(3)}`);
    } catch (err) {
      setFontStatus(`Error applying font: ${err.message}`);
      console.error(err);
    } finally {
      setIsFontLoading(false);
    }
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg mb-8">
      <label htmlFor="fontSelector" className="block mb-2 font-semibold text-gray-300">
        Local Font
      </label>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={loadLocalFonts}
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 min-h-11 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          aria-describedby="fontStatus"
        >
          Load Local Fonts
        </button>
        <select
          id="fontSelector"
          onChange={(e) => applyFont(e.target.value)}
          className="w-full bg-gray-800 rounded p-2 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          disabled={localFonts.length === 0 || isFontLoading}
          aria-describedby="fontStatus"
        >
          <option value="">-- Select a Font --</option>
          {localFonts.map((font) => (
            <option key={font.postscriptName} value={font.postscriptName}>
              {font.fullName}
            </option>
          ))}
        </select>
      </div>
      <p id="fontStatus" className="text-sm text-gray-300 mt-2" ref={previewTextRef} role="status" aria-live="polite">
        {fontStatus}
      </p>
    </div>
  );
};

export default LocalFontLoader;