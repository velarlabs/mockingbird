import type IForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const isDevelopment = true;

export const plugins = [
	new ForkTsCheckerWebpackPlugin({
		logger: "webpack-infrastructure",
	}),
	new MiniCssExtractPlugin({
		filename: isDevelopment ? "[name].css" : "[name].[hash].css",
		chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
	}),
];
