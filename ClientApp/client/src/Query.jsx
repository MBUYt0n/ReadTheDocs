import { useState } from "react";
import "./App.css";

function Query() {
	const [query, setQuery] = useState("");
	return (
		<>
			<div className="App">
				<input
					type="text"
					placeholder="ask your question"
					onChange={(e) => setQuery(e.target.value)}
					value={query}
				/>
				<button
					onClick={() => {
						console.log("Query:", query);
						fetch("/api/ask", {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ query }),
						})
							.then((response) => console.log(response))
							.then((response) => response.json())
							.then((data) => {
								console.log(data);
							})
							.catch((error) => {
								console.error("Error:", error);
							});
					}}
				>
					Ask
				</button>
			</div>
		</>
	);
}

export default Query;
