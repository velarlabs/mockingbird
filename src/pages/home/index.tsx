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
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [selectedEndpointIDX, setSelectedEndpointIDX] = useState(-1);

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
            setSelectedEndpointIDX={setSelectedEndpointIDX}
            endpoints={endpoints}
            setEndpoints={setEndpoints}
          />
          <SizedBox height={50} />
        </div>
      </div>
    </div>
  );
}
