const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	entry: {
		bundle: ['./src/main.js']
	},
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				pathRewrite: {'^/api': ''}
			}
		},
		contentBase: path.join(__dirname, 'public'),
		port: 8080,
		host: `localhost`,
	},
		output: {
		path: __dirname + '/public',
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: true,
						hotReload: true,
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					!prod ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				exclude: '/images/',
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: '/fonts/'
						}
					}
				]
			},
			{
				test: /\.svg$/,
				exclude: '/fonts/',
				use: [
					{
						loader: 'svg-url-loader',
						options: {
							outputPath: '/images/'
						}
					}
				]
			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						attrs: [':data-src']
					}
				}
			}
		]
	},
	mode,
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: './public/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: !prod ? '[name].css' : '[name].[hash].css'
		}),
	],
	devtool: prod ? false: 'source-map'
};
