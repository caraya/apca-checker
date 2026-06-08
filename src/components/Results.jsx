import React from 'react';

const ResultCard = ({ title, description, status }) => {
  const bgColor = status === 'PASS' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100';
  return (
    <li
      tabIndex={0}
      aria-label={`${title}: ${status}`}
      className={`p-6 rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${bgColor}`}
    >
      <h4 className="text-xl font-bold">{title}</h4>
      <p className="text-lg mt-2">{description}</p>
      <div className="mt-4 text-3xl font-black">{status}</div>
    </li>
  );
};

const Results = ({ compliance }) => {
  const summary = `Bronze ${compliance.bronze}. Silver ${compliance.silver}. Gold ${compliance.gold}.`;

  return (
  <section className="text-center" aria-labelledby="compliance-heading">
    <h3 id="compliance-heading" className="text-2xl font-bold mb-4 text-cyan-300">Compliance Levels</h3>
    <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{summary}</p>
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4" aria-label="Compliance level results">
      <ResultCard title="Bronze Level" description="Non-text content" status={compliance.bronze} />
      <ResultCard title="Silver Level" description="Fluent text" status={compliance.silver} />
      <ResultCard title="Gold Level" description="Critical text" status={compliance.gold} />
    </ul>
  </section>
);
};

export default Results;