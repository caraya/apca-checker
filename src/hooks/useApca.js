import { useState, useEffect } from 'react';
import Color from 'colorjs.io';

// APCA constants from the original script
const sRGBtrc = 2.4;
const Rco = 0.2126729;
const Gco = 0.7151522;
const Bco = 0.0721750;
const normBG = 0.55;
const normTXT = 0.58;
const revBG = 0.57;
const revTXT = 0.56;
const blkThrs = 0.03;
const blkClmp = 1.45;
const scaleBoW = 1.25;
const scaleWoB = 1.25;
const deltaYmin = 0.0005;
const REFERENCE_X_HEIGHT = 0.52;

// Lookup tables
const bronzeLookup = [[12, 90], [14, 75], [18, 60], [24, 50], [36, 40], [48, 35], [72, 30]];
const silverLookup = [[12, 100], [14, 90], [18, 75], [24, 60], [36, 50], [48, 40], [72, 35]];
const goldLookup = [[12, 115], [14, 105], [18, 90], [24, 75], [36, 65], [48, 55], [72, 50]];


export const useApca = (textColor, bgColor, fontSize, fontWeight, currentFontMetrics) => {
  const [contrast, setContrast] = useState(0);
  const [compliance, setCompliance] = useState({ bronze: '---', silver: '---', gold: '---' });

  useEffect(() => {
    const sRGBtoY = (rgb) => {
        const r = rgb[0] / 255.0, g = rgb[1] / 255.0, b = rgb[2] / 255.0;
        const rL = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, sRGBtrc);
        const gL = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, sRGBtrc);
        const bL = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, sRGBtrc);
        return (rL * Rco) + (gL * Gco) + (bL * Bco);
    };

    const calculateAPCA = (textY, bgY) => {
        let SAPC = 0.0, output = 0.0;
        let isWhiteOnBlack = textY > bgY;
        let num = isWhiteOnBlack ? Math.pow(textY, normTXT) - Math.pow(bgY, normBG) : Math.pow(bgY, revBG) - Math.pow(textY, revTXT);
        if (Math.abs(num) < deltaYmin) return 0.0;
        if (num > blkThrs) SAPC = num - blkThrs;
        else if (num < -blkThrs) SAPC = num + blkThrs;
        else SAPC = num * blkClmp;
        output = SAPC * 100 * (isWhiteOnBlack ? scaleWoB : scaleBoW);
        return output;
    };
    
    const getRequiredLc = (size, weight, lookupTable) => {
        let adjSize = size;
        if (weight < 400) adjSize *= 0.8;
        if (weight > 500) adjSize *= 1.2;
  
        if (currentFontMetrics && currentFontMetrics.xHeight) {
          const xHeightRatio = currentFontMetrics.xHeight / REFERENCE_X_HEIGHT;
          adjSize *= xHeightRatio;
        }
  
        let lower = lookupTable[0], upper = lookupTable[lookupTable.length - 1];
        if (adjSize <= lower[0]) return lower[1];
        if (adjSize >= upper[0]) return upper[1];
  
        for (let i = 0; i < lookupTable.length - 1; i++) {
          if (adjSize >= lookupTable[i][0] && adjSize < lookupTable[i + 1][0]) {
            const sizeRange = lookupTable[i + 1][0] - lookupTable[i][0];
            const lcRange = lookupTable[i + 1][1] - lookupTable[i][1];
            const sizeRatio = (adjSize - lookupTable[i][0]) / sizeRange;
            return lookupTable[i][1] + (sizeRatio * lcRange);
          }
        }
        return upper[1];
    };


    try {
        const textRgb = new Color(textColor).to('srgb').coords.map(c => c * 255);
        const bgRgb = new Color(bgColor).to('srgb').coords.map(c => c * 255);

        const textY = sRGBtoY(textRgb);
        const bgY = sRGBtoY(bgRgb);
        const currentContrast = calculateAPCA(textY, bgY);
        const absContrast = Math.abs(currentContrast);
        
        setContrast(currentContrast);

        const requiredBronze = getRequiredLc(fontSize, fontWeight, bronzeLookup);
        const requiredSilver = getRequiredLc(fontSize, fontWeight, silverLookup);
        const requiredGold = getRequiredLc(fontSize, fontWeight, goldLookup);

        setCompliance({
            bronze: absContrast >= requiredBronze ? 'PASS' : 'FAIL',
            silver: absContrast >= requiredSilver ? 'PASS' : 'FAIL',
            gold: absContrast >= requiredGold ? 'PASS' : 'FAIL',
        });

    } catch (e) {
      // Handle invalid color strings
      setContrast(0);
      setCompliance({ bronze: 'FAIL', silver: 'FAIL', gold: 'FAIL' });
    }
  }, [textColor, bgColor, fontSize, fontWeight, currentFontMetrics]);

  return { contrast, compliance };
};