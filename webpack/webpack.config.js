module.exports = {
	devtool: 'eval-source-map',//配置生成Source Maps,选择合适的选项。参见：https://segmentfault.com/a/1190000006178770（入门 Webpack，看这篇就够了）
	entry: __dirname + "/app/main.js",
	output:{
		path:__dirname + "/public",
		filename:"bundle.js"
	},
	module: {
		loaders: [
		{
			test:/\.json$/,
			loader: "json"
		}
	  ]
	},
	devServer: {
		contentBase: "./public",//本地服务器所加载的页面所在的目录
		colors: true,
		port:9090,//<number>端口，不设置默认是8080
		historyApiFallback: true,//不跳转
		inline: true
	}
}