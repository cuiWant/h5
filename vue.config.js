const path = require('path'); //引入path模块
function resolve(dir) {
	return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}

module.exports = {
	chainWebpack: config => {
		config.resolve.alias.set('@', resolve('./src')).set('components', resolve('./pubulic'));
		//set第一个参数：设置的别名，第二个参数：设置的路径
	},
	devServer: {
		proxy: {
			// '/api': {
			// 	//这里最好有一个 /
			// 	target: 'http://172.16.16.9', // 后台接口域名
			// 	//ws: true,        //如果要代理 websockets，配置这个参数
			// 	// secure: false, // 如果是https接口，需要配置这个参数
			// 	changeOrigin: true, //是否跨域
			// 	pathRewrite: {
			// 		// '^/api': ''
			// 	}
			// },
			// '/api': {
			// target: 'http://127.0.0.1:12347',
			// changeOrigin: true,		
			// },
			'/api': {
				target: 'http://139.196.140.161:12347',
				changeOrigin: true,		
				},
			// '/api': {
			// 	//这里最好有一个 /
			// 	target: 'http://localhost:4000', // 后台接口域名
			// 	//ws: true,        //如果要代理 websockets，配置这个参数
			// 	// secure: false, // 如果是https接口，需要配置这个参数
			// 	changeOrigin: true, //是否跨域
			// 	pathRewrite: {
			// 		'^/api': ''
			// 	}
			// },
			// '/soket.io': {
			// 	target: 'http://localhost:4000', // 后台接口域名
			// 	changeOrigin: true, //是否跨域
			// 	ws: true
			// }
		}
	}
};
