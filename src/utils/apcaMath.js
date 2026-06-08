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

const bronzeLookup = [[12, 90], [14, 75], [18, 60], [24, 50], [36, 40], [48, 35], [72, 30]];

const SILVER_MIN_SIZE = 13;
const GOLD_MIN_SIZE = 18;

const silverGoldLookupRows = [
  { minSize: 0, maxSize: 10, requirements: [[400, null], [800, 100], [Infinity, null]] },
  { minSize: 10, maxSize: 12, requirements: [[400, null], [800, 100], [Infinity, null]] },
  { minSize: 12, maxSize: 14, requirements: [[400, null], [800, 100], [Infinity, null]] },
  { minSize: 14, maxSize: 15, requirements: [[300, null], [400, null], [500, 100], [600, 100], [700, 90], [800, 75], [Infinity, null]] },
  { minSize: 15, maxSize: 16, requirements: [[300, null], [400, null], [500, 100], [600, 90], [700, 75], [800, 70], [Infinity, null]] },
  { minSize: 16, maxSize: 18, requirements: [[300, null], [400, null], [500, 90], [600, 75], [700, 70], [800, 60], [900, 60], [Infinity, null]] },
  { minSize: 18, maxSize: 21, requirements: [[200, null], [300, null], [400, 100], [500, 75], [600, 70], [700, 60], [800, 55], [Infinity, null]] },
  { minSize: 21, maxSize: 24, requirements: [[200, null], [300, null], [400, 100], [500, 75], [600, 70], [700, 60], [800, 55], [Infinity, null]] },
  { minSize: 24, maxSize: 28, requirements: [[200, null], [300, null], [400, 75], [500, 60], [600, 55], [700, 50], [800, 45], [Infinity, null]] },
  { minSize: 28, maxSize: 32, requirements: [[200, null], [300, 100], [400, 70], [500, 55], [600, 50], [700, 45], [800, 43], [Infinity, null]] },
  { minSize: 32, maxSize: 36, requirements: [[200, null], [300, 90], [400, 65], [500, 50], [600, 45], [700, 43], [800, 40], [Infinity, null]] },
  { minSize: 36, maxSize: 42, requirements: [[200, null], [300, 75], [400, 60], [500, 45], [600, 43], [700, 40], [800, 38], [Infinity, null]] },
  { minSize: 42, maxSize: 48, requirements: [[200, 100], [300, 70], [400, 55], [500, 43], [600, 40], [700, 38], [800, 35], [Infinity, null]] },
  { minSize: 48, maxSize: 60, requirements: [[200, 90], [300, 60], [400, 50], [500, 40], [600, 38], [700, 35], [800, 33], [Infinity, null]] },
  { minSize: 60, maxSize: 72, requirements: [[200, 75], [300, 55], [400, 45], [500, 38], [600, 35], [700, 33], [Infinity, null]] },
  { minSize: 72, maxSize: 96, requirements: [[200, 60], [300, 50], [400, 40], [500, 35], [600, 33], [Infinity, null]] },
  { minSize: 96, maxSize: Infinity, requirements: [[200, 50], [300, 45], [400, 35], [500, 33], [Infinity, null]] },
];

export const sRGBtoY = (rgb) => {
  const r = rgb[0] / 255.0;
  const g = rgb[1] / 255.0;
  const b = rgb[2] / 255.0;
  const rL = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, sRGBtrc);
  const gL = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, sRGBtrc);
  const bL = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, sRGBtrc);
  return (rL * Rco) + (gL * Gco) + (bL * Bco);
};

export const calculateAPCA = (textY, bgY) => {
  let SAPC = 0.0;
  const isWhiteOnBlack = textY > bgY;
  const num = isWhiteOnBlack
    ? Math.pow(textY, normTXT) - Math.pow(bgY, normBG)
    : Math.pow(bgY, revBG) - Math.pow(textY, revTXT);

  if (Math.abs(num) < deltaYmin) return 0.0;
  if (num > blkThrs) SAPC = num - blkThrs;
  else if (num < -blkThrs) SAPC = num + blkThrs;
  else SAPC = num * blkClmp;

  return SAPC * 100 * (isWhiteOnBlack ? scaleWoB : scaleBoW);
};

export const getAdjustedSize = (size, weight, currentFontMetrics) => {
  let adjustedSize = size;

  if (weight < 400) adjustedSize *= 0.8;
  if (weight > 500) adjustedSize *= 1.2;

  if (currentFontMetrics && currentFontMetrics.xHeight) {
    const xHeightRatio = currentFontMetrics.xHeight / REFERENCE_X_HEIGHT;
    adjustedSize *= xHeightRatio;
  }

  return adjustedSize;
};

export const getRequiredLc = (size, weight, lookupTable, currentFontMetrics) => {
  const adjustedSize = getAdjustedSize(size, weight, currentFontMetrics);
  const lower = lookupTable[0];
  const upper = lookupTable[lookupTable.length - 1];

  if (adjustedSize <= lower[0]) return lower[1];
  if (adjustedSize >= upper[0]) return upper[1];

  for (let i = 0; i < lookupTable.length - 1; i += 1) {
    if (adjustedSize >= lookupTable[i][0] && adjustedSize < lookupTable[i + 1][0]) {
      const sizeRange = lookupTable[i + 1][0] - lookupTable[i][0];
      const lcRange = lookupTable[i + 1][1] - lookupTable[i][1];
      const sizeRatio = (adjustedSize - lookupTable[i][0]) / sizeRange;
      return lookupTable[i][1] + (sizeRatio * lcRange);
    }
  }

  return upper[1];
};

export const getLookupThreshold = (size, weight) => {
  const row = silverGoldLookupRows.find(({ minSize, maxSize }) => size >= minSize && size < maxSize);

  if (!row) {
    return { eligible: false, requiredLc: Infinity };
  }

  const bucket = row.requirements.find(([maxWeight]) => weight < maxWeight);

  if (!bucket || bucket[1] == null) {
    return { eligible: false, requiredLc: Infinity };
  }

  return { eligible: true, requiredLc: bucket[1] };
};

export const getCompliance = (absContrast, fontSize, fontWeight, currentFontMetrics) => {
  const requiredBronze = getRequiredLc(fontSize, fontWeight, bronzeLookup, currentFontMetrics);
  const adjustedSize = getAdjustedSize(fontSize, fontWeight, currentFontMetrics);
  const tableThreshold = getLookupThreshold(adjustedSize, fontWeight);

  const silverRequiredLc = tableThreshold.requiredLc;
  const goldRequiredLc = Math.min(100, silverRequiredLc + 15);

  const silverPass = tableThreshold.eligible
    && adjustedSize >= SILVER_MIN_SIZE
    && absContrast >= silverRequiredLc;

  const goldPass = tableThreshold.eligible
    && adjustedSize >= GOLD_MIN_SIZE
    && absContrast >= goldRequiredLc;

  return {
    bronze: absContrast >= requiredBronze ? 'PASS' : 'FAIL',
    silver: silverPass ? 'PASS' : 'FAIL',
    gold: goldPass ? 'PASS' : 'FAIL',
  };
};