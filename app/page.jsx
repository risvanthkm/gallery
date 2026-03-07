"use client";

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

const PhotoGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(0);

  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const photos = [
    'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1000',
    'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000',
    'https://images.unsplash.com/photo-1506744626753-eda8141928a4?q=80&w=1000',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000',
    'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?q=80&w=1000',
    'https://images.unsplash.com/photo-1501862700950-18382cd41497?q=80&w=1000',
    'https://images.unsplash.com/photo-1501862700950-18382cd41497?q=80&w=1000',
  ];

  const handleNext = () => {
    if (selectedIndex !== null && !isAnimating) {
      setSlideDirection('left');
      setIsAnimating(true);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null && !isAnimating) {
      setSlideDirection('right');
      setIsAnimating(true);
    }
  };

  const handleKeydown = (e) => {
    if (selectedIndex !== null) {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedIndex(null);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [selectedIndex, isAnimating]);

  return (
    <div className="min-h-screen bg-black font-sans p-4 md:p-8 relative" style={{ fontFamily: "'Bangers', cursive" }}>

      
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-75"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, rgba(220, 38, 38, 0.4), transparent 80%)`
        }}
      />

      
      <header className="relative flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 bg-white border-4 border-black p-4 md:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 z-10">
        <div className="flex items-center gap-4 md:gap-6 z-20">
          <img
            src="/nf-icon.png"
            alt="Logo"
            className="w-16 h-16 md:w-20 md:h-20 object-contain transform rotate-3 hover:-rotate-3 transition-transform duration-300 z-10 shrink-0"
          />
          <div className="relative pl-4">
            <img
              src="/header.png"
              alt="GALLERY!"
              className="h-20 sm:h-24 md:h-32 object-contain"
            />
          </div>
        </div>

        
        <div className="hidden md:block relative bg-white border-4 border-black p-4 rounded-[50%] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mt-4 md:mt-0 transform rotate-2 self-start md:self-center">
          <p className="text-xl px-4 uppercase text-center leading-6 text-black">Click a pic to<br />enlarge it! Pow!</p>
          <div className="absolute -bottom-4 left-6 w-6 h-6 bg-white border-r-4 border-b-4 border-black transform rotate-45" />
        </div>
      </header>

      
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 pl-2 pb-4 md:pl-4">
          {photos.map((photo, index) => {
            const rotation = index % 2 === 0 ? 'rotate-2' : '-rotate-2';
            const bgColor = ['bg-red-500', 'bg-white', 'bg-yellow-400'][index % 3];

            return (
              <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`group relative cursor-pointer transform ${rotation} hover:rotate-0 hover:scale-105 transition-all duration-300 z-10 hover:z-20`}
              >
                <div className={`relative p-3 ${bgColor} border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-shadow`}>

                  <div className="absolute -top-4 -right-4 bg-white text-black border-4 border-black rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 font-black transform rotate-12 group-hover:rotate-0 transition-transform">
                    #{index + 1}
                  </div>

                  <div className="border-4 border-black bg-white p-2 relative overflow-hidden aspect-[4/3]">
                    <img
                      src={photo}
                      alt={`Comic panel ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-500"
                    />

                    <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <span className="bg-red-600 text-white px-4 py-2 border-4 border-black text-2xl uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 inline-block">
                        View!
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-8 bg-black/90 backdrop-blur-sm overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >

          <button
            onClick={() => {
              setSelectedIndex(null);
              setIsAnimating(false);
              setSlideDirection(null);
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 bg-red-600 text-white p-2 border-4 border-black hover:bg-red-500 hover:scale-110 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50"
          >
            <X size={28} strokeWidth={4} />
          </button>

          <div className="relative max-w-5xl w-full flex flex-col items-center justify-center mt-8 md:mt-0">

            <div className="bg-white p-2 md:p-6 border-4 md:border-8 border-black shadow-[8px_8px_0px_0px_rgba(255,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(255,0,0,1)] transform md:rotate-1 relative w-full">

              <div className="hidden md:block absolute -top-8 -left-8 bg-white text-red-600 px-4 py-2 border-4 border-black text-4xl uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-12 z-20" style={{ WebkitTextStroke: '2px black' }}>
                BAM!
              </div>

              {/* Slider Track Container */}
              <div className="border-4 border-black bg-black relative aspect-video overflow-hidden">
                <div
                  className="absolute top-0 bottom-0 flex h-full"
                  style={{
                    width: '300%',
                    left: '-100%',
                    transform: slideDirection === 'left' ? 'translateX(-33.333%)' : slideDirection === 'right' ? 'translateX(33.333%)' : 'translateX(0)',
                    transition: isAnimating ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
                  }}
                  onTransitionEnd={() => {
                    if (isAnimating) {
                      setIsAnimating(false);
                      setSlideDirection(null);
                      if (slideDirection === 'left') {
                        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % photos.length : 0));
                      } else if (slideDirection === 'right') {
                        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : 0));
                      }
                    }
                  }}
                >
                  {/* Previous Image */}
                  <div className="relative w-1/3 h-full px-2">
                    <img
                      src={photos[(selectedIndex - 1 + photos.length) % photos.length]}
                      alt="Previous"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Current Image */}
                  <div className="relative w-1/3 h-full px-2">
                    <img
                      src={photos[selectedIndex]}
                      alt={`Panel ${selectedIndex + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Next Image */}
                  <div className="relative w-1/3 h-full px-2">
                    <img
                      src={photos[(selectedIndex + 1) % photos.length]}
                      alt="Next"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Navigation Zones Overlay (invisible but clickable) */}
                <div className="hidden md:block absolute inset-y-0 left-0 w-1/3 cursor-pointer group" onClick={(e) => { e.stopPropagation(); handlePrev(); }}>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-4 group-hover:translate-x-0 z-10">
                    <ChevronLeft size={48} strokeWidth={4} color="black" />
                  </div>
                </div>
                <div className="hidden md:block absolute inset-y-0 right-0 w-1/3 cursor-pointer group" onClick={(e) => { e.stopPropagation(); handleNext(); }}>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-600 border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 z-10">
                    <ChevronRight size={48} strokeWidth={4} color="white" />
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-6 flex justify-center md:justify-between items-end md:border-t-4 md:border-black pt-2 md:pt-4">
                <div className="bg-red-600 text-white px-3 md:px-4 py-1 border-4 border-black text-xl md:text-2xl uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform md:rotate-2">
                  PAGE {selectedIndex + 1} OF {photos.length}
                </div>
                <div className="text-lg md:text-xl uppercase hidden sm:block text-black">
                  Swipe or use arrow keys<br />to flip the pages!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Comic Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
        
        body {
          overflow: ${selectedIndex !== null ? 'hidden' : 'auto'};
        }
      `}</style>
    </div>
  );
};

export default PhotoGallery;
