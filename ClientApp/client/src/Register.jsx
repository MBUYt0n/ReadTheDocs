import { React, useState } from "react";

function Register({ onRegisterSuccess }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const handleRegister = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}
		fetch("/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
				email,
			}),
		})
			.then((response) => {
				if (response.ok) {
					if (onRegisterSuccess) onRegisterSuccess();
				} else {
					response
						.json()
						.then((data) =>
							setError(data.message || "Registration failed.")
						);
				}
			})
			.catch((error) => {
				console.error("Error during registration:", error);
				setError("An error occurred. Please try again later.");
			});
	};

	return (
		<div>
			<div className="register-container">
				<h1>Register</h1>
				<form className="form" onSubmit={handleRegister}>
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
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
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
					<div className="form-group">
						<label htmlFor="confirmPassword">
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							required
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					{error && <p className="error">{error}</p>}
					<button type="submit">Register</button>
				</form>
				<p>
					Already have an account? <a href="/login">Login here</a>
				</p>
			</div>
		</div>
	);
}
export default Register;
