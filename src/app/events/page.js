'use client';

import React, { useState } from 'react';
import EventSection from '@/components/events/event-section';

const Page = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [aiRecommendation, setAiRecommendation] = useState('false');

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter.toLowerCase());
  };
  const ai = (filter) => {
    setSelectedFilter(filter);
    setAiRecommendation(!aiRecommendation);
    if(!aiRecommendation){
      setSelectedFilter('All');
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
            } text-brown-500 px-4 py-2 rounded-lg hover:bg-brown-500 hover:text-white transition duration-300 mr-4`}
            onClick={() => ai('random')}
          >
            <img
              src="/butterai.jpeg"
              alt="AI Icon"
              className="w-6 h-6 mr-2 rounded-full"
            />
            AI Recommendation
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
          {/* Event Types */}
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

          {/* Topics */}
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
          className={`px-4 py-2 rounded ${
            selectedFilter === 'Export'
              ? 'bg-brown-500 text-white border-yellow-500'
              : 'bg-gray-300 text-black border border-gray-300'
          } hover:bg-brown-600`}
          onClick={() => {
            setSelectedFilter('Export');
            console.log('Export Events Links Clicked');
          }}
        >
          Export Event Links
        </button>
      </div>
      <EventSection filter={selectedFilter} />
    </div>
  );
};

export default Page;
