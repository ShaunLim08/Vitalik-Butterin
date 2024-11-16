'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePrivy } from '@privy-io/react-auth';

export default function Home({ levels, level }) {
  const [svgData, setSvgData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = usePrivy();

  const [isLargeScreen, setIsLargeScreen] = useState(false);


  useEffect(() => {

      const checkScreenSize = () => {
        setIsLargeScreen(window.innerWidth >= 768);
      };
      
      checkScreenSize();

      const queryParams = new URLSearchParams({
        size: window.innerWidth >= 768 ? 160 : 120,
        head: levels[level - 1].head
      // background: 'blue',
      // head: 'red',
    });
    
    fetch(`/api/profilepic?${queryParams}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        setSvgData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching SVG:', error);
        setIsLoading(false);
      });
      window.addEventListener('resize', checkScreenSize);
      return () => window.removeEventListener('resize', checkScreenSize);
  }, [isLargeScreen]);

  return (
    <motion.div 
        className={`text-black bg-white rounded-lg shadow-md p-6 mx-auto ${isLargeScreen ? 'max-w-3xl' : 'max-w-md'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className={`${isLargeScreen ? 'flex' : 'block'} items-center mb-4`}>
            <motion.div
                whileHover={{ scale: 1.05, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className={`relative mb-6 rounded-full overflow-hidden border-4 border-yellow-500 mx-10 shadow-xl ${isLargeScreen ? 'w-40 h-40' : 'w-32 h-32'} ${isLoading ? 'animate-pulse' : ''}`}
            >
                {isLoading ? (
                    <div className="w-full h-full bg-black-300 rounded-full" />
                ) : (
                    <div
                        dangerouslySetInnerHTML={{ __html: svgData }}
                        className="w-full h-full"
                    />
                )}
            </motion.div>

            <div>
                <h2 className="text-2xl font-semibold">{user?.address ? user.address : "Not authenticated"}</h2>
                <p className="text-black-600">Level 1</p>
            </div>
        </div>
        <div className={`${isLargeScreen ? 'flex justify-around' : 'grid grid-cols-3 gap-4'} mb-4`}>
            <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                <p className="font-semibold text-black">34</p>
                <p className="text-sm text-black-600">Articles</p>
            </motion.div>
            <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                <p className="font-semibold text-lg">980</p>
                <p className="text-sm text-black-600">Followers</p>
            </motion.div>
            <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                <p className="font-semibold text-lg">8.9</p>
                <p className="text-sm text-black-600">Rating</p>
            </motion.div>
        </div>
    </motion.div>
);
}