// import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "./Sidebar"; // Adjust the path to where Sidebar is located

const MyProfile = () => {
  const navigate = useNavigate(); // Initialize the navigation function

  const handleLogout = () => {
    // Perform logout logic (e.g., clearing auth tokens)
    navigate("/signin"); // Redirect to the login page
  };

  const subscribedPodcasts = [
    {
      id: 1,
      title: "Tech Talk Daily",
      host: "Tech Media Network",
      imageUrl:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%230088FF'/%3E%3Cpath d='M100 70v60M70 100h60' stroke='white' stroke-width='8'/%3E%3C/svg%3E",
    },
    {
      id: 2,
      title: "Science Hour",
      host: "Science Network",
      imageUrl:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23FF4400'/%3E%3Ccircle cx='100' cy='100' r='40' stroke='white' stroke-width='8'/%3E%3C/svg%3E",
    },
    {
      id: 3,
      title: "Daily News Roundup",
      host: "News Media",
      imageUrl:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%2300CC88'/%3E%3Crect x='60' y='60' width='80' height='80' stroke='white' stroke-width='8'/%3E%3C/svg%3E",
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-[#1A1A1A] text-white min-h-screen p-6 ml-64 relative">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>

        <div className="max-w-4xl mx-auto">
          {/* User Information */}
          <section id="profile" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <div className="bg-[#2A2A2A] rounded-lg p-4">
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Email:</strong> john.doe@example.com</p>
              <p><strong>Member Since:</strong> January 2023</p>
            </div>
          </section>

          {/* Subscribed Podcasts */}
          <section id="podcasts">
            <h2 className="text-2xl font-bold mb-4">Subscribed Podcasts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {subscribedPodcasts.map((podcast) => (
                <div
                  key={podcast.id}
                  className="bg-[#2A2A2A] rounded-lg p-2 hover:bg-[#3A3A3A] transition duration-300"
                >
                  <img
                    src={podcast.imageUrl}
                    alt={podcast.title}
                    className="w-full aspect-square object-cover rounded-md mb-2"
                  />
                  <div>
                    <h4 className="font-medium truncate">{podcast.title}</h4>
                    <p className="text-gray-400 text-sm truncate">{podcast.host}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
