import { Endpoint } from "..";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ipcRenderer } from "electron";
import JsonEditor from "@/components/JsonEditor";
import { Modal, notification } from "antd";

const formSchema = z.object({
  method: z.enum(["GET", "POST", "PUT", "DELETE"], {
    required_error: "Method is required",
  }),
  endpoint: z.string().min(1, { message: "Endpoint is required" }),
  mockResponse: z.any(),
  status: z.coerce
    .number()
    .min(100, { message: "Status is required" })
    .max(599, {
      message: "Status must be between 100 and 599",
    }),
  description: z.string().min(1).optional(),
});

interface Props {
  selectedEndpointIDX: number;
  setSelectedEndpointIDX: React.Dispatch<React.SetStateAction<number>>;
  endpoints: Endpoint[];
  setEndpoints: React.Dispatch<React.SetStateAction<Endpoint[]>>;
}

export default function EndpointDetails({
  endpoints,
  setEndpoints,
  selectedEndpointIDX,
  setSelectedEndpointIDX,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      method: endpoints[selectedEndpointIDX]?.method || "GET",
      description: endpoints[selectedEndpointIDX]?.description || "",
      endpoint: endpoints[selectedEndpointIDX]?.endpoint || "",
      status: endpoints[selectedEndpointIDX]?.status || 200,
      mockResponse: endpoints[selectedEndpointIDX]?.mockResponse || {},
    },
  });

  const mockResponseWatch = form.watch("mockResponse");

  // async function runAPI() {
  //   // Invoke create endpoint with submitted data
  //   await ipcRenderer.invoke("create-endpoint", {
  //     prevEndpoint: endpoints[selectedEndpointIDX]?.endpoint,
  //     endpoint: form.getValues("endpoint"),
  //     method: form.getValues("method"),
  //     mockResponse: form.getValues("mockResponse"),
  //     status: form.getValues("status"),
  //   });

  //   notification.success({
  //     message: `API successfully ran as ${form.getValues("method")}`,
  //     description: `${form.getValues("endpoint")} with status ${form.getValues(
  //       "status"
  //     )} ran successfully.`,
  //     placement: "top",
  //   });
  // }

  const deleteAPI = async () => {
    // Invoke create endpoint with submitted data
    await ipcRenderer.invoke("delete-endpoint", {
      endpoint: endpoints[selectedEndpointIDX]?.endpoint,
    });

    setEndpoints((prevEndpoints) => {
      const newEndpoints = [...prevEndpoints];
      newEndpoints.splice(selectedEndpointIDX, 1);
      return newEndpoints;
    });
    setSelectedEndpointIDX(-1);

    notification.success({
      message: `Successfully deleted endpoint`,
      placement: "top",
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Update state
    setEndpoints((prevEndpoints) => {
      const newEndpoints = [...prevEndpoints];
      //@ts-ignore
      newEndpoints[selectedEndpointIDX] = { ...values };
      return newEndpoints;
    });

    // Invoke create endpoint with submitted data
    await ipcRenderer.invoke("create-endpoint", {
      prevEndpoint: endpoints[selectedEndpointIDX]?.endpoint,
      endpoint: values.endpoint,
      method: values.method,
      mockResponse: values.mockResponse,
      status: values.status,
    });

    notification.success({
      message: `Successfully saved ${values.method} & ran endpoint`,
      description: `${values.endpoint} with status ${values.status} saved successfully.`,
      placement: "top",
    });
  }

  return (
    <div className="flex flex-col flex-1 gap-3 p-4">
      {selectedEndpointIDX == -1 ? (
        <div className="flex items-center justify-center h-full">
          No endpoint is selected.
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1 w-full h-full space-y-4"
          >
            <div className="flex self-end justify-end gap-x-4">
              {/* <Button
                type="button"
                onClick={runAPI}
                disabled={!mockResponseWatch}
                className={
                  !mockResponseWatch ? "opacity-40 cursor-not-allowed" : ""
                }
              >
                <Play className="w-4 h-4 mr-2" />
                Run
              </Button> */}
              <Button
                disabled={!mockResponseWatch}
                type="submit"
                className={
                  !mockResponseWatch ? "opacity-40 cursor-not-allowed" : ""
                }
              >
                <Save className="w-4 h-4 mr-2" />
                Save & Run
              </Button>
              <Button
                type="button"
                onClick={async () => {
                  Modal.confirm({
                    title: "Delete Endpoint",
                    content: "Are you sure you want to delete this endpoint?",
                    async onOk() {
                      await deleteAPI();
                    },
                  });
                }}
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
            <div className="flex justify-between w-full gap-x-4">
              <FormField
                control={form.control}
                name="endpoint"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Endpoint</FormLabel>
                    <FormControl>
                      <Input
                        name="endpoint"
                        type="text"
                        placeholder="Endpoint"
                        {...field}
                        className="w-full mb-4"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="method"
                render={({ field }) => (
                  <FormItem className="w-40">
                    <FormLabel>Method</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a method." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-40">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Input
                        name="status"
                        type="number"
                        placeholder="Status"
                        {...field}
                        className="w-full mb-4"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="mockResponse"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1 w-full h-full">
                  <FormLabel>
                    <Label htmlFor="mockResponse" className="mb-2">
                      Mock response
                    </Label>
                  </FormLabel>
                  <FormControl>
                    <JsonEditor json={field.value} setJson={field.onChange} />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </div>
  );
}
