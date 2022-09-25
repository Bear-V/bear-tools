import Layout from '../layouts/Base';
import About from '../views/About';
import ErrorPage from '../views/Error/404.jsx';
import Home from '../views/Home';
import JsonTool from '../views/JsonTool/index.jsx';


export default [
  {
    path: '/',
    component: () => import('../layouts/Base'),
    element: Layout,
    children: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/home',
        component: () => import('../views/Home'),
        element: Home,
        meta: {
          title: '首页',
        },
      },
      {
        path: '/jsonTool',
        component: () => import('../views/JsonTool'),
        meta: {
          title: 'JSON工具',
        },
      },
      {
        path: '/about',
        component: () => import('../views/About'),
        element: About,
        meta: {
          title: '关于',
        },
      },
    ],
  },
  {
    path: '*',
    element: ErrorPage,
    meta: {
      title: '404',
    },
  },
];