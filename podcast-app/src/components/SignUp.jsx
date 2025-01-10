import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios";

function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate(); // For navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make sure data is correctly passed to the backend
    axios
      .post("http://localhost:3001/api/auth/register", { name, username, email, password }) // Updated endpoint
      .then((result) => {
        console.log("User registered successfully", result.data);
        // Optionally navigate to sign-in page after successful registration
        navigate("/signin");
      })
      .catch((err) => {
        console.error("Error registering user", err.response.data);
        alert("An error occurred: " + err.response.data.message); // Display the error message returned by the backend
      });
  };

  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full sm:max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email Address</label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
        <p
          className="mt-4 text-sm text-center text-blue-600 hover:underline cursor-pointer"
          onClick={handleSignInClick}
        >
          Already have an account? Sign In
        </p>
      </div>
    </div>
  );
}

export default SignUp;
