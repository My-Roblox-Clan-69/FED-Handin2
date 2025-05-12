import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
	"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
	"http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
	ModelId: string;
	nbf: string;
	exp: string;
}

export function decodeToken(token: string): JwtPayload {
	const decoded = jwtDecode<JwtPayload>(token);
	console.log("Raw decoded token:", decoded);
	return decoded;
}
