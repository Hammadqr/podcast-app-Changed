import Sidebar from "./sidebar";
import { useRef } from "react";

const HomePage = () => {
  const scrollContainerRefs = {
    subscriptions: useRef(null),
  };

  const handleScroll = (category, direction) => {
    const container = scrollContainerRefs[category].current;
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const favoritePodcasts = [
    {
      id: 1,
      title: "Tech Trends",
      description: "Exploring the latest in tech.",
      image: "https://via.placeholder.com/300x172",
      audioUrl: "https://example.com/audio1.mp3",
    },
    {
      id: 2,
      title: "Daily News Digest",
      description: "Your daily dose of current events.",
      image: "https://via.placeholder.com/300x172",
      audioUrl: "https://example.com/audio2.mp3",
    },
  ];

  const subscriptions = [
    "Podcast A",
    "Podcast B",
    "Podcast C",
    "Podcast D",
    "Podcast E",
    "Podcast F",
    "Podcast G",
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 flex-1 overflow-y-scroll">
        <div className="container mx-auto py-8 px-6">
          {/* Header */}
          <h1 className="text-4xl font-extrabold mb-8 text-center">
            Welcome to Your Podcast Hub
          </h1>

          {/* Favorite Podcasts Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">Your Favorite Podcasts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoritePodcasts.map((podcast) => (
                <div
                  key={podcast.id}
                  className="relative bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg group"
                >
                  <img
                    src={podcast.image}
                    alt={podcast.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold">{podcast.title}</h3>
                    <p>{podcast.description}</p>
                    <audio controls>
                      <source src={podcast.audioUrl} type="audio/mpeg" />
                    </audio>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Subscriptions Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">Your Subscriptions</h2>
            <div className="relative">
              <button
                onClick={() => handleScroll("subscriptions", "left")}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 p-2 rounded-full shadow-lg"
              >
                ◀
              </button>
              <div
                ref={scrollContainerRefs.subscriptions}
                className="flex gap-6 overflow-x-auto scrollbar-hide"
              >
                {subscriptions.map((subscription, index) => (
                  <div
                    key={index}
                    className="min-w-[200px] bg-gray-800 text-white p-4 rounded-lg shadow-md flex items-center justify-center text-center"
                  >
                    {subscription}
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleScroll("subscriptions", "right")}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 p-2 rounded-full shadow-lg"
              >
                ▶
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
