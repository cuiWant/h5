import Home from '@/pages/Home';
import AddContant from '../pages/addContact';
import ComponaryBook from '../pages/addContact/componaryBook';
import OutContact from '../pages/addContact/outContact';
import EnterPrisePart from '../pages/addContact/outContact/components/enterPrisePart';
import InfoRemind from '../pages/infoRemind'
// import { component } from 'vue/types/umd';

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
	},
	{
		path:'/addContact/outContact/enterPrisePart',
		component:EnterPrisePart
	},
	{
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
