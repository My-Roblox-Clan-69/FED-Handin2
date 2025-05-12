export interface Model {
	modelId: number;
	firstName: string;
	lastName: string;
	email: string;
	phoneNo: string;
	jobs: Job[];
}

export interface Job {
	jobId: number;
	customer: string;
	startDate: string;
	days: number;
	location: string;
	comments: string;
	models: Model[];
}
