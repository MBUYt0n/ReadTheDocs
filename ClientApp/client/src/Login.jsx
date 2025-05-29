import React, { useState } from "react";

function Login({ onLoginSuccess }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		fetch("/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		})
			.then(async (response) => {
				if (response.ok) {
					let data = await response.json();
					console.log(data)
					if (onLoginSuccess) onLoginSuccess(data.token);
				} else {
					alert("Login failed. Please check your credentials.");
				}
			})
			.catch((error) => {
				console.error("Error during login:", error);
				alert("An error occurred. Please try again later.");
			});
	};

	return (
		<div className="login-container">
			<h1>Login</h1>
			<form className="form" onSubmit={handleLogin}>
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						name="username"
						required
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit">Login</button>
			</form>
			<p>
				Don't have an account? <a href="/register">Register here</a>
			</p>
		</div>
	);
}

export default Login;
