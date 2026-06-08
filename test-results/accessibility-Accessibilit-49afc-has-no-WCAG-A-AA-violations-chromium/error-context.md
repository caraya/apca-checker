# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.js >> Accessibility (axe) >> page-level scan has no WCAG A/AA violations
- Location: tests/e2e/accessibility.spec.js:32:3

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 58

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0891b2",
+               "contrastRatio": 3.68,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#ffffff",
+               "fontSize": "12.0pt (16px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.68 (foreground color: #ffffff, background color: #0891b2, font size: 12.0pt (16px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<button type=\"button\" class=\"bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 min-h-11 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300\" aria-describedby=\"fontStatus\">Load Local Fonts</button>",
+                 "target": Array [
+                   ".bg-cyan-600",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.68 (foreground color: #ffffff, background color: #0891b2, font size: 12.0pt (16px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<button type=\"button\" class=\"bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 min-h-11 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300\" aria-describedby=\"fontStatus\">Load Local Fonts</button>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".bg-cyan-600",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - link "Skip to main content" [ref=e4] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=e5]:
    - banner [ref=e6]:
      - heading "APCA Contrast Checker" [level=1] [ref=e7]
      - paragraph [ref=e8]: Now with Local Font Access for more accurate results.
    - main [ref=e9]:
      - region "Sample Heading" [ref=e10]:
        - status [ref=e11]:
          - generic [ref=e12]: Current APCA contrast value
          - generic [ref=e13]: Lc 121.3
        - region "Color controls" [ref=e14]:
          - heading "Color controls" [level=3] [ref=e15]
          - generic [ref=e16]:
            - generic [ref=e17]:
              - generic [ref=e18]: Text Color
              - 'img "Text color preview #FFFFFF" [ref=e19]'
              - textbox "Text Color" [ref=e20]: "#FFFFFF"
              - paragraph [ref=e21]: "Enter a CSS color like #112233 or rgb(17 34 51)."
              - status
            - button "Swap text and background colors" [ref=e23] [cursor=pointer]:
              - img [ref=e24]
            - generic [ref=e26]:
              - generic [ref=e27]: Background Color
              - 'img "Background color preview #000000" [ref=e28]'
              - textbox "Background Color" [ref=e29]: "#000000"
              - paragraph [ref=e30]: "Enter a CSS color like #000000 or oklch(40% 0.1 220)."
              - status
        - generic [ref=e31]:
          - heading "Sample Heading" [level=2] [ref=e32]
          - paragraph [ref=e33]: This is a paragraph of sample text to demonstrate the contrast.
      - generic [ref=e34]:
        - generic [ref=e35]:
          - generic [ref=e36]: Font Size (px)
          - spinbutton "Font Size (px)" [ref=e37]: "24"
        - generic [ref=e38]:
          - generic [ref=e39]: Font Weight
          - combobox "Font Weight" [ref=e40]:
            - option "100 (Thin)"
            - option "200 (Extra Light)"
            - option "300 (Light)"
            - option "400 (Regular)" [selected]
            - option "500 (Medium)"
            - option "600 (Semi Bold)"
            - option "700 (Bold)"
            - option "800 (Extra Bold)"
            - option "900 (Black)"
      - generic [ref=e41]:
        - generic [ref=e42]: Local Font
        - generic [ref=e43]:
          - button "Load Local Fonts" [ref=e44] [cursor=pointer]
          - combobox "Local Font" [disabled] [ref=e45]:
            - option "-- Select a Font --" [selected]
        - status
      - region "Compliance Levels" [ref=e46]:
        - heading "Compliance Levels" [level=3] [ref=e47]
        - status [ref=e48]: Bronze PASS. Silver PASS. Gold PASS.
        - list "Compliance level results" [ref=e49]:
          - listitem [ref=e50]:
            - heading "Bronze Level" [level=4] [ref=e51]
            - paragraph [ref=e52]: Non-text content
            - generic [ref=e53]: PASS
          - listitem [ref=e54]:
            - heading "Silver Level" [level=4] [ref=e55]
            - paragraph [ref=e56]: Fluent text
            - generic [ref=e57]: PASS
          - listitem [ref=e58]:
            - heading "Gold Level" [level=4] [ref=e59]
            - paragraph [ref=e60]: Critical text
            - generic [ref=e61]: PASS
      - generic [ref=e62]:
        - group [ref=e63]:
          - generic "What's Covered by the Bronze Level?" [ref=e64] [cursor=pointer]:
            - generic [ref=e65]: What's Covered by the Bronze Level?
            - img [ref=e67]
        - group [ref=e69]:
          - generic "What's Covered by the Silver Level?" [ref=e70] [cursor=pointer]:
            - generic [ref=e71]: What's Covered by the Silver Level?
            - img [ref=e73]
        - group [ref=e75]:
          - generic "What's Covered by the Gold Level?" [ref=e76] [cursor=pointer]:
            - generic [ref=e77]: What's Covered by the Gold Level?
            - img [ref=e79]
        - paragraph [ref=e81]:
          - text: For detailed information, visit the
          - link "official APCA website" [ref=e82] [cursor=pointer]:
            - /url: https://apcacontrast.com/
          - text: .
```

# Test source

```ts
  1  | import AxeBuilder from '@axe-core/playwright';
  2  | import { expect, test } from '@playwright/test';
  3  | 
  4  | const wcagTags = [
  5  |   'wcag2a',
  6  |   'wcag2aa',
  7  |   'wcag21a',
  8  |   'wcag21aa',
  9  |   'wcag22aa',
  10 | ];
  11 | 
  12 | const formatViolations = (violations) =>
  13 |   violations.map((v) => ({
  14 |     id: v.id,
  15 |     impact: v.impact,
  16 |     help: v.help,
  17 |     nodes: v.nodes.length,
  18 |   }));
  19 | 
  20 | const runAxe = async (page, options = {}) => {
  21 |   const { include } = options;
  22 |   const builder = new AxeBuilder({ page }).withTags(wcagTags);
  23 | 
  24 |   if (include) {
  25 |     builder.include(include);
  26 |   }
  27 | 
  28 |   return builder.analyze();
  29 | };
  30 | 
  31 | test.describe('Accessibility (axe)', () => {
  32 |   test('page-level scan has no WCAG A/AA violations', async ({ page }, testInfo) => {
  33 |     await page.goto('/');
  34 | 
  35 |     const results = await runAxe(page);
  36 |     await testInfo.attach('axe-page-results', {
  37 |       body: JSON.stringify(formatViolations(results.violations), null, 2),
  38 |       contentType: 'application/json',
  39 |     });
  40 | 
> 41 |     expect(results.violations).toEqual([]);
     |                                ^ Error: expect(received).toEqual(expected) // deep equality
  42 |   });
  43 | 
  44 |   test('color controls region has no WCAG A/AA violations', async ({ page }, testInfo) => {
  45 |     await page.goto('/');
  46 | 
  47 |     const results = await runAxe(page, { include: '[aria-labelledby="color-controls-heading"]' });
  48 |     await testInfo.attach('axe-color-controls-results', {
  49 |       body: JSON.stringify(formatViolations(results.violations), null, 2),
  50 |       contentType: 'application/json',
  51 |     });
  52 | 
  53 |     expect(results.violations).toEqual([]);
  54 |   });
  55 | 
  56 |   test('compliance results region has no WCAG A/AA violations', async ({ page }, testInfo) => {
  57 |     await page.goto('/');
  58 | 
  59 |     const results = await runAxe(page, { include: '[aria-labelledby="compliance-heading"]' });
  60 |     await testInfo.attach('axe-compliance-results', {
  61 |       body: JSON.stringify(formatViolations(results.violations), null, 2),
  62 |       contentType: 'application/json',
  63 |     });
  64 | 
  65 |     expect(results.violations).toEqual([]);
  66 |   });
  67 | 
  68 |   test('expanded guidance disclosures have no WCAG A/AA violations', async ({ page }, testInfo) => {
  69 |     await page.goto('/');
  70 | 
  71 |     await page.getByText("What's Covered by the Bronze Level?").click();
  72 |     await page.getByText("What's Covered by the Silver Level?").click();
  73 |     await page.getByText("What's Covered by the Gold Level?").click();
  74 | 
  75 |     const results = await runAxe(page, { include: 'details[open]' });
  76 |     await testInfo.attach('axe-open-details-results', {
  77 |       body: JSON.stringify(formatViolations(results.violations), null, 2),
  78 |       contentType: 'application/json',
  79 |     });
  80 | 
  81 |     expect(results.violations).toEqual([]);
  82 |   });
  83 | });
  84 | 
```