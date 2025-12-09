const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (_, argv) => {
	const isDevelopment = argv.mode === "development";

	return {
		entry: "./src/index.js",

		output: {
			path: path.resolve(__dirname, "build"),
			filename: isDevelopment ? "bundle.js" : "[name].[contenthash].js",
			clean: true,
		},

		module: {
			rules: [
				{
					test: /\.html$/,
					use: ["html-loader"],
				},
				{
					test: /\.css$/,
					use: [isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
				},
				{
					test: /\.(png|svg|jpe?g|ico|gif|webp)$/i,
					type: "asset/resource",
					generator: {
						filename: "assets/images/[name].[contenthash][ext]",
					},
				},
				{
					test: /\.(woff(2)?|eot|ttf|otf)$/,
					type: "asset/resource",
					generator: {
						filename: "assets/fonts/[name].[contenthash][ext]",
					},
				},
			],
		},

		plugins: [
			new HtmlWebpackPlugin({
				template: "./src/index.html",
				filename: "index.html",
				favicon: "./src/assets/images/favicon-32x32.png",
				minify: !isDevelopment,
			}),
			new MiniCssExtractPlugin({
				filename: isDevelopment ? "[name].css" : "[name].[contenthash].css",
			}),
		],

		devtool: isDevelopment ? "inline-source-map" : false,

		devServer: {
			static: {
				directory: path.join(__dirname, "build"),
			},
			compress: true,
			port: 9000,
			open: true,
			hot: true,
		},
	};
};
