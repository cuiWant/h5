import Home from '@/pages/Home';

export default [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/home',
		// redirect: './home'
		component: Home
	}
];
