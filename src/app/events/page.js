'use client';

import React, { useState } from 'react';
import EventSection from '@/components/events/event-section';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brown-500"></div>
  </div>
);

const Page = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [aiRecommendation, setAiRecommendation] = useState('false');
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter.toLowerCase());
  };

  const ai = async (filter) => {
    setIsLoading(true);
    setSelectedFilter(filter);
    setAiRecommendation(!aiRecommendation);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if(!aiRecommendation){
      setSelectedFilter('All');
    }
    setIsLoading(false);
  };

  const handleExport = async () => {
    const hardcodedText = `I'm going to:
Monad Madness - Bangkok Pitch Competition
https://lu.ma/jt1t8gb6
Arts of the Intersection between AI and Crypto.
https://lu.ma/1lb39d17
Perps & Brews by Polynomial
https://lu.ma/6plq9q3a
Web3 DevRel Night @ Devcon
https://lu.ma/okyl4g9s`;

    try {
      await navigator.clipboard.writeText(hardcodedText);
      setCopySuccess(true);
      
      // Reset success message after 2 seconds
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-yellow-50 p-8 z-0 -mt-20 pt-24 text-black">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button
            className={`flex items-center bg-white border ${
              selectedFilter === 'AI Recommendation'
                ? 'border-yellow-500'
                : 'border-brown-500'
            } text-brown-500 px-4 py-2 rounded-lg hover:bg-brown-500 hover:text-white transition duration-300 mr-4 disabled:opacity-50`}
            onClick={() => ai('random')}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-current mr-2"></div>
                Processing...
              </div>
            ) : (
              <>
                <img
                  src="/butterai.jpeg"
                  alt="AI Icon"
                  className="w-6 h-6 mr-2 rounded-full"
                />
                AI Recommendation
              </>
            )}
          </button>
          <input
            type="text"
            placeholder="Search for event"
            className="bg-white text-black rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-brown-500"
          />
          <div className="ml-2 text-brown-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <select className="bg-white text-black rounded-lg px-4 py-2 ml-4 focus:outline-none focus:ring-2 focus:ring-brown-500">
            <option value="Kuala Lumpur, Malaysia">
              Kuala Lumpur, Malaysia
            </option>
            <option value="Singapore">Singapore</option>
            <option value="Hong Kong">Hong Kong</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-wrap gap-4">
          {['Hackathon', 'Conference', 'Workshop', 'Meetup', 'Webinar'].map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded ${
                selectedFilter === type
                  ? 'bg-brown-500 text-black border-yellow-500'
                  : 'bg-gray-300 text-black border border-gray-300'
              } hover:bg-brown-600`}
              onClick={() => handleFilterChange(type)}
            >
              {type}
            </button>
          ))}

          <select
            className="bg-white text-black rounded-lg px-4 py-2"
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="All">Topics</option>
            <option value="Blockchain Technology">Blockchain Technology</option>
            <option value="Cryptocurrencies">Cryptocurrencies</option>
            <option value="Decentralized Finance (DeFi)">
              Decentralized Finance (DeFi)
            </option>
            <option value="Non-Fungible Tokens (NFTs)">
              Non-Fungible Tokens (NFTs)
            </option>
            <option value="Smart Contracts">Smart Contracts</option>
            <option value="Decentralized Autonomous Organizations (DAOs)">
              Decentralized Autonomous Organizations (DAOs)
            </option>
            <option value="Metaverse">Metaverse</option>
          </select>
          <button
            className={`px-4 py-2 rounded ${
              selectedFilter === 'All'
                ? 'bg-brown-500 text-black border-yellow-500'
                : 'bg-gray-300 text-black border border-gray-300'
            } hover:bg-brown-600`}
            onClick={() => handleFilterChange('All')}
          >
            See All
          </button>
        </div>
        <button
          className={`flex items-center px-4 py-2 rounded 
            ${copySuccess 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-300 text-black border border-gray-300'
            } hover:bg-brown-600 transition-colors duration-300`}
          onClick={handleExport}
        >
          {copySuccess ? (
            <>
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" 
                />
              </svg>
              Export Event Links
            </>
          )}
        </button>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <EventSection filter={selectedFilter} />
      )}
    </div>
  );
};

export default Page;