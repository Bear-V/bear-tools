import Layout from '../layouts/base';

const route_list = [
  {
    path: '/',
    component: () => import('../layouts/base'),
    element: Layout,
    children: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        component: () => import('../views/Home'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/jsonTool',
        component: () => import('../views/JsonTool'),
        meta: {
          title: 'JSON工具'
        }
      },
      {
        path: '/randomPassword',
        component: () => import('../views/RandomPassword'),
        meta: {
          title: '随机密码'
        }
      },
      {
        path: '/timestampTool',
        component: () => import('../views/Timestamp'),
        meta: {
          title: '时间戳工具'
        }
      },
      {
        path: '/base64String',
        component: () => import('../views/Base64String'),
        meta: {
          title: 'base64_string'
        }
      },
      {
        path: '/base64Hex',
        component: () => import('../views/Base64Hex'),
        meta: {
          title: 'base64_hex'
        }
      },
      {
        path: '/jwt',
        component: () => import('../views/JWT'),
        meta: {
          title: 'JWT'
        }
      },
      {
        path: '/cidr',
        component: () => import('../views/CIDR'),
        meta: {
          title: 'CIDR'
        }
      },
      {
        path: '/urlParse',
        component: () => import('../views/urlParse'),
        meta: {
          title: 'url解析'
        }
      }
    ]
  },
  {
    path: '/about',
    component: () => import('../views/about'),
    meta: {
      title: '关于'
    }
  },
  {
    path: '*',
    component: () => import('../views/404'),
    meta: {
      title: '404'
    }
  }
];

export default route_list;
