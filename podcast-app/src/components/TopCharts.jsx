import React from "react";
import Sidebar from "./Sidebar"; // Adjust the path to where Sidebar is located

function TopCharts() {
  const [currentIndexTop, setCurrentIndexTop] = React.useState(0);
  const [currentIndexBottom, setCurrentIndexBottom] = React.useState(0);
  const [currentIndexThird, setCurrentIndexThird] = React.useState(0);

  const topShows = [
    {
      id: 1,
      title: "Tech Talk Daily",
      host: "Tech Media Network",
      imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%230088FF'/%3E%3Cpath d='M100 70v60M70 100h60' stroke='white' stroke-width='8'/%3E%3C/svg%3E"
    },
    // ... (rest of the topShows array remains the same)
  ];

  const itemsPerPage = 5;

  function getCurrentPodcasts(currentIndex) {
    return Array.from({ length: itemsPerPage }, (_, i) => {
      const index = (currentIndex + i) % topShows.length;
      return topShows[index];
    });
  }

  function createScrollHandler(setter) {
    return {
      scrollForward: () => {
        setter((prevIndex) => (prevIndex + 1) % topShows.length);
      },
      scrollBackward: () => {
        setter((prevIndex) => (prevIndex - 1 + topShows.length) % topShows.length);
      }
    };
  }

  const topSection = createScrollHandler(setCurrentIndexTop);
  const bottomSection = createScrollHandler(setCurrentIndexBottom);
  const thirdSection = createScrollHandler(setCurrentIndexThird);

  function renderPodcastSection(title, currentPodcasts, scrollHandlers) {
    return (
      <div className="max-w-7xl mx-auto mt-6">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {currentPodcasts.map((show) => (
            <div
              key={show.id}
              className="bg-[#2A2A2A] rounded-lg p-2 hover:bg-[#3A3A3A] transition duration-300"
            >
              <img
                src={show.imageUrl}
                alt={show.title}
                className="w-full aspect-square object-cover rounded-md mb-2"
              />
              <div>
                <h4 className="font-medium truncate">{show.title}</h4>
                <p className="text-gray-400 text-sm truncate">{show.host}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={scrollHandlers.scrollBackward}
            className="bg-blue-500 text-white px-4 py-2 rounded-l"
          >
            Previous
          </button>
          <button
            onClick={scrollHandlers.scrollForward}
            className="bg-blue-500 text-white px-4 py-2 mx-2 rounded-r"
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-[#1A1A1A] text-white min-h-screen p-6 ml-64">
        {renderPodcastSection(
          "Top Charts", 
          getCurrentPodcasts(currentIndexTop), 
          topSection
        )}

        {renderPodcastSection(
          "You Might Like", 
          getCurrentPodcasts(currentIndexBottom), 
          bottomSection
        )}

        {renderPodcastSection(
          "You have listened to in the past", 
          getCurrentPodcasts(currentIndexThird), 
          thirdSection
        )}
      </div>
    </div>
  );
}

export default TopCharts;
