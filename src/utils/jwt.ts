import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
	isManager: boolean;
	modelId?: number;
	email: string;
}

export function decodeToken(token: string): JwtPayload {
	return jwtDecode<JwtPayload>(token);
}
