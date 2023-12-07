import { Button } from "../../../components/ui/button";
import { Endpoint } from "..";
import { cn } from "../../../utils/cn";
import { Plus } from "lucide-react";

interface Props {
  endpoints: Endpoint[];
  setEndpoints: React.Dispatch<React.SetStateAction<Endpoint[]>>;
  selectedEndpointIDX: number;
  setSelectedEndpointIDX: React.Dispatch<React.SetStateAction<number>>;
}

export default function EndpointLists({
  endpoints,
  setEndpoints,
  selectedEndpointIDX,
  setSelectedEndpointIDX,
}: Props) {
  const handleEndpointCreation = () => {
    setEndpoints((prevEndpoints) => [
      ...prevEndpoints,
      {
        endpoint: "/api/",
        method: "GET",
        mockResponse: null,
        status: 200,
        description: "Get a list of users",
      },
    ]);
    setSelectedEndpointIDX(endpoints.length);
  };

  return (
    <div className="flex flex-col h-screen px-2 py-4 bg-gray-50">
      <Button
        size="lg"
        variant="outline"
        className="self-end justify-end mb-4 hover:opacity-75"
        onClick={handleEndpointCreation}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add New
      </Button>
      <div className="flex flex-col gap-2">
        {endpoints.map(({ endpoint, method, status }, idx) => (
          <div
            key={idx}
            className={cn(
              "hover:bg-gray-200 rounded cursor-pointer h-12 flex items-center text-sm px-2 gap-x-4",
              { "bg-gray-200": idx === selectedEndpointIDX }
            )}
            onClick={() => setSelectedEndpointIDX(idx)}
          >
            <span
              className={cn("px-2 py-1 w-16 text-center text-white bg-green-400 rounded-md", {
                "bg-green-400": method === "GET",
                "bg-blue-400": method === "POST",
                "bg-yellow-400": method === "PUT",
                "bg-red-400": method === "DELETE",
              })}
            >
              {method.toUpperCase()}
            </span>
            <span>{endpoint}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// const endpointData = [
//   {
//     endpoint: "/api/users",
//     method: "GET",
//     description: "Get a list of users",
//     mockResponse: [
//       { id: 1, username: "john_doe", email: "john@example.com" },
//       { id: 2, username: "jane_smith", email: "jane@example.com" },
//     ],
//   },
//   {
//     endpoint: "/api/users/:id",
//     method: "GET",
//     description: "Get user details by ID",
//     mockResponse: { id: 1, username: "john_doe", email: "john@example.com" },
//   },
//   {
//     endpoint: "/api/posts",
//     method: "POST",
//     description: "Create a new post",
//     sampleRequest: {
//       title: "New Post",
//       content: "This is the content of the post.",
//     },
//     mockResponse: { success: true, message: "Post created successfully" },
//   },
//   {
//     endpoint: "/api/posts/:id",
//     method: "GET",
//     description: "Get details of a specific post by ID",
//     mockResponse: {
//       id: 1,
//       title: "New Post",
//       content: "This is the content of the post.",
//     },
//   },
//   {
//     endpoint: "/api/posts/:id/comments",
//     method: "GET",
//     description: "Get comments for a specific post by ID",
//     mockResponse: [
//       { id: 1, userId: 1, comment: "Great post!" },
//       { id: 2, userId: 2, comment: "Interesting insights." },
//     ],
//   },
//   {
//     endpoint: "/api/posts/:id/comments",
//     method: "POST",
//     description: "Add a new comment to a post",
//     sampleRequest: { userId: 3, comment: "I have a question." },
//     mockResponse: { success: true, message: "Comment added successfully" },
//   },
//   {
//     endpoint: "/api/categories",
//     method: "GET",
//     description: "Get a list of post categories",
//     mockResponse: ["Technology", "Science", "Travel"],
//   },
//   {
//     endpoint: "/api/settings",
//     method: "PUT",
//     description: "Update user settings",
//     sampleRequest: { theme: "dark", notifications: true },
//     mockResponse: { success: true, message: "Settings updated successfully" },
//   },
//   {
//     endpoint: "/api/profile",
//     method: "GET",
//     description: "Get user profile information",
//     mockResponse: {
//       username: "john_doe",
//       email: "john@example.com",
//       avatar: "avatar.jpg",
//     },
//   },
//   {
//     endpoint: "/api/profile",
//     method: "PUT",
//     description: "Update user profile information",
//     sampleRequest: { email: "john_new@example.com" },
//     mockResponse: { success: true, message: "Profile updated successfully" },
//   },
//   {
//     endpoint: "/api/orders",
//     method: "GET",
//     description: "Get a list of user orders",
//     mockResponse: [
//       { orderId: "123", product: "Laptop", quantity: 2 },
//       { orderId: "124", product: "Smartphone", quantity: 1 },
//     ],
//   },
//   {
//     endpoint: "/api/orders",
//     method: "POST",
//     description: "Place a new order",
//     sampleRequest: { product: "Tablet", quantity: 3 },
//     mockResponse: { success: true, message: "Order placed successfully" },
//   },
//   {
//     endpoint: "/api/logout",
//     method: "POST",
//     description: "Logout user",
//     mockResponse: { success: true, message: "Logout successful" },
//   },
// ];
