import Home from '@/pages/Home';

const User = () => import('@/pages/User');
export default [
	{
		path: '/',
		redirect: '/home',
	},
	{
		path: '/home',
		// redirect: './home'
		component: Home,
	},
	{
		path: '/user',
		component: User,
	},
];
