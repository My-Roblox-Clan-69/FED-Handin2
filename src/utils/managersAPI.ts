import { BASE_URL } from "../config";

interface Manager {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export const createManager = async (managerData: {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}): Promise<Manager> => {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error("No authentication token found. Please log in.");
		}

		const url = `${BASE_URL}/api/Managers`;

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(managerData),
		});
		const data = await response.json();

		if (!response.ok) {
			throw new Error(
				`Failed to create manager with status ${response.status}: ${
					data.message || "No response message"
				}`
			);
		}

		return data as Manager;
	} catch (error) {
		console.error("Create Manager API Error:", error);
		throw error;
	}
};
