import React, { useState, useEffect } from "react";
import InputField from "./input_field";
import { createJob, addModelToJob, removeModelFromJob } from "../utils/jobsAPI";
import { fetchModels, createModel } from "../utils/modelsAPI";
import { createManager } from "../utils/managersAPI";
import { createExpense } from "../utils/expensesAPI";
import type { Job, Model } from "../utils/types/types";
import { useAuth } from "../context/AuthContext";
import Select from "./select";

interface ActionModalProps {
	isOpen: boolean;
	onClose: () => void;
	functionality:
		| "create-model"
		| "create-manager"
		| "create-job"
		| "add-model-to-job"
		| "remove-model-from-job"
		| "create-expense";
	jobs: Job[];
	selectedJobId?: number | null;
	onActionSuccess: () => void;
}

interface FormData {
	firstName?: string;
	lastName?: string;
	email?: string;
	phoneNo?: string;
	addressLine1?: string;
	addressLine2?: string;
	zip?: string;
	city?: string;
	country?: string;
	birthDate?: string;
	nationality?: string;
	height?: string;
	shoeSize?: string;
	hairColor?: string;
	eyeColor?: string;
	comments?: string;
	password?: string;
	customer?: string;
	startDate?: string;
	days?: number;
	location?: string;
	jobId?: number;
	modelId?: number;
	date?: string;
	text?: string;
	amount?: number;
}

const ActionModal: React.FC<ActionModalProps> = ({
	isOpen,
	onClose,
	functionality,
	jobs,
	selectedJobId,
	onActionSuccess,
}) => {
	const { user } = useAuth();
	const [formData, setFormData] = useState<FormData>({
		jobId: selectedJobId || undefined,
	});
	const [error, setError] = useState<string | null>(null);
	const [models, setModels] = useState<Model[]>([]);

	useEffect(() => {
		if (
			functionality === "add-model-to-job" ||
			functionality === "remove-model-from-job"
		) {
			const loadModels = async () => {
				try {
					const data = await fetchModels();
					setModels(data);
				} catch (err) {
					setError(err instanceof Error ? err.message : "An error occurred");
				}
			};

			loadModels();
		}
	}, [functionality]);

	useEffect(() => {
		setFormData((prev) => ({ ...prev, jobId: selectedJobId || undefined }));
	}, [selectedJobId]);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]:
				name === "jobId" ||
				name === "modelId" ||
				name === "days" ||
				name === "amount"
					? Number(value)
					: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		try {
			switch (functionality) {
				case "create-model":
					await createModel({
						firstName: formData.firstName || "",
						lastName: formData.lastName || "",
						email: formData.email || "",
						phoneNo: formData.phoneNo || "",
						addressLine1: formData.addressLine1 || "",
						addressLine2: formData.addressLine2 || "",
						zip: formData.zip || "",
						city: formData.city || "",
						country: formData.country || "",
						birthDate: formData.birthDate || "",
						nationality: formData.nationality || "",
						height: formData.height || "",
						shoeSize: formData.shoeSize || "",
						hairColor: formData.hairColor || "",
						eyeColor: formData.eyeColor || "",
						comments: formData.comments || "",
						password: formData.password || "",
					});
					break;
				case "create-manager":
					await createManager({
						firstName: formData.firstName || "",
						lastName: formData.lastName || "",
						email: formData.email || "",
						password: formData.password || "",
					});
					break;
				case "create-job":
					await createJob({
						customer: formData.customer || "",
						startDate: formData.startDate || "",
						days: formData.days || 0,
						location: formData.location || "",
						comments: formData.comments || "",
					});
					break;
				case "add-model-to-job":
					if (formData.jobId && formData.modelId) {
						await addModelToJob(formData.jobId, formData.modelId);
					} else {
						throw new Error("Job ID and Model ID are required");
					}
					break;
				case "remove-model-from-job":
					if (formData.jobId && formData.modelId) {
						await removeModelFromJob(formData.jobId, formData.modelId);
					} else {
						throw new Error("Job ID and Model ID are required");
					}
					break;
				case "create-expense":
					if (user?.ModelId && formData.jobId) {
						await createExpense({
							modelId: Number(user.ModelId), // Convert string to number
							jobId: formData.jobId,
							date: formData.date || "",
							text: formData.text || "",
							amount: formData.amount || 0,
						});
					} else {
						throw new Error("Model ID and Job ID are required");
					}
					break;
				default:
					throw new Error("Invalid functionality");
			}

			onActionSuccess();
			onClose();
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
				<h2 className="text-xl font-bold mb-4 text-gray-800">
					{functionality === "create-model" && "Create New Model"}
					{functionality === "create-manager" && "Create New Manager"}
					{functionality === "create-job" && "Create New Job"}
					{functionality === "add-model-to-job" && "Add Model to Job"}
					{functionality === "remove-model-from-job" && "Remove Model from Job"}
					{functionality === "create-expense" && "Add an Expense"}
				</h2>
				<form onSubmit={handleSubmit}>
					{functionality === "create-model" ||
					functionality === "create-manager" ? (
						<>
							<InputField
								label="First Name"
								type="text"
								value={formData.firstName || ""}
								onChange={handleChange}
								placeholder="Enter first name"
								name="firstName"
							/>
							<InputField
								label="Last Name"
								type="text"
								value={formData.lastName || ""}
								onChange={handleChange}
								placeholder="Enter last name"
								name="lastName"
							/>
							<InputField
								label="Email"
								type="email"
								value={formData.email || ""}
								onChange={handleChange}
								placeholder="Enter email (e.g., user@example.com)"
								name="email"
							/>
							{functionality === "create-model" && (
								<>
									<InputField
										label="Phone Number"
										type="text"
										value={formData.phoneNo || ""}
										onChange={handleChange}
										placeholder="Enter phone number"
										name="phoneNo"
									/>
									<InputField
										label="Address Line 1"
										type="text"
										value={formData.addressLine1 || ""}
										onChange={handleChange}
										placeholder="Enter address line 1"
										name="addressLine1"
									/>
									<InputField
										label="Address Line 2"
										type="text"
										value={formData.addressLine2 || ""}
										onChange={handleChange}
										placeholder="Enter address line 2"
										name="addressLine2"
									/>
									<InputField
										label="Zip Code"
										type="text"
										value={formData.zip || ""}
										onChange={handleChange}
										placeholder="Enter zip code"
										name="zip"
									/>
									<InputField
										label="City"
										type="text"
										value={formData.city || ""}
										onChange={handleChange}
										placeholder="Enter city"
										name="city"
									/>
									<InputField
										label="Country"
										type="text"
										value={formData.country || ""}
										onChange={handleChange}
										placeholder="Enter country"
										name="country"
									/>
									<InputField
										label="Birth Date"
										type="datetime-local"
										value={formData.birthDate || ""}
										onChange={handleChange}
										name="birthDate"
									/>
									<InputField
										label="Nationality"
										type="text"
										value={formData.nationality || ""}
										onChange={handleChange}
										placeholder="Enter nationality"
										name="nationality"
									/>
									<InputField
										label="Height"
										type="text"
										value={formData.height || ""}
										onChange={handleChange}
										placeholder="Enter height (e.g., 175 cm)"
										name="height"
									/>
									<InputField
										label="Shoe Size"
										type="text"
										value={formData.shoeSize || ""}
										onChange={handleChange}
										placeholder="Enter shoe size (e.g., 40)"
										name="shoeSize"
									/>
									<InputField
										label="Hair Color"
										type="text"
										value={formData.hairColor || ""}
										onChange={handleChange}
										placeholder="Enter hair color"
										name="hairColor"
									/>
									<InputField
										label="Eye Color"
										type="text"
										value={formData.eyeColor || ""}
										onChange={handleChange}
										placeholder="Enter eye color"
										name="eyeColor"
									/>
									<div className="mb-3">
										<label className="block text-gray-700 text-sm font-bold mb-1">
											Comments
										</label>
										<textarea
											name="comments"
											value={formData.comments || ""}
											onChange={handleChange}
											className="w-full p-2 border rounded shadow appearance-none leading-tight focus:outline-none focus:shadow-outline"
											placeholder="Enter comments"
										/>
									</div>
									<InputField
										label="Password"
										type="password"
										value={formData.password || ""}
										onChange={handleChange}
										placeholder="Enter password"
										name="password"
									/>
								</>
							)}
							{functionality === "create-manager" && (
								<InputField
									label="Password"
									type="password"
									value={formData.password || ""}
									onChange={handleChange}
									placeholder="Enter password"
									name="password"
								/>
							)}
						</>
					) : functionality === "create-job" ? (
						<>
							<InputField
								label="Customer"
								type="text"
								value={formData.customer || ""}
								onChange={handleChange}
								placeholder="Enter customer name"
								name="customer"
							/>
							<InputField
								label="Start Date"
								type="datetime-local"
								value={formData.startDate || ""}
								onChange={handleChange}
								name="startDate"
							/>
							<InputField
								label="Days"
								type="number"
								value={formData.days?.toString() || ""}
								onChange={handleChange}
								placeholder="Enter number of days"
								name="days"
							/>
							<InputField
								label="Location"
								type="text"
								value={formData.location || ""}
								onChange={handleChange}
								placeholder="Enter location"
								name="location"
							/>
							<div className="mb-3">
								<label className="block text-gray-700 text-sm font-bold mb-1">
									Comments
								</label>
								<textarea
									name="comments"
									value={formData.comments || ""}
									onChange={handleChange}
									className="w-full p-2 border rounded shadow appearance-none leading-tight focus:outline-none focus:shadow-outline"
									placeholder="Enter comments"
								/>
							</div>
						</>
					) : functionality === "add-model-to-job" ||
					  functionality === "remove-model-from-job" ? (
						<>
							{functionality === "remove-model-from-job" && (
								<div className="mb-3">
									<label className="block text-gray-700 text-sm font-bold mb-1">
										Select Job
									</label>
									<select
										name="jobId"
										value={formData.jobId || ""}
										onChange={handleChange}
										className="w-full p-2 border rounded"
										required
									>
										<option value="">Select a job</option>
										{jobs.map((job) => (
											<option key={job.jobId} value={job.jobId}>
												{job.jobId} - {job.customer} ({job.location})
											</option>
										))}
									</select>
								</div>
							)}
							<Select
								label="Select Model"
								name="modelId"
								value={formData.modelId?.toString() || ""}
								onChange={handleChange}
								options={models.map((model) => ({
									value: model.modelId,
									label: `${model.firstName} ${model.lastName}`,
								}))}
								placeholder="Select a model"
							/>
						</>
					) : functionality === "create-expense" ? (
						<>
							<Select
								label="Select Job"
								name="jobId"
								value={formData.jobId?.toString() || ""}
								onChange={handleChange}
								options={jobs.map((job) => ({
									value: job.jobId,
									label: `${job.jobId} - ${job.customer} (${job.location})`,
								}))}
								placeholder="Select a job"
							/>
							<InputField
								label="Date"
								type="datetime-local"
								value={formData.date || ""}
								onChange={handleChange}
								name="date"
							/>
							<InputField
								label="Description"
								type="text"
								value={formData.text || ""}
								onChange={handleChange}
								placeholder="Enter expense description"
								name="text"
							/>
							<InputField
								label="Amount"
								type="number"
								value={formData.amount?.toString() || ""}
								onChange={handleChange}
								placeholder="Enter amount"
								name="amount"
							/>
						</>
					) : null}

					{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
					<div className="flex justify-end gap-2">
						<button
							type="button"
							onClick={onClose}
							className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
						>
							Confirm
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ActionModal;
