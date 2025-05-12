import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/pages/login_page";
import ManagerDashboard from "./components/pages/manager_dashboard.tsx";
import ModelDashboard from "./components/pages/model_dashboard.tsx";
import { useAuth } from "./context/AuthContext";

function App() {
	const { token, user } = useAuth();

	const isManager = user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Manager";

	return (
		<div className="w-full h-screen overflow-hidden">
			<Routes>
				<Route 
					path="/" 
					element={
						token 
							? <Navigate to={isManager ? "/manager" : "/model"} /> 
							: <LoginPage />
					} 
				/>
				<Route
					path="/manager"
					element={token && isManager ? <ManagerDashboard /> : <Navigate to="/" />}
				/>
				<Route
					path="/model"
					element={token && !isManager ? <ModelDashboard /> : <Navigate to="/" />}
				/>
			</Routes>
		</div>
	);
}

export default App;
