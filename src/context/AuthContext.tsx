import React, { createContext, useContext, useState } from "react";
import { decodeToken } from "../utils/types/jwt";
import type { JwtPayload } from "../utils/types/jwt";

interface AuthContextType {
	token: string | null;
	user: JwtPayload | null;
	login: (token: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [token, setToken] = useState<string | null>(
		localStorage.getItem("token")
	);
	const [user, setUser] = useState<JwtPayload | null>(
		token ? decodeToken(token) : null
	);

	const login = (newToken: string) => {
		console.log("New token received:", newToken);
		const decodedUser = decodeToken(newToken);
		console.log("Decoded user:", decodedUser);

		localStorage.setItem("token", newToken);
		setToken(newToken);
		setUser(decodedUser);
	};

	const logout = () => {
		localStorage.removeItem("token");
		setToken(null);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ token, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
}
