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

export const deleteUsersCupon = async (userCuponId) => {
  try {
    const response = await fetch(`${API_URL}/users-cupons/${userCuponId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Eliminar la fila de la tabla en la interfaz de usuario
      deleteRow(userCuponId);
    } else {
      throw new Error("Error al eliminar la fila");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
