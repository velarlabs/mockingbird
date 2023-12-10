import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";

export const mainConfig: Configuration = {
	entry: "./src/index.ts",
	module: {
		rules,
	},
	target: 'electron-main',
	resolve: {
		extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
	},
	node: {
		__dirname: false,
	},
};
