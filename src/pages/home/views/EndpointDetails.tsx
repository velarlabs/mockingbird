import { Endpoint } from "..";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Play, Save } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

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
  endpoints: Endpoint[];
  setEndpoints: React.Dispatch<React.SetStateAction<Endpoint[]>>;
}

export default function EndpointDetails({
  endpoints,
  setEndpoints,
  selectedEndpointIDX,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      method: endpoints[selectedEndpointIDX].method,
      description: endpoints[selectedEndpointIDX].description,
      endpoint: endpoints[selectedEndpointIDX].endpoint,
      status: endpoints[selectedEndpointIDX].status,
      mockResponse: JSON.stringify(endpoints[selectedEndpointIDX].mockResponse),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setEndpoints((prevEndpoints) => {
      const newEndpoints = [...prevEndpoints];
      //@ts-ignore
      newEndpoints[selectedEndpointIDX] = values;
      return newEndpoints;
    });
    console.log(values);
  }

  return (
    <div className="flex flex-col flex-1 gap-3 p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-1 w-full h-full space-y-4"
        >
          <div className="flex self-end justify-end gap-x-4">
            <Button type="button" onClick={() => console.log("Run")}>
              <Play className="w-4 h-4 mr-2" />
              Run
            </Button>
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              Save
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
                  <Textarea
                    name="mockResponse"
                    placeholder="Mock response"
                    {...field}
                    className="flex-1"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
