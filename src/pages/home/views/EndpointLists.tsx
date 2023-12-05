import { cn } from "../../../utils/cn";
import { useState } from "react";

export default function EndpointLists() {
	const [activeIdx, setActiveIdx] = useState(0);

	return (
		<div className="h-screen bg-gray-50">
			<div className="flex flex-col gap-1 p-1.5">
				{endpointData.map(({ endpoint }, idx) => (
					<div
						className={cn(
							"hover:bg-gray-200 rounded cursor-pointer h-12 flex items-center text-sm px-8",
							{ "bg-gray-200": idx === activeIdx }
						)}
						onClick={() => setActiveIdx(idx)}
					>
						<span>{endpoint}</span>
					</div>
				))}
			</div>
		</div>
	);
}

const endpointData = [
	{
		endpoint: "/api/users",
		method: "GET",
		description: "Get a list of users",
		sampleResponse: [
			{ id: 1, username: "john_doe", email: "john@example.com" },
			{ id: 2, username: "jane_smith", email: "jane@example.com" },
		],
	},
	{
		endpoint: "/api/users/:id",
		method: "GET",
		description: "Get user details by ID",
		sampleResponse: { id: 1, username: "john_doe", email: "john@example.com" },
	},
	{
		endpoint: "/api/posts",
		method: "POST",
		description: "Create a new post",
		sampleRequest: {
			title: "New Post",
			content: "This is the content of the post.",
		},
		sampleResponse: { success: true, message: "Post created successfully" },
	},
	{
		endpoint: "/api/posts/:id",
		method: "GET",
		description: "Get details of a specific post by ID",
		sampleResponse: {
			id: 1,
			title: "New Post",
			content: "This is the content of the post.",
		},
	},
	{
		endpoint: "/api/posts/:id/comments",
		method: "GET",
		description: "Get comments for a specific post by ID",
		sampleResponse: [
			{ id: 1, userId: 1, comment: "Great post!" },
			{ id: 2, userId: 2, comment: "Interesting insights." },
		],
	},
	{
		endpoint: "/api/posts/:id/comments",
		method: "POST",
		description: "Add a new comment to a post",
		sampleRequest: { userId: 3, comment: "I have a question." },
		sampleResponse: { success: true, message: "Comment added successfully" },
	},
	{
		endpoint: "/api/categories",
		method: "GET",
		description: "Get a list of post categories",
		sampleResponse: ["Technology", "Science", "Travel"],
	},
	{
		endpoint: "/api/settings",
		method: "PUT",
		description: "Update user settings",
		sampleRequest: { theme: "dark", notifications: true },
		sampleResponse: { success: true, message: "Settings updated successfully" },
	},
	{
		endpoint: "/api/profile",
		method: "GET",
		description: "Get user profile information",
		sampleResponse: {
			username: "john_doe",
			email: "john@example.com",
			avatar: "avatar.jpg",
		},
	},
	{
		endpoint: "/api/profile",
		method: "PUT",
		description: "Update user profile information",
		sampleRequest: { email: "john_new@example.com" },
		sampleResponse: { success: true, message: "Profile updated successfully" },
	},
	{
		endpoint: "/api/orders",
		method: "GET",
		description: "Get a list of user orders",
		sampleResponse: [
			{ orderId: "123", product: "Laptop", quantity: 2 },
			{ orderId: "124", product: "Smartphone", quantity: 1 },
		],
	},
	{
		endpoint: "/api/orders",
		method: "POST",
		description: "Place a new order",
		sampleRequest: { product: "Tablet", quantity: 3 },
		sampleResponse: { success: true, message: "Order placed successfully" },
	},
	{
		endpoint: "/api/logout",
		method: "POST",
		description: "Logout user",
		sampleResponse: { success: true, message: "Logout successful" },
	},
];
