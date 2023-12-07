import SizedBox from "@/components/SizedBox";
import Navbar from "@/components/Navbar";
import EndpointDetails from "./views/EndpointDetails";
import EndpointLists from "./views/EndpointLists";
import { useState } from "react";

export type Endpoint = {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  mockResponse: any;
  status: number;
  description?: string;
};

export default function Home() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([
    {
      endpoint: "/api/users",
      method: "GET",
      mockResponse: [
        { id: 1, username: "john_doe", email: "john@example.com" },
        { id: 2, username: "jane_smith", email: "jane@example.com" },
      ],
      status: 200,
      description: "Get a list of users",
    },
    {
      endpoint: "/api/users",
      method: "GET",
      status: 200,
      mockResponse: [
        { id: 1, username: "john_doe", email: "john@example.com" },
        { id: 2, username: "jane_smith", email: "jane@example.com" },
      ],
      description: "Get a list of users",
    },
  ]);
  const [selectedEndpointIDX, setSelectedEndpointIDX] = useState(0);

  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <EndpointLists
            endpoints={endpoints}
            setEndpoints={setEndpoints}
            selectedEndpointIDX={selectedEndpointIDX}
            setSelectedEndpointIDX={setSelectedEndpointIDX}
          />
        </div>
        <div className="flex flex-col col-span-9">
          <EndpointDetails
            key={selectedEndpointIDX}
            selectedEndpointIDX={selectedEndpointIDX}
            endpoints={endpoints}
            setEndpoints={setEndpoints}
          />
          <SizedBox height={50} />
        </div>
      </div>
    </div>
  );
}
