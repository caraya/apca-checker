import React from 'react';

const ResultCard = ({ title, description, status }) => {
  const bgColor = status === 'PASS' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100';
  return (
    <div className={`p-6 rounded-lg transition-all duration-300 ${bgColor}`}>
      <h4 className="text-xl font-bold">{title}</h4>
      <p className="text-lg mt-2">{description}</p>
      <div className="mt-4 text-3xl font-black">{status}</div>
    </div>
  );
};

const Results = ({ compliance }) => (
  <div className="text-center">
    <h3 className="text-2xl font-bold mb-4 text-cyan-300">Compliance Levels</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ResultCard title="Bronze Level" description="Non-text content" status={compliance.bronze} />
      <ResultCard title="Silver Level" description="Fluent text" status={compliance.silver} />
      <ResultCard title="Gold Level" description="Critical text" status={compliance.gold} />
    </div>
  </div>
);

export default Results;