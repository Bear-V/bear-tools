import Layout from '../layouts/Base';
import About from '../views/About';
import ErrorPage from '../views/Error/404.jsx';
import Home from '../views/Home';

const route_list = [
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
        path: '/timestampTool',
        component: () => import('../views/Timestamp'),
        meta: {
          title: '时间戳工具',
        },
      },
      {
        path: '/baseHex',
        component: () => import('../views/BaseHex'),
        meta: {
          title: 'base64_hex',
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

export default route_list
