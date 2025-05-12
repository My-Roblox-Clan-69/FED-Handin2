import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Job } from "../../utils/types/types";
import StyledHeaderButton from "../styled_header_button";
import JobsTable from "../job_table";
import ActionModal from "../action_modal";

export default function ModelDashboard() {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);
	const [modalFunctionality, setModalFunctionality] = useState<
		"create-expense" | "add-model-to-job" | "remove-model-from-job"
	>("create-expense");
	const [jobs, setJobs] = useState<Job[]>([]);
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	const openModal = (
		functionality:
			| "create-expense"
			| "add-model-to-job"
			| "remove-model-from-job"
	) => {
		setModalFunctionality(functionality);
		setModalOpen(true);
	};

	const handleActionSuccess = () => {
		setRefreshTrigger((prev) => prev + 1);
	};

	return (
		<div className="w-full h-screen overflow-hidden p-4 bg-gray-100 flex flex-col">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Welcome Model</h1>
				<div className="flex gap-2">
					<StyledHeaderButton
						label="Add an Expense"
						onClick={() => openModal("create-expense")}
					/>
					<button
						onClick={handleLogout}
						className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
					>
						Logout
					</button>
				</div>
			</div>
			<div className="flex-1 overflow-y-auto">
				<JobsTable
					key={refreshTrigger}
					onJobsLoaded={(loadedJobs) => setJobs(loadedJobs)}
				/>
			</div>
			<ActionModal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				functionality={modalFunctionality}
				jobs={jobs}
				selectedJobId={null}
				onActionSuccess={handleActionSuccess}
			/>
		</div>
	);
}
