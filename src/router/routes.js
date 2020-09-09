import Home from '@/pages/Home';
import AddContant from '../pages/addContact';
import ComponaryBook from '../pages/addContact/componaryBook';
import OutContact from '../pages/addContact/outContact';
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
		path:'/addContact/outContact',
		component:OutContact,
	},{
		path:'/addContact/componaryBook',
		component:ComponaryBook,
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
