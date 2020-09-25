import { Toast } from 'vant';
function init(time = 0) {
	Toast.setDefaultOptions({ duration: time });
}

function close(bool) {
	Toast.clear();
	init(500);
	bool === true ? Toast.success('操作成功') : bool === false ? Toast.fail('网络异常') : void 0;
}

function show() {
	init(...arguments);
	Toast.loading({
		message: '加载中...',
		forbidClick: true,
		loadingType: 'spinner',
		overlay: true,
	});
}
export default {
	show,
	close,
};
