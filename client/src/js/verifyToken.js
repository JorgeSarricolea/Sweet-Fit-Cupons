import { API_URL } from "../js/config";

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "/login";
} else {
  // Check if the token is valid
  verifyToken(token).then((isValid) => {
    if (!isValid) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  });
}

// Function to verify a JWT token
async function verifyToken(token) {
  try {
    // Make a request to the back-end to verify the token
    const response = await fetch(`${API_URL}/api/auth/verify-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      const result = await response.json();
      return result.isValid; // Returns true if the token is valid
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}
