import { API_URL } from "../config";

export async function getCoupons() {
  try {
    const response = await fetch(`${API_URL}/api/coupons`);
    if (!response.ok) {
      throw new Error("Failed to get coupons");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
