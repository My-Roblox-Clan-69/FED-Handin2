export const login = async (
	email: string,
	password: string
): Promise<string> => {
	try {
		const url = "https://localhost:8081/api/Account/login";

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
			credentials: "include",
		});
		const text = await response.text();

		if (!response.ok) {
			throw new Error(
				`Login failed with status ${response.status}: ${
					text || "No response body"
				}`
			);
		}

		if (!text) {
			throw new Error("Empty response received from server");
		}

		return text;
	} catch (error) {
		console.error("Login API Error:", error);
		throw error;
	}
};
