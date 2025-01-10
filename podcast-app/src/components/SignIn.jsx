import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Both username and password are required.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors

    axios
      .post("http://localhost:3001/api/auth/login", { username, password })
      .then((response) => {
        console.log("Login Successful", response.data);

        // Save the token in local storage or session storage
        localStorage.setItem("authToken", response.data.token);

        // Redirect to the home page after successful login
        navigate("/home");
      })
      .catch((err) => {
        console.error("Login Error: ", err.response?.data?.message || err.message);
        setError(err.response?.data?.message || "An error occurred. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full sm:max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign In</h2>

        {/* Display error messages */}
        {error && (
          <div className="text-red-600 text-center mb-4">
            <strong>{error}</strong>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            className={`w-full py-2 text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p
          className="mt-4 text-sm text-center text-blue-600 hover:underline cursor-pointer"
          onClick={handleSignUpClick}
        >
          Don’t have an account? Sign Up
        </p>
      </div>
    </div>
  );
}

export default SignIn;
