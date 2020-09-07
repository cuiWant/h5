module.exports = {
	plugins: {
		autoprefixer: {},
		'postcss-px2rem-exclude': {
			remUnit: 75, // 这是rem适配的配置。注意：remUnit在这里要根据lib-flexible的规则来配制，如果您的设计稿是750px的，用75就刚刚好。
			exclude: /node_modules|folder_name/i
		}
	}
};
