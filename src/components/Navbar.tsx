import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function Navbar() {
	return (
		<div className="w-full text-gray-700 bg-white border-b">
			<div className="flex flex-col px-4 py-2 md:items-center md:justify-between md:flex-row">
				<div className="flex flex-row items-center justify-between">
					<a
						href="#"
						className="text-lg font-medium text-gray-900 rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
					>
						Mockingbird
					</a>
					<button className="rounded-lg md:hidden focus:outline-none focus:shadow-outline">
						<svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
							<path
								x-show="!open"
								fillRule="evenodd"
								d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
								clipRule="evenodd"
							></path>
							<path
								x-show="open"
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							></path>
						</svg>
					</button>
				</div>

				<nav className="flex-col items-center flex-grow hidden gap-4 pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
					<Avatar
						className="flex items-center justify-center"
						// @ts-ignore
						icon={<UserOutlined />}
					/>
					<a
						className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent bg-gray-200 rounded-lg md:mt-0 md:ml-4text-gray-900 hover:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
						href="#"
					>
						Upgrade
					</a>
				</nav>
			</div>
		</div>
	);
}
