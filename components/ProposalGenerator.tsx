
import React, { useState, useCallback } from 'react';
import { generateProposal } from '../services/geminiService';
import type { GeneratedProposal } from '../types';

const ProposalGenerator: React.FC = () => {
  const [brief, setBrief] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [proposal, setProposal] = useState<GeneratedProposal | null>(null);
  
  const handleGenerate = useCallback(async () => {
    if (!brief.trim()) {
      setError('Please provide a project brief.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setProposal(null);
    try {
      const generatedProposal = await generateProposal(brief);
      setProposal(generatedProposal);
    } catch (err) {
      // FIX: Updated error message to not mention API key, as per guidelines.
      setError('Failed to generate proposal. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [brief]);

  const renderProposal = () => {
    if (!proposal) return null;
    return (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">{proposal.title}</h2>
            <h3 className="text-lg font-semibold text-gray-600 mt-2">For: {proposal.clientName}</h3>

            <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-700 mb-2">Introduction</h4>
                <p className="text-gray-600 whitespace-pre-wrap">{proposal.introduction}</p>
            </div>

            <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-700 mb-2">Scope of Work</h4>
                <ul className="space-y-4">
                    {proposal.scopeOfWork.map((item, index) => (
                        <li key={index} className="p-4 bg-gray-50 rounded-md">
                            <h5 className="font-semibold text-gray-800">{item.title}</h5>
                            <p className="text-gray-600 mt-1">{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-700 mb-2">Timeline</h4>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left py-2 px-4 text-gray-600 font-semibold">Phase</th>
                                <th className="text-left py-2 px-4 text-gray-600 font-semibold">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proposal.timeline.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-4">{item.phase}</td>
                                    <td className="py-2 px-4">{item.duration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-700 mb-2">Pricing</h4>
                <div className="overflow-x-auto">
                     <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left py-2 px-4 text-gray-600 font-semibold">Item</th>
                                <th className="text-left py-2 px-4 text-gray-600 font-semibold">Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proposal.pricing.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-4">{item.item}</td>
                                    <td className="py-2 px-4">{item.cost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

             <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-700 mb-2">Conclusion</h4>
                <p className="text-gray-600 whitespace-pre-wrap">{proposal.conclusion}</p>
            </div>
        </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Proposal Generator</h3>
      <p className="text-sm text-gray-600 mb-4">
        Enter a project brief and our AI will generate a detailed proposal, including scope, timeline, and pricing suggestions.
      </p>
      <textarea
        value={brief}
        onChange={(e) => setBrief(e.target.value)}
        placeholder="e.g., Build a modern e-commerce website for a local coffee shop with online ordering and a subscription feature..."
        className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition"
        disabled={isLoading}
      />
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Generate Proposal'
          )}
        </button>
      </div>

      {renderProposal()}
    </div>
  );
};

export default ProposalGenerator;
