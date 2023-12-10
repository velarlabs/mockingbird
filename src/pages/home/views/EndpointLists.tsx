import { Button } from "@/components/ui/button";
import { Endpoint } from "..";
import { cn } from "@/utils/cn";
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
        {endpoints.map(({ endpoint, method }, idx) => (
          <div
            key={idx}
            className={cn(
              "hover:bg-gray-200 rounded cursor-pointer h-12 flex items-center text-sm px-2 gap-x-4",
              { "bg-gray-200": idx === selectedEndpointIDX }
            )}
            onClick={() => setSelectedEndpointIDX(idx)}
          >
            <span
              className={cn(
                "px-2 py-1 w-16 text-center text-white bg-green-400 rounded-md",
                {
                  "bg-green-400": method === "GET",
                  "bg-blue-400": method === "POST",
                  "bg-yellow-400": method === "PUT",
                  "bg-red-400": method === "DELETE",
                }
              )}
            >
              {method.toUpperCase()}
            </span>
            <span>{endpoint}</span>
          </div>
        ))}
        {endpoints.length < 1 && (
          <div className="flex items-center justify-center h-full">
            No Endpoints
          </div>
        )}
      </div>
    </div>
  );
}
