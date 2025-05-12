import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/pages/login_page";
import ManagerDashboard from "./components/pages/manager_dashboard.tsx";
import ModelDashboard from "./components/pages/model_dashboard.tsx";
import { useAuth } from "./context/AuthContext";

function App() {
	const { token, user } = useAuth();

	return (
		<div className="w-full h-screen overflow-hidden">
			<Routes>
				<Route 
					path="/" 
					element={
						token 
							? <Navigate to={user?.isManager ? "/manager" : "/model"} /> 
							: <LoginPage />
					} 
				/>
				<Route
					path="/manager"
					element={token && user?.isManager ? <ManagerDashboard /> : <Navigate to="/" />}
				/>
				<Route
					path="/model"
					element={token && !user?.isManager ? <ModelDashboard /> : <Navigate to="/" />}
				/>
			</Routes>
		</div>
	);
}

export default App;
