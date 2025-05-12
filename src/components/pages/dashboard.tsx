import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("authToken");
		navigate("/");
	};

	return (
		<div className="w-full h-screen overflow-hidden flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
					Welcome to the Dashboard
				</h2>
				<p className="text-gray-600 mb-4">You are successfully logged in!</p>
				<button
					onClick={handleLogout}
					className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Dashboard;
