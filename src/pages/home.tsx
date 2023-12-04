import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


const Loader = () => (
	<div className="flex h-screen items-center justify-center">
		<div className="text-4xl animate-bounce">🚀</div>
		<div className="ml-5">
			<p className="text-lg font-bold">Launching...</p>
			<p className="text-gray-500">Blast off in progress</p>
		</div>
	</div>
);

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}, []);


	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (<div>
				<Navbar />

				<div>
					<Sidebar />
				</div>
			</div>

			)
			}
		</div >
	);
}