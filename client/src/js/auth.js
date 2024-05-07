// Importa la URL de la API desde el archivo de configuración
import { API_URL } from "./config";

// Function to verify a JWT
async function verifyToken(token) {
  try {
    // Make a request to the backend to verify the token
    const response = await fetch(`${API_URL}/api/auth/verify-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      const result = await response.json();
      return result; // Returns the validity of the user's token, roleId, and roleName
    } else {
      return { isValid: false, roleId: null, roleName: null }; // Returns that the token is invalid
    }
  } catch (error) {
    console.error("Error:", error);
    return { isValid: false, roleId: null, roleName: null }; // Returns that there was an error verifying the token
  }
}

// Verify locally stored token
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "/login";
} else {
  // Check the token and get the user's roleId and roleName
  verifyToken(token).then(async (result) => {
    if (!result.isValid) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else {
      const { roleId, roleName } = result;
      console.log("User's roleId:", roleId);
      console.log("User's roleName:", roleName);

      // Perform validation with the user's roleId and roleName
      if (roleId === "userRoleId" && roleName != "Admin") {
        // window.location.href = "/unauthorized";
      }
    }
  });
}

// Function follows at the end of the file
export async function getRoles() {
  try {
    const response = await fetch(`${API_URL}/api/roles`);
    if (response.ok) {
      const roles = await response.json();
      // Map the roles to extract only the names
      const roleNames = roles.map((role) => role.name);
      return roleNames;
    } else {
      throw new Error("Error fetching roles");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
