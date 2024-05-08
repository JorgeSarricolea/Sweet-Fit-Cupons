import { API_URL } from "../config";

export async function getUsers() {
  try {
    const response = await fetch(`${API_URL}/api/users`);
    if (!response.ok) {
      throw new Error("Failed to get users");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
