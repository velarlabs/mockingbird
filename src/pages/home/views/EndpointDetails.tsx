import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";

export default function EndpointDetails() {
	return (
		<div className="p-4 flex flex-col gap-3 flex-1">
			<div>
				<Label htmlFor="email" className="mb-2">
					Endpoint
				</Label>
				<Input />
			</div>
			<div className="flex-1 flex flex-col">
				<Label htmlFor="email" className="mb-2">
					Mock response
				</Label>
				<Textarea className="flex-1" />
			</div>
		</div>
	);
}
