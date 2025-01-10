import Sidebar from "./sidebar";
import TopBar from "./TopBar";
import { useRef, useState } from "react";

const PodcastPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  const scrollContainerRefs = {
    featured: useRef(null),
    noteworthy: useRef(null),
    trending: useRef(null),
  };

  const handleScroll = (category, direction) => {
    const container = scrollContainerRefs[category].current;
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleSkip = (direction) => {
    console.log(`Skipped ${direction}`);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const images = [
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%230088FF'/%3E%3Cpath d='M100 70v60M70 100h60' stroke='white' stroke-width='8'/%3E%3C/svg%3E",
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23FF4400'/%3E%3Ccircle cx='100' cy='100' r='40' stroke='white' stroke-width='8'/%3E%3C/svg%3E",
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%2300CC88'/%3E%3Crect x='60' y='60' width='80' height='80' stroke='white' stroke-width='8'/%3E%3C/svg%3E",
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 overflow-y-scroll">
        <div className="container mx-auto py-8 px-6">
          <h1 className="text-4xl font-extrabold mb-8 text-center">Discover Podcasts</h1>

          {/* TopBar Component */}
          <TopBar
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onSkip={handleSkip}
            onVolumeChange={handleVolumeChange}
            currentVolume={volume}
          />

          {/* Featured Podcasts Section */}
          {["featured", "noteworthy", "trending"].map((category, index) => (
            <section key={category} className="mb-16">
              <h2 className="text-3xl font-semibold mb-6 capitalize">
                {category.replace("_", " ")} Podcasts
              </h2>
              <div className="relative">
                <button
                  onClick={() => handleScroll(category, "left")}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 p-2 rounded-full shadow-lg hidden md:block"
                >
                  ◀
                </button>
                <div
                  ref={scrollContainerRefs[category]}
                  className="flex gap-6 overflow-x-auto scrollbar-hide"
                >
                  {Array(10)
                    .fill(null)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="relative min-w-[250px] md:min-w-[300px] bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg group"
                      >
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <img
                            src={images[index % images.length]}
                            alt={`${category} Podcast ${index + 1}`}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 group-hover:opacity-60"></div>
                          <div className="absolute bottom-0 p-4">
                            <p className="text-sm uppercase font-semibold text-gray-400">
                              CATEGORY {index + 1}
                            </p>
                            <h3 className="text-xl font-bold">
                              {category.replace("_", " ")} Podcast {index + 1}
                            </h3>
                            <p className="text-sm hidden group-hover:block">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                          </div>
                        </a>
                      </div>
                    ))}
                </div>
                <button
                  onClick={() => handleScroll(category, "right")}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 p-2 rounded-full shadow-lg hidden md:block"
                >
                  ▶
                </button>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodcastPage;
