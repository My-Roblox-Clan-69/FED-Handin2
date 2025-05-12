import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { fetchJobs, removeModelFromJob } from "../utils/jobsAPI";
import { fetchExpensesForModel } from "../utils/expensesAPI";
import type { Expense, Job } from "../utils/types/types";
import { useAuth } from "../context/AuthContext";

interface JobsTableProps {
	onJobsLoaded?: (jobs: Job[]) => void;
	onAddModel?: (jobId: number) => void;
}

const JobsTable: React.FC<JobsTableProps> = ({ onJobsLoaded, onAddModel }) => {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const location = useLocation();
	const isManager = location.pathname.startsWith("/manager");
	const isModel = location.pathname.startsWith("/model");
	const { user } = useAuth();

	useEffect(() => {
		const loadJobs = async () => {
			try {
				const data = await fetchJobs();
				setJobs(data);
				if (onJobsLoaded) onJobsLoaded(data);
				setLoading(false);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "An error occurred while fetching jobs."
				);
				setLoading(false);
			}
		};

		const loadExpenses = async () => {
			if (isModel && user?.ModelId) {
				try {
					const modelId = Number(user.ModelId); // Convert string to number
					const data = await fetchExpensesForModel(modelId);
					setExpenses(data);
				} catch (err) {
					setError(
						err instanceof Error
							? err.message
							: "An error occurred while fetching expenses."
					);
				}
			}
		};

		loadJobs();
		loadExpenses();
	}, [isModel, user?.ModelId, onJobsLoaded]);

	const handleDeleteModel = async (jobId: number, modelId: number) => {
		try {
			await removeModelFromJob(jobId, modelId);
			const updatedJobs = await fetchJobs();
			setJobs(updatedJobs);
			if (onJobsLoaded) onJobsLoaded(updatedJobs);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "An error occurred while removing the model."
			);
		}
	};

	if (loading) {
		return <p className="text-gray-600 text-center">Loading jobs...</p>;
	}

	if (error) {
		return <p className="text-red-500 text-center">{error}</p>;
	}

	return (
		<div className="w-full">
			<h2 className="text-xl font-semibold mb-4 text-gray-800">Jobs</h2>
			{jobs.length === 0 ? (
				<p className="text-gray-600 text-center">No jobs available.</p>
			) : (
				<div className="overflow-x-auto">
					<div className="grid grid-cols-[100px_150px_200px_100px_200px_200px_200px_200px] gap-4 bg-gray-200 p-4 rounded-t-lg font-bold text-gray-800">
						<div>Job ID</div>
						<div>Customer</div>
						<div>Start Date</div>
						<div>Days</div>
						<div>Location</div>
						<div>Comments</div>
						<div>{isModel ? "Expenses" : "Models"}</div>
						<div>Expense Details</div>
					</div>
					{jobs.map((job) => {
						const jobExpenses = expenses.filter(
							(expense) => expense.jobId === job.jobId
						);
						return (
							<div
								key={job.jobId}
								className="grid grid-cols-[100px_150px_200px_100px_200px_200px_200px_200px] gap-4 p-4 border-b border-gray-200"
							>
								<div>{job.jobId}</div>
								<div>{job.customer}</div>
								<div>
									{new Date(job.startDate).toLocaleDateString("en-US", {
										year: "numeric",
										month: "short",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit",
									})}
								</div>
								<div>{job.days}</div>
								<div>{job.location}</div>
								<div>{job.comments || "N/A"}</div>
								<div className="flex flex-wrap items-center gap-2">
									{isModel ? (
										jobExpenses.length > 0 ? (
											jobExpenses.map((expense) => (
												<div
													key={expense.expenseId}
													className="flex items-center gap-1"
												>
													<span>{`${expense.text} - DKK ${expense.amount}`}</span>
												</div>
											))
										) : (
											"No expenses"
										)
									) : job.models.length > 0 ? (
										job.models.map((model) => (
											<div
												key={model.modelId}
												className="flex items-center gap-1"
											>
												<span>{`${model.firstName} ${model.lastName}`}</span>
												{isManager && (
													<button
														onClick={() =>
															handleDeleteModel(job.jobId, model.modelId)
														}
														className="text-red-500 hover:text-red-700"
														title="Delete Model"
													>
														<FontAwesomeIcon icon={faTrash} />
													</button>
												)}
											</div>
										))
									) : (
										<>
											No models
											{isManager && onAddModel && (
												<button
													onClick={() => onAddModel(job.jobId)}
													className="ml-2 text-green-500 hover:text-green-700"
													title="Add Model"
												>
													<FontAwesomeIcon icon={faPlus} />
												</button>
											)}
										</>
									)}
								</div>
								<div className="flex flex-wrap items-center gap-2">
									{isModel && jobExpenses.length > 0
										? jobExpenses.map((expense) => (
												<div
													key={expense.expenseId}
													className="flex items-center gap-1"
												>
													<span>{`Date: ${new Date(
														expense.date
													).toLocaleDateString("en-US", {
														year: "numeric",
														month: "short",
														day: "numeric",
													})}`}</span>
												</div>
										  ))
										: ""}
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default JobsTable;
