import React from 'react';
import {Navigate, useRoutes} from 'react-router-dom';
import routes from './routes.js';

export default function Routes() {
  return useRoutes(renderRoutes(routes));
}

function renderRoutes(routes) {
  let a = routes.map(item => {
    let res = {...item};
    if (item.path) {
      if (item.element) {
        const Component = item.element;
        res.element = (
          <BeforeEach route={item}>
            <Component />
          </BeforeEach>
        );
      }

      if (!res.element && item.component) {
        const Component = React.lazy(item.component);
        res.element = (
          <React.Suspense fallback={null}>
            <BeforeEach route={item}>
              <Component />
            </BeforeEach>
          </React.Suspense>
        );
      }

      // children
      if (item.children) {
        res.children = renderRoutes(item.children);
      }

      // 重定向
      if (item.redirect) {
        res.element = <Navigate to={item.redirect} replace />;
      }

      return res;
    }
    return item;
  });
  console.log(a)
  return a
}

function BeforeEach({route, children}) {
  if (route && route.meta && route.meta.title) {
    document.title = route.meta.title;
  }
//  if (route && route.meta && route.meta.needLogin) {
//    // 看是否登录
//    // const navigate = useNavigate();
//    // navigate('/login');
//  }

  return route.children ? <div className="flex">{children}</div> : children
}
