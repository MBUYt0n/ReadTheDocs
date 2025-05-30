import { useState, useEffect } from "react";
import "./App.css";

function Query() {
	const [query, setQuery] = useState("");
	const [history, setHistory] = useState([]);

	useEffect(() => {
		fetch("/api/history", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then(async (response) => {
				if (!response.ok) {
					throw new Error(
						`HTTP error! status: ${response.status} - ${response.statusText}`
					);
				}
				const data = await response.json();
				return data;				
			})
			.then((data) => setHistory(data.questions))
			.catch((err) => {
				console.error("Failed to fetch history:", err);
				setHistory([]);
			});
	}, []);

	return (
		<div className="app-container" style={{ display: "flex" }}>
			<aside
				className="sidebar"
				style={{
					width: "250px",
					padding: "1rem",
					borderRight: "1px solid #ddd",
					height: "100vh",
					overflowY: "auto",
				}}
			>
				<h3>Previous Queries</h3>
				<ul style={{ listStyle: "none", padding: 0 }}>
					{history.length === 0 && <li>No queries yet.</li>}
					{history.map((q, i) => (
						<li key={q.id || i} style={{ marginBottom: "1em" }}>
							{q.text || q.question || q.Question}
						</li>
					))}
				</ul>
			</aside>
			<div className="App" style={{ flex: 1, padding: "2rem" }}>
				<input
					type="text"
					placeholder="ask your question"
					onChange={(e) => setQuery(e.target.value)}
					value={query}
				/>
				<button
					onClick={() => {
						fetch("/api/ask", {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${localStorage.getItem(
									"token"
								)}`,
							},
							body: JSON.stringify({ question: query }),
						}).then((response) => {
							if (response.ok)
								response
									.json()
									.then((data) => console.log(data))
									.catch((error) => {
										console.error(
											"Error parsing JSON:",
											error
										);
									});
							else
								console.error(
									"Error:",
									response.status,
									response.statusText
								);
						});
					}}
				>
					Ask
				</button>
				<button
					className="logout-button"
					onClick={() => {
						localStorage.removeItem("token");
						window.location.href = "/login";
					}}
				>
					Logout
				</button>
			</div>
		</div>
	);
}

export default Query;
