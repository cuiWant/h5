import Home from '@/pages/Home';
import Login from '@/pages/Login';

import AddContant from '../pages/addContact';
import InfoRemind from '../pages/infoRemind';

const User = () => import('@/pages/User');
const Entry = () => import('@/pages/Entry');
export default [
	{
		path: '/',
		redirect: '/login',
	},
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/entry',
		component: Entry,
	},
	{
		path: '/home',
		// redirect: './home'
		component: Home,
		// children:[
		// 	{
		// 		path:'/home/addContant',
		// 		component:AddContant
		// 	}
		// ]
	},
	{
		path: '/addContact',
		component: AddContant,
	},
	{
		path: '/infoRemind',
		component: InfoRemind,
	},
	{
		path: '/user',
		component: User,
	},
];
