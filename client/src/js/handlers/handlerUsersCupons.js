import { API_URL } from "../config";

// Fetch all relation between users and cupons
export async function getUsersCupons() {
  try {
    const response = await fetch(`${API_URL}/api/users-cupons`);
    if (!response.ok) {
      throw new Error("Failed to get users");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Delete a user-coupon by its ID
export const deleteUsersCupon = async (userCuponId) => {
  try {
    const url = `${API_URL}/api/users-cupons/${userCuponId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete user-cupon association. Status: ${response.status}. URL: ${url}`
      );
    }
    deleteRow(userCuponId);
  } catch (error) {
    console.error("Error deleting user-cupon association:", error);
  }
};

// Define a function to delete the row by its ID
function deleteRow(userCuponId) {
  const row = document.getElementById(userCuponId);
  if (row) {
    row.remove();
  } else {
    console.error("Row with ID", userCuponId, "not found");
  }
}
