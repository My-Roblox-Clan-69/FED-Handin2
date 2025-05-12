import { BASE_URL } from "../config";
import type { Expense } from "./types/types";

export const fetchExpensesForModel = async (
	modelId: number
): Promise<Expense[]> => {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error("No authentication token found. Please log in.");
		}

		const url = `${BASE_URL}/api/Expenses/model/${modelId}`;

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
				`Failed to fetch expenses with status ${response.status}: ${
					data.message || "No response message"
				}`
			);
		}

		return data as Expense[];
	} catch (error) {
		console.error("Fetch Expenses API Error:", error);
		throw error;
	}
};

export const createExpense = async (expenseData: {
	modelId: number;
	jobId: number;
	date: string;
	text: string;
	amount: number;
}): Promise<Expense> => {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error("No authentication token found. Please log in.");
		}

		const url = `${BASE_URL}/api/Expenses`;

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(expenseData),
		});
		const data = await response.json();

		if (!response.ok) {
			throw new Error(
				`Failed to create expense with status ${response.status}: ${
					data.message || "No response message"
				}`
			);
		}

		return data as Expense;
	} catch (error) {
		console.error("Create Expense API Error:", error);
		throw error;
	}
};
