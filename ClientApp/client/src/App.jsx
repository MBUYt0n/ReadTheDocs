import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [query, setQuery] = useState("");

	return (
		<>
			<div className="App">
				<input
					type="text"
					placeholder="ask you question"
					onChange={(e) => setQuery(e.target.value)}
					value={query}
				/>
				<button onClick={() => {
					console.log("Query:", query);
					fetch("/api/ask", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ query }),
					})
						.then((response) => response.json())
						.then((data) => {
							console.log(data);
						})
						.catch((error) => {
							console.error("Error:", error);
						});
				}
				}>
					Ask
				</button>
				</div>
		</>
	);
}

export default App;
