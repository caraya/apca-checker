import { expect, test } from '@playwright/test';
import { calculateAPCA, getCompliance, sRGBtoY } from '../../src/utils/apcaMath.js';

test.describe('APCA math utility', () => {
  test('returns strong absolute contrast for white text on black bg', () => {
    const textY = sRGBtoY([255, 255, 255]);
    const bgY = sRGBtoY([0, 0, 0]);
    const contrast = calculateAPCA(textY, bgY);

    expect(Math.abs(contrast)).toBeGreaterThan(100);
  });

  test('passes all levels for high contrast fluent text', () => {
    const compliance = getCompliance(108, 24, 400, null);

    expect(compliance).toEqual({
      bronze: 'PASS',
      silver: 'PASS',
      gold: 'PASS',
    });
  });

  test('fails silver and gold for small body text despite high contrast', () => {
    const compliance = getCompliance(108, 12, 400, null);

    expect(compliance.bronze).toBe('PASS');
    expect(compliance.silver).toBe('FAIL');
    expect(compliance.gold).toBe('FAIL');
  });

  test('fails all levels for low contrast text', () => {
    const compliance = getCompliance(25, 24, 400, null);

    expect(compliance).toEqual({
      bronze: 'FAIL',
      silver: 'FAIL',
      gold: 'FAIL',
    });
  });
});
