import Home from '@/pages/Home';
import AddContant from '../pages/addContact';
import InfoRemind from '../pages/infoRemind'
export default [
	{
		path: '/',
		redirect: '/home'
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
];
