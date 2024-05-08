import { API_URL } from "../config";
import { getUsers } from "@/js/handlers/handlerUsers.js";
import { getCupons } from "@/js/handlers/handlerCupons.js";

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

// Function to combine user information and assigned coupons
export async function getCombinedData() {
  try {
    // Get user information, coupons, and coupon assignments
    const users = await getUsers();
    const cupons = await getCupons();
    const userCuponsAssignments = await getUsersCupons();

    // Create a list to store the combined data
    const combinedData = [];

    // Iterate over all users
    users.forEach((user) => {
      // Find the coupon assignment corresponding to the current user
      const assignment = userCuponsAssignments.find(
        (assignment) => assignment.userId === user.id
      );

      // If an assignment was found for this user, search for the corresponding coupon
      if (assignment) {
        const cupon = assignment.cuponId
          ? cupons.find((cupon) => cupon.id === assignment.cuponId)
          : null;

        // Add the combined information to the list
        combinedData.push({
          email: user.email,
          code: cupon ? cupon.code : null,
          expirationDate: cupon ? cupon.expirationDate : null,
          aplicatedDate: null,
        });
      }
    });

    return combinedData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
