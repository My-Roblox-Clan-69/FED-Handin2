import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/pages/login_page";
import Dashboard from "./components/pages/dashboard";

function App() {
	return (
		<div className="w-full h-screen overflow-hidden">
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</div>
	);
}

export default App;
