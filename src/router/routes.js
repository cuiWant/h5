import Home from '@/pages/Home';
import AddContant from '../pages/addContact';
import InfoRemind from '../pages/infoRemind'

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
		// children:[
		// 	{
		// 		path:'/home/addContant',
		// 		component:AddContant
		// 	}
		// ]
	},
	{
		path:'/addContact',
		component:AddContant,
	},
	{
		path:'/infoRemind',
		component:InfoRemind,
	},
	{
		path: '/user',
		component: User,
	},
];
