import React from 'react';

const Info = () => (
    <div className="mt-12 pt-8 border-t border-gray-700 space-y-4">
    <details className="bg-gray-700 rounded-lg group">
      <summary className="flex justify-between items-center cursor-pointer p-4 font-bold text-lg text-cyan-300">
        <span>What's Covered by the Bronze Level?</span>
        <span className="transition-transform duration-300 group-open:rotate-180">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </summary>
      <div className="prose prose-invert max-w-none text-gray-300 p-4 border-t border-gray-600">
        <p>Bronze is the minimum level, focusing on making primary content distinguishable. It does not require font
          lookup tables.</p>
        <ul className="list-disc list-inside">
          <li><strong>Lc 75 Minimum:</strong> For body text. (Lc 90 is preferred).</li>
          <li><strong>Lc 60 Minimum:</strong> For other content text you want people to read.</li>
          <li><strong>Lc 45 Minimum:</strong> For large, heavy text like headlines.</li>
          <li><strong>Lc 30 Minimum:</strong> The absolute minimum for any discernible text, such as disabled or
            placeholder text.</li>
        </ul>
      </div>
    </details>

    <details className="bg-gray-700 rounded-lg group">
      <summary className="flex justify-between items-center cursor-pointer p-4 font-bold text-lg text-cyan-300">
        <span>What's Covered by the Silver Level?</span>
        <span className="transition-transform duration-300 group-open:rotate-180">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </summary>
      <div className="prose prose-invert max-w-none text-gray-300 p-4 border-t border-gray-600">
        <p>Silver is the recommended target for fluent reading and covers all text content, using lookup tables for
          accuracy.</p>
        <ul className="list-disc list-inside">
          <li><strong>All Text Content:</strong> The goal of Silver is to cover all text, including body, fluent,
            and sub-fluent (e.g., bylines, secondary nav).</li>
          <li><strong>Uses Lookup Tables:</strong> Required Lc value is determined by the font size and weight. See
            the official <a href="https://www.readtech.org/ARC/tests/visual-readability-contrast/" target="_blank"
              rel="noopener" className="text-cyan-400 hover:underline">APCA Lookup Tables</a>.</li>
          <li><strong>Minimum Font Size:</strong> Recommends a minimum of 13px for content text.</li>
        </ul>
      </div>
    </details>

    <details className="bg-gray-700 rounded-lg group">
      <summary className="flex justify-between items-center cursor-pointer p-4 font-bold text-lg text-cyan-300">
        <span>What's Covered by the Gold Level?</span>
        <span className="transition-transform duration-300 group-open:rotate-180">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </summary>
      <div className="prose prose-invert max-w-none text-gray-300 p-4 border-t border-gray-600">
        <p>Gold is the highest level for specialized use cases where readability is critical, adding stricter
          requirements.</p>
        <ul className="list-disc list-inside">
          <li><strong>Higher Lc Values:</strong> Requires higher contrast values than Silver for the same font size
            and weight, based on the same <a href="https://www.readtech.org/ARC/tests/visual-readability-contrast/"
              target="_blank" rel="noopener" className="text-cyan-400 hover:underline">lookup tables</a>.</li>
          <li><strong>Minimum Font Size:</strong> Recommends a minimum of 18px for content text.</li>
          <li><strong>Required Test - Font Qualification:</strong> For Gold conformance, fonts used for content must
            be compared to a reference font (like Helvetica) to ensure their weight and x-height are equivalent,
            ensuring a consistent and highly readable presentation. This is what the "Local Font" feature helps to
            assess.</li>
        </ul>
      </div>
    </details>
    <p className="text-center text-gray-400 pt-4">
      For detailed information, visit the <a href="https://apcacontrast.com/" target="_blank" rel="noopener"
        className="text-cyan-400 hover:underline">official APCA website</a>.
    </p>
  </div>
);

export default Info;