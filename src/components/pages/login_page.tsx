import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../input_field";
import { login } from "../../utils/loginAPI";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";

interface JwtPayload {
	isManager: boolean;
	modelId?: number;
}

const LoginPage: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const { login: authLogin } = useAuth();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		try {
			const token = await login(email, password);
			authLogin(token);

			const payload = jwtDecode<JwtPayload>(token);
			if (payload.isManager) {
				navigate("/manager");
			} else {
				navigate("/model");
			}
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "An error occurred during login."
			);
		}
	};

	return (
		<div className="w-full h-screen overflow-hidden flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
					Login
				</h2>
				<form onSubmit={handleLogin}>
					<InputField
						label="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="user@example.com"
					/>
					<InputField
						label="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
					/>
					{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
