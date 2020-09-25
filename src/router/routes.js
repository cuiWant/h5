import Home from '@/pages/Home';
import Login from '@/pages/Login';

import AddContant from '../pages/addContact';
import AllMeeting from '../pages/AllMeeting';
import ComponaryBook from '@/pages/addContact/componaryBook';
import OutContact from '../pages/addContact/outContact';
import EnterPrisePart from '../pages/addContact/outContact/components/enterPrisePart';
import InfoRemind from '../pages/infoRemind';
// import { component } from 'vue/types/umd';

import User from "@/pages/User"
import Entry from "@/pages/Entry"
import Room from "@/pages/Home/Room"
import Detail from "@/pages/Home/Detail"
import Replace from "@/pages/Home/Replace"
import Pattern from "@/pages/Home/Pattern"

import AllMeetingDetail from '@/pages/AllMeeting/Detail';

// const User = () => import('@/pages/User');
// const Entry = () => import('@/pages/Entry');
// const Room = () => import('@/pages/Home/Room');
// const Detail = () => import('@/pages/Home/Detail');
// const Replace = () => import('@/pages/Home/Replace');
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
		children:[
			{
				path:'/home/room',
				component:Room
			},
			{
				path:'/home/detail',
				component:Detail
			},
			{
				path:'/home/replace',
				component:Replace
			},
			{
				path:'/home/pattern',
				component:Pattern
			},
			{
				path: '/home/infoRemind',
				component: InfoRemind,
		
		
			},
			{
				path: '/home/addContact',
				component: AddContant,
				children:[
					{
						path:'/home/addContact/componaryBook',
						component:ComponaryBook,
					}
				]
			}
		]
	},
	{
		path: '/allmeeting',
		component: AllMeeting,
		children:[
			{
				name:'detail',
				path:'/allmeeting/detail',
				component:AllMeetingDetail
			}
		]
	},
	,
// {
// 	path:'/addContact/outContact',
// 	component:OutContact,
// },
// 	{
// 		path:'/addContact/outContact/enterPrisePart',
// 		component:EnterPrisePart
// 	},
// 	{
// 		path:'/addContact/componaryBook',
// 		component:ComponaryBook,
// 	},
// 	{
// 		path:'/infoRemind',
// 		component:InfoRemind,
// 	},
// 	{
// 		path: '/user',
// 		component: User,
// 	},
];
