import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import JobsTable from "../job_table";

export default function ModelDashboard() {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<div className="w-full h-screen overflow-hidden p-4 bg-gray-100 flex flex-col">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Welcome Model</h1>
				<button
					onClick={handleLogout}
					className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
				>
					Logout
				</button>
			</div>
			<div className="flex-1 overflow-y-auto">
				<JobsTable />
			</div>
		</div>
	);
}
