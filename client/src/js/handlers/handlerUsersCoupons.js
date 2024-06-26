import { API_URL } from "../config";
import { getCoupons } from "./handlerCoupons";

// Fetch all relation between users and coupons
export async function getUsersCoupons() {
  try {
    const response = await fetch(`${API_URL}/api/users-coupons`);
    if (!response.ok) {
      throw new Error("Failed to get users-coupons");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Update user-coupon
export const updateUserCoupon = async (userCouponId) => {
  try {
    const coupons = await getCoupons();

    if (coupons.length === 0) {
      throw new Error("No hay cupones disponibles");
    }

    const userCouponCode = coupons[0].code;
    const applicationDate = new Date();

    const response = await fetch(
      `${API_URL}/api/users-coupons/${userCouponId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userCouponCode, applicationDate }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to assign coupon to user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Delete a user-coupon by its ID
export const deleteUsersCoupon = async (userCouponId) => {
  try {
    const url = `${API_URL}/api/users-coupons/${userCouponId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete user-coupon association. Status: ${response.status}. URL: ${url}`
      );
    }
  } catch (error) {
    console.error("Error deleting user-coupon association:", error);
  }
};
