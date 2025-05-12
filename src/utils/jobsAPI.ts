import { BASE_URL } from "../config";
import type { Job } from "./types/types";

export const fetchJobs = async (): Promise<Job[]> => {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error("No authentication token found. Please log in.");
		}

		const url = `${BASE_URL}/api/Jobs`;

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
				`Failed to fetch jobs with status ${response.status}: ${
					data.message || "No response message"
				}`
			);
		}

		return data as Job[];
	} catch (error) {
		console.error("Fetch Jobs API Error:", error);
		throw error;
	}
};

export const createJob = async (jobData: {
	customer: string;
	startDate: string;
	days: number;
	location: string;
	comments: string;
}): Promise<Job> => {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error("No authentication token found. Please log in.");
		}

		const url = `${BASE_URL}/api/Jobs`;

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(jobData),
		});
		const data = await response.json();

		if (!response.ok) {
			throw new Error(
				`Failed to create job with status ${response.status}: ${
					data.message || "No response message"
				}`
			);
		}

		return data as Job;
	} catch (error) {
		console.error("Create Job API Error:", error);
		throw error;
	}
};

export const addModelToJob = async (
	jobId: number,
	modelId: number
): Promise<void> => {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error("No authentication token found. Please log in.");
		}

		const url = `${BASE_URL}/api/Jobs/${jobId}/model/${modelId}`;

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			const data = await response.json();
			throw new Error(
				`Failed to add model to job with status ${response.status}: ${
					data.message || "No response message"
				}`
			);
		}
	} catch (error) {
		console.error("Add Model to Job API Error:", error);
		throw error;
	}
};

export const removeModelFromJob = async (
	jobId: number,
	modelId: number
): Promise<void> => {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error("No authentication token found. Please log in.");
		}

		const url = `${BASE_URL}/api/Jobs/${jobId}/model/${modelId}`;

		const response = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			const data = await response.json();
			throw new Error(
				`Failed to remove model from job with status ${response.status}: ${
					data.message || "No response message"
				}`
			);
		}
	} catch (error) {
		console.error("Remove Model from Job API Error:", error);
		throw error;
	}
};
