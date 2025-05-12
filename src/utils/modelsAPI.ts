import { BASE_URL } from "../config";
import type { Model } from "./types/types";

export const fetchModels = async (): Promise<Model[]> => {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error("No authentication token found. Please log in.");
		}

		const url = `${BASE_URL}/api/Models`;
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();

		if (!response.ok) {
			throw new Error(
				`Failed to fetch models with status ${response.status}: ${
					data.message || "No response message"
				}`
			);
		}

		return data as Model[];
	} catch (error) {
		console.error("Fetch Models API Error:", error);
		throw error;
	}
};

export const createModel = async (modelData: {
	firstName: string;
	lastName: string;
	email: string;
	phoneNo: string;
	addressLine1: string;
	addressLine2: string;
	zip: string;
	city: string;
	country: string;
	birthDate: string;
	nationality: string;
	height: string;
	shoeSize: string;
	hairColor: string;
	eyeColor: string;
	comments: string;
	password: string;
}): Promise<Model> => {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error("No authentication token found. Please log in.");
		}

		const url = `${BASE_URL}/api/Models`;

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(modelData),
		});
		const data = await response.json();

		if (!response.ok) {
			throw new Error(
				`Failed to create model with status ${response.status}: ${
					data.message || "No response message"
				}`
			);
		}

		return data as Model;
	} catch (error) {
		console.error("Create Model API Error:", error);
		throw error;
	}
};
