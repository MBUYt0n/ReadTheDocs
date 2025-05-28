import { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register"; // Create this component if you haven't
import Query from "./Query"; // Move your main app logic here

function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	return (
		<Router>
			<Routes>
				<Route
					path="/login"
					element={<Login onLoginSuccess={() => setLoggedIn(true)} />}
				/>
				<Route
					path="/register"
					element={
						<Register onRegisterSuccess={() => setLoggedIn(true)} />
					}
				/>
				<Route
					path="/"
					element={
						loggedIn ? (
							<Query />
						) : (
							<Navigate to="/login" replace />
						)
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
