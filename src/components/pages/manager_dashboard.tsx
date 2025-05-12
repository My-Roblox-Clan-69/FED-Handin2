import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { Job } from "../../utils/types/types";
import StyledHeaderButton from "../styled_header_button";
import JobsTable from "../job_table";
import ActionModal from "../action_modal";

export default function ManagerDashboard() {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);
	const [modalFunctionality, setModalFunctionality] = useState<
		| "create-model"
		| "create-manager"
		| "create-job"
		| "add-model-to-job"
		| "remove-model-from-job"
	>("create-job");
	const [jobs, setJobs] = useState<Job[]>([]);
	const [refreshTrigger, setRefreshTrigger] = useState(0);
	const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	const openModal = (
		functionality:
			| "create-model"
			| "create-manager"
			| "create-job"
			| "add-model-to-job"
			| "remove-model-from-job",
		jobId?: number
	) => {
		setModalFunctionality(functionality);
		setSelectedJobId(jobId || null);
		setModalOpen(true);
	};

	const handleActionSuccess = () => {
		setRefreshTrigger((prev) => prev + 1);
	};

	return (
		<div className="w-full h-screen overflow-hidden p-4 bg-gray-100 flex flex-col">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Welcome Manager</h1>
				<div className="flex gap-2">
					<StyledHeaderButton
						label="Add Job"
						onClick={() => openModal("create-job")}
					/>
					<StyledHeaderButton
						label="Add Model"
						onClick={() => openModal("create-model")}
					/>
					<StyledHeaderButton
						label="Add Manager"
						onClick={() => openModal("create-manager")}
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
					onAddModel={(jobId) => openModal("add-model-to-job", jobId)}
				/>
			</div>
			<ActionModal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				functionality={modalFunctionality}
				jobs={jobs}
				selectedJobId={selectedJobId}
				onActionSuccess={handleActionSuccess}
			/>
		</div>
	);
}
