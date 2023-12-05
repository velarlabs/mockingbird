import type { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const isDevelopment = true;

export const rules: Required<ModuleOptions>["rules"] = [
	// Add support for native node modules
	{
		// We're specifying native_modules in the test because the asset relocator loader generates a
		// "fake" .node file which is really a cjs file.
		test: /native_modules[/\\].+\.node$/,
		use: "node-loader",
	},
	{
		test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
		parser: { amd: false },
		use: {
			loader: "@vercel/webpack-asset-relocator-loader",
			options: {
				outputAssetBase: "native_modules",
			},
		},
	},
	{
		test: /\.tsx?$/,
		exclude: /(node_modules|\.webpack)/,
		use: {
			loader: "ts-loader",
			options: {
				transpileOnly: true,
			},
		},
	},
	{
		test: /\.css$/,
		use: [{ loader: "style-loader" }, { loader: "css-loader" }],
	},
	{
		test: /\.module\.s(a|c)ss$/,
		use: [
			{ loader: isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader },
			{
				loader: "css-loader",
				options: {
					modules: true,
					sourceMap: isDevelopment,
				},
			},
			{
				loader: "sass-loader",
				options: {
					sourceMap: isDevelopment,
				},
			},
		],
	},
	{
		test: /\.s(a|c)ss$/,
		use: [
			{ loader: isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader },
			{
				loader: "css-loader",
				options: {
					modules: true,
					sourceMap: isDevelopment,
				},
			},
			{
				loader: "sass-loader",
				options: {
					sourceMap: isDevelopment,
				},
			},
		],
	},
];
