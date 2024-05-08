import { API_URL } from "../config";

export async function getCupons() {
  try {
    const response = await fetch(`${API_URL}/api/cupons`);
    if (!response.ok) {
      throw new Error("Failed to get cupons");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
