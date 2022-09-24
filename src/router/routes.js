export default [
  {
    path: '/',
    component: () => import('../layouts/Base'),
    children: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/home',
        component: () => import('../views/Home'),
        meta: {
          title: '首页',
        },
      },
      {
        path: '/about',
        component: () => import('../views/About'),
        meta: {
          title: '关于',
        },
      },
    ],
  },
  {
    path: '*',
    component: () => import('../views/Error/404'),
    meta: {
      title: '404',
    },
  },
];
