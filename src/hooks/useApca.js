import { useState, useEffect } from 'react';
import Color from 'colorjs.io';
import { sRGBtoY, calculateAPCA, getCompliance } from '../utils/apcaMath';


export const useApca = (textColor, bgColor, fontSize, fontWeight, currentFontMetrics) => {
  const [contrast, setContrast] = useState(0);
  const [compliance, setCompliance] = useState({ bronze: '---', silver: '---', gold: '---' });

  useEffect(() => {
    try {
        const textRgb = new Color(textColor).to('srgb').coords.map(c => c * 255);
        const bgRgb = new Color(bgColor).to('srgb').coords.map(c => c * 255);

        const textY = sRGBtoY(textRgb);
        const bgY = sRGBtoY(bgRgb);
        const currentContrast = calculateAPCA(textY, bgY);
        const absContrast = Math.abs(currentContrast);

        setContrast(currentContrast);
        setCompliance(getCompliance(absContrast, fontSize, fontWeight, currentFontMetrics));

    } catch (e) {
      // Handle invalid color strings
      setContrast(0);
      setCompliance({ bronze: 'FAIL', silver: 'FAIL', gold: 'FAIL' });
    }
  }, [textColor, bgColor, fontSize, fontWeight, currentFontMetrics]);

  return { contrast, compliance };
};