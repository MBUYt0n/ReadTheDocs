import { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useNavigate,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Query from "./Query";

function AppWithRouter() {
	const [loggedIn, setLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (loggedIn) {
			navigate("/");
		}
	}, [loggedIn, navigate]);

	const handleLoginSuccess = (token) => {
		localStorage.setItem("token", token);
		setLoggedIn(true);
	};

	return (
		<Routes>
			<Route
				path="/login"
				element={<Login onLoginSuccess={handleLoginSuccess} />}
			/>
			<Route
				path="/register"
				element={<Register onRegisterSuccess={handleLoginSuccess} />}
			/>
			<Route
				path="/"
				element={
					loggedIn ? <Query /> : <Navigate to="/login" replace />
				}
			/>
		</Routes>
	);
}

function App() {
	return (
		<Router>
			<AppWithRouter />
		</Router>
	);
}

export default App;
