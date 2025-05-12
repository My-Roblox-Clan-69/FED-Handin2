import type { Job } from "./types/job";

export const fetchJobs = async (): Promise<Job[]> => {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error("No authentication token found. Please log in.");
		}

		const url = "https://localhost:8081/api/Jobs";

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
