import React, { useState, useEffect } from "react";
import type { Job } from "../utils/types/job";
import { fetchJobs } from "../utils/jobsAPI";

const JobsTable: React.FC = () => {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const loadJobs = async () => {
			try {
				const data = await fetchJobs();
				setJobs(data);
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

		loadJobs();
	}, []);

	if (loading) {
		return <p className="text-gray-600 text-center">Loading jobs...</p>;
	}

	if (error) {
		return <p className="text-red-500 text-center">{error}</p>;
	}

	return (
		<div className="w-full">
			{jobs.length === 0 ? (
				<p className="text-gray-600 text-center">No jobs available.</p>
			) : (
				<div className="overflow-x-auto">
					<div className="grid grid-cols-[100px_150px_200px_100px_200px_400px_200px] gap-4 bg-gray-200 p-4 rounded-t-lg font-bold text-gray-800">
						<div>Job ID</div>
						<div>Customer</div>
						<div>Start Date</div>
						<div>Days</div>
						<div>Location</div>
						<div>Comments</div>
						<div>Models</div>
					</div>
					{jobs.map((job) => (
						<div
							key={job.jobId}
							className="grid grid-cols-[100px_150px_200px_100px_200px_400px_200px] gap-4 p-4 border-b border-gray-200"
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
							<div>
								{job.models.length > 0
									? job.models
											.map((model) => `${model.firstName} ${model.lastName}`)
											.join(", ")
									: "No models"}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default JobsTable;
