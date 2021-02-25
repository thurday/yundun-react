import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__index" */ '../../layouts/index.js'),
          LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
            .default,
        })
      : require('../../layouts/index.js').default,
    routes: [
      {
        path: '/404',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../404.js').default,
      },
      {
        path: '/:lang(zh)/404',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../404.js').default,
      },
      {
        path: '/dashboard',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__dashboard__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/dashboard/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__dashboard__index" */ '../dashboard/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../dashboard/index.js').default,
      },
      {
        path: '/:lang(zh)/dashboard',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__dashboard__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/dashboard/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__dashboard__index" */ '../dashboard/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../dashboard/index.js').default,
      },
      {
        path: '/event/exportExcel',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__event__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/event/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__event__exportExcel" */ '../event/exportExcel.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../event/exportExcel.js').default,
      },
      {
        path: '/:lang(zh)/event/exportExcel',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__event__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/event/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__event__exportExcel" */ '../event/exportExcel.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../event/exportExcel.js').default,
      },
      {
        path: '/event',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__event__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/event/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__event__index" */ '../event/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../event/index.js').default,
      },
      {
        path: '/:lang(zh)/event',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__event__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/event/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__event__index" */ '../event/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../event/index.js').default,
      },
      {
        path: '/',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__index" */ '../index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../index.js').default,
      },
      {
        path: '/:lang(zh)/',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__index" */ '../index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../index.js').default,
      },
      {
        path: '/login',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__login__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/login/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__login__index" */ '../login/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../login/index.js').default,
      },
      {
        path: '/:lang(zh)/login',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__login__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/login/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__login__index" */ '../login/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../login/index.js').default,
      },
      {
        path: '/loophole/assetbug',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__loophole__assetbug__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/loophole/assetbug/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__loophole__assetbug__index" */ '../loophole/assetbug/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../loophole/assetbug/index.js').default,
      },
      {
        path: '/:lang(zh)/loophole/assetbug',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__loophole__assetbug__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/loophole/assetbug/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__loophole__assetbug__index" */ '../loophole/assetbug/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../loophole/assetbug/index.js').default,
      },
      {
        path: '/loophole/check',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__loophole__check__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/loophole/check/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__loophole__check__index" */ '../loophole/check/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../loophole/check/index.js').default,
      },
      {
        path: '/:lang(zh)/loophole/check',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__loophole__check__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/loophole/check/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__loophole__check__index" */ '../loophole/check/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../loophole/check/index.js').default,
      },
      {
        path: '/loophole/report',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__loophole__report__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/loophole/report/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__loophole__report__index" */ '../loophole/report/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../loophole/report/index.js').default,
      },
      {
        path: '/:lang(zh)/loophole/report',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__loophole__report__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/loophole/report/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__loophole__report__index" */ '../loophole/report/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../loophole/report/index.js').default,
      },
      {
        path: '/protect/blocking',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__protect__blocking__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/protect/blocking/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__protect__blocking__index" */ '../protect/blocking/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../protect/blocking/index.js').default,
      },
      {
        path: '/:lang(zh)/protect/blocking',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__protect__blocking__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/protect/blocking/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__protect__blocking__index" */ '../protect/blocking/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../protect/blocking/index.js').default,
      },
      {
        path: '/protect/ip',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__protect__ip__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/protect/ip/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__protect__ip__index" */ '../protect/ip/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../protect/ip/index.js').default,
      },
      {
        path: '/:lang(zh)/protect/ip',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__protect__ip__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/protect/ip/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__protect__ip__index" */ '../protect/ip/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../protect/ip/index.js').default,
      },
      {
        path: '/report',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__report__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/report/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__report__index" */ '../report/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../report/index.js').default,
      },
      {
        path: '/:lang(zh)/report',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__report__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/report/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__report__index" */ '../report/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../report/index.js').default,
      },
      {
        path: '/situation',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__situation__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/situation/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__situation__index" */ '../situation/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../situation/index.js').default,
      },
      {
        path: '/:lang(zh)/situation',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__situation__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/situation/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__situation__index" */ '../situation/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../situation/index.js').default,
      },
      {
        path: '/system/distribut',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__system__distribut__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/system/distribut/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__system__distribut__index" */ '../system/distribut/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../system/distribut/index.js').default,
      },
      {
        path: '/:lang(zh)/system/distribut',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__system__distribut__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/system/distribut/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__system__distribut__index" */ '../system/distribut/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../system/distribut/index.js').default,
      },
      {
        path: '/system/firewall',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__system__firewall__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/system/firewall/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__system__firewall__index" */ '../system/firewall/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../system/firewall/index.js').default,
      },
      {
        path: '/:lang(zh)/system/firewall',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__system__firewall__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/system/firewall/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__system__firewall__index" */ '../system/firewall/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../system/firewall/index.js').default,
      },
      {
        path: '/system/network',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__system__network__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/system/network/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__system__network__index" */ '../system/network/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../system/network/index.js').default,
      },
      {
        path: '/:lang(zh)/system/network',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__system__network__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/system/network/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__system__network__index" */ '../system/network/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../system/network/index.js').default,
      },
      {
        path: '/system/replay',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__system__replay__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/system/replay/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__system__replay__index" */ '../system/replay/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../system/replay/index.js').default,
      },
      {
        path: '/:lang(zh)/system/replay',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__system__replay__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/system/replay/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__system__replay__index" */ '../system/replay/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../system/replay/index.js').default,
      },
      {
        path: '/system/status',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__system__status__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/system/status/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__system__status__index" */ '../system/status/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../system/status/index.js').default,
      },
      {
        path: '/:lang(zh)/system/status',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__system__status__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/system/status/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__system__status__index" */ '../system/status/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../system/status/index.js').default,
      },
      {
        path: '/system/statusForCao',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__system__statusForCao__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/system/statusForCao/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__system__statusForCao__index" */ '../system/statusForCao/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../system/statusForCao/index.js').default,
      },
      {
        path: '/:lang(zh)/system/statusForCao',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__system__statusForCao__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/system/statusForCao/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__system__statusForCao__index" */ '../system/statusForCao/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../system/statusForCao/index.js').default,
      },
      {
        path: '/system/user',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__system__user__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/system/user/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__system__user__index" */ '../system/user/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../system/user/index.js').default,
      },
      {
        path: '/:lang(zh)/system/user',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__system__user__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/system/user/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__system__user__index" */ '../system/user/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../system/user/index.js').default,
      },
      {
        path: '/system/warn',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__system__warn__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/system/warn/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__system__warn__index" */ '../system/warn/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../system/warn/index.js').default,
      },
      {
        path: '/:lang(zh)/system/warn',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__system__warn__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/system/warn/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__system__warn__index" */ '../system/warn/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../system/warn/index.js').default,
      },
      {
        path: '/tactic/exception',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__tactic__exception__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/tactic/exception/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__tactic__exception__index" */ '../tactic/exception/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../tactic/exception/index.js').default,
      },
      {
        path: '/:lang(zh)/tactic/exception',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__tactic__exception__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/tactic/exception/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__tactic__exception__index" */ '../tactic/exception/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../tactic/exception/index.js').default,
      },
      {
        path: '/tactic/filter',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__tactic__filter__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/tactic/filter/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__tactic__filter__index" */ '../tactic/filter/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../tactic/filter/index.js').default,
      },
      {
        path: '/:lang(zh)/tactic/filter',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__tactic__filter__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/tactic/filter/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__tactic__filter__index" */ '../tactic/filter/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../tactic/filter/index.js').default,
      },
      {
        path: '/tactic/protocol',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__tactic__protocol__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/tactic/protocol/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__tactic__protocol__index" */ '../tactic/protocol/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../tactic/protocol/index.js').default,
      },
      {
        path: '/:lang(zh)/tactic/protocol',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__tactic__protocol__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/tactic/protocol/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__tactic__protocol__index" */ '../tactic/protocol/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../tactic/protocol/index.js').default,
      },
      {
        path: '/tactic/response',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__tactic__response__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/tactic/response/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__tactic__response__index" */ '../tactic/response/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../tactic/response/index.js').default,
      },
      {
        path: '/:lang(zh)/tactic/response',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__tactic__response__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/tactic/response/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__tactic__response__index" */ '../tactic/response/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../tactic/response/index.js').default,
      },
      {
        path: '/tactic/strategy',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__tactic__strategy__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/tactic/strategy/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__tactic__strategy__index" */ '../tactic/strategy/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../tactic/strategy/index.js').default,
      },
      {
        path: '/:lang(zh)/tactic/strategy',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__tactic__strategy__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/tactic/strategy/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__tactic__strategy__index" */ '../tactic/strategy/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../tactic/strategy/index.js').default,
      },
      {
        path: '/tactic/stress',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__tactic__stress__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/tactic/stress/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__tactic__stress__index" */ '../tactic/stress/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../tactic/stress/index.js').default,
      },
      {
        path: '/:lang(zh)/tactic/stress',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__tactic__stress__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/tactic/stress/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__tactic__stress__index" */ '../tactic/stress/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../tactic/stress/index.js').default,
      },
      {
        path: '/tactic/system',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__tactic__system__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/tactic/system/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__tactic__system__index" */ '../tactic/system/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../tactic/system/index.js').default,
      },
      {
        path: '/:lang(zh)/tactic/system',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__tactic__system__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/tactic/system/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__tactic__system__index" */ '../tactic/system/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../tactic/system/index.js').default,
      },
      {
        path: '/tactic/user',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__tactic__user__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/tactic/user/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__tactic__user__index" */ '../tactic/user/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../tactic/user/index.js').default,
      },
      {
        path: '/:lang(zh)/tactic/user',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__tactic__user__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/tactic/user/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__tactic__user__index" */ '../tactic/user/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../tactic/user/index.js').default,
      },
      {
        path: '/tactic/whitelist',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__tactic__whitelist__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/tactic/whitelist/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__tactic__whitelist__index" */ '../tactic/whitelist/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../tactic/whitelist/index.js').default,
      },
      {
        path: '/:lang(zh)/tactic/whitelist',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__tactic__whitelist__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/tactic/whitelist/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__tactic__whitelist__index" */ '../tactic/whitelist/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../tactic/whitelist/index.js').default,
      },
      {
        path: '/user/changePwd',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__user__changePwd__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/user/changePwd/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__user__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/user/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__user__changePwd__index" */ '../user/changePwd/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../user/changePwd/index.js').default,
      },
      {
        path: '/:lang(zh)/user/changePwd',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__user__changePwd__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/user/changePwd/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__user__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/user/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__user__changePwd__index" */ '../user/changePwd/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../user/changePwd/index.js').default,
      },
      {
        path: '/user',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__user__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/user/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__user__index" */ '../user/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../user/index.js').default,
      },
      {
        path: '/:lang(zh)/user',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__user__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/user/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__user__index" */ '../user/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../user/index.js').default,
      },
      {
        path: '/user/userCenter',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__user__userCenter__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/user/userCenter/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__user__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/user/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__user__userCenter__index" */ '../user/userCenter/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../user/userCenter/index.js').default,
      },
      {
        path: '/:lang(zh)/user/userCenter',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__user__userCenter__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/user/userCenter/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__user__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/user/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__user__userCenter__index" */ '../user/userCenter/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../user/userCenter/index.js').default,
      },
      {
        path: '/user/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__user__$id__models__detail.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/user/$id/models/detail.js').then(
                  m => {
                    return { namespace: 'detail', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__user__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/user/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__user___id__index" */ '../user/$id/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../user/$id/index.js').default,
      },
      {
        path: '/:lang(zh)/user/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__user__$id__models__detail.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/user/$id/models/detail.js').then(
                  m => {
                    return { namespace: 'detail', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__user__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/user/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__user___id__index" */ '../user/$id/index.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../user/$id/index.js').default,
      },
      {
        path: '/assets',
        exact: false,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__assets___layout" */ '../assets/_layout.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../assets/_layout.js').default,
        routes: [
          {
            path: '/assets/case',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__assets__case__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/assets/case/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/case/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/case/index.js').default,
          },
          {
            path: '/:lang(zh)/assets/case',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__assets__case__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/assets/case/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/case/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/case/index.js').default,
          },
          {
            path: '/assets/domain',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__assets__domain__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/assets/domain/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/domain/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/domain/index.js').default,
          },
          {
            path: '/:lang(zh)/assets/domain',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__assets__domain__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/assets/domain/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/domain/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/domain/index.js').default,
          },
          {
            path: '/assets/group',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__assets__group__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/assets/group/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/group/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/group/index.js').default,
          },
          {
            path: '/:lang(zh)/assets/group',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__assets__group__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/assets/group/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/group/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/group/index.js').default,
          },
          {
            path: '/assets',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/index.js').default,
          },
          {
            path: '/:lang(zh)/assets',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/index.js').default,
          },
          {
            path: '/assets/ip',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__assets__ip__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/assets/ip/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/ip/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/ip/index.js').default,
          },
          {
            path: '/:lang(zh)/assets/ip',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__assets__ip__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/assets/ip/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/ip/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/ip/index.js').default,
          },
          {
            path: '/assets/netset',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__assets__netset__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/assets/netset/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/netset/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/netset/index.js').default,
          },
          {
            path: '/:lang(zh)/assets/netset',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__assets__netset__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/assets/netset/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/netset/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/netset/index.js').default,
          },
          {
            component: () =>
              React.createElement(
                require('D:/yayaEva/yayaEva/yuedun/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: false },
              ),
          },
        ],
      },
      {
        path: '/:lang(zh)/assets',
        exact: false,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__assets___layout" */ '../assets/_layout.js'),
              LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                .default,
            })
          : require('../assets/_layout.js').default,
        routes: [
          {
            path: '/assets/case',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__assets__case__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/assets/case/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/case/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/case/index.js').default,
          },
          {
            path: '/:lang(zh)/assets/case',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__assets__case__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/assets/case/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/case/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/case/index.js').default,
          },
          {
            path: '/assets/domain',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__assets__domain__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/assets/domain/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/domain/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/domain/index.js').default,
          },
          {
            path: '/:lang(zh)/assets/domain',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__assets__domain__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/assets/domain/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/domain/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/domain/index.js').default,
          },
          {
            path: '/assets/group',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__assets__group__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/assets/group/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/group/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/group/index.js').default,
          },
          {
            path: '/:lang(zh)/assets/group',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__assets__group__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/assets/group/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/group/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/group/index.js').default,
          },
          {
            path: '/assets',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/index.js').default,
          },
          {
            path: '/:lang(zh)/assets',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/index.js').default,
          },
          {
            path: '/assets/ip',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__assets__ip__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/assets/ip/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/ip/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/ip/index.js').default,
          },
          {
            path: '/:lang(zh)/assets/ip',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__assets__ip__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/assets/ip/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/ip/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/ip/index.js').default,
          },
          {
            path: '/assets/netset',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__assets__netset__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/assets/netset/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/netset/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/netset/index.js').default,
          },
          {
            path: '/:lang(zh)/assets/netset',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__assets__netset__model.js' */ 'D:/yayaEva/yayaEva/yuedun/src/pages/assets/netset/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__assets___layout" */ '../assets/netset/index.js'),
                  LoadingComponent: require('D:/yayaEva/yayaEva/yuedun/src/components/Loader/Loader')
                    .default,
                })
              : require('../assets/netset/index.js').default,
          },
          {
            component: () =>
              React.createElement(
                require('D:/yayaEva/yayaEva/yuedun/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: false },
              ),
          },
        ],
      },
      {
        component: () =>
          React.createElement(
            require('D:/yayaEva/yayaEva/yuedun/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: false },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('D:/yayaEva/yayaEva/yuedun/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: false },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
