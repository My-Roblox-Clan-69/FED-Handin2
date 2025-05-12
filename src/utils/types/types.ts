export interface Model {
	modelId: number;
	firstName: string;
	lastName: string;
	email: string;
	phoneNo: string;
	addressLine1: string;
	addressLine2: string;
	zip: string;
	city: string;
	country: string;
	birthDate: string;
	nationality: string;
	height: string;
	shoeSize: string;
	hairColor: string;
	eyeColor: string;
	comments: string;
	password: string;
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

export interface Expense {
	expenseId?: number;
	modelId: number;
	jobId: number;
	date: string;
	text: string;
	amount: number;
}
