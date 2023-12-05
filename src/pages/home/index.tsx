import SizedBox from "../../components/SizedBox";
import Navbar from "../../components/Navbar";
import EndpointDetails from "./views/EndpointDetails";
import EndpointLists from "./views/EndpointLists";

export default function Home() {
	return (
		<div className="h-screen overflow-hidden">
			<Navbar />
			<div className="grid grid-cols-12">
				<div className="col-span-3">
					<EndpointLists />
				</div>
				<div className="col-span-9 flex flex-col">
					<EndpointDetails />
					<SizedBox height={50} />
				</div>
			</div>
		</div>
	);
}
