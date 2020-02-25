// ref: https://umijs.org/config/
import { resolve } from 'path'
import { i18n } from './src/utils/config'
export default {
  publicPath: 'https://cdn.antd-admin.zuiidea.com/',
  hash: true,
  ignoreMomentLocale: true,
  targets: { ie: 9 },
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: { immer: true },
        dynamicImport: {
          webpackChunkName: true
        },
        // dll: {
        //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
        // },
        routes: {
          exclude: [/components\//],
          update: routes => {
            if (!i18n) return routes

            const newRoutes = []
            for (const item of routes[0].routes) {
              newRoutes.push(item)
              if (item.path) {
                newRoutes.push(
                  Object.assign({}, item, {
                    path:
                      `/:lang(${i18n.languages
                        .map(item => item.key)
                        .join('|')})` + item.path,
                  })
                )
              }
            }
            routes[0].routes = newRoutes
            // routes中包括国际化和未国际化的路由
            return routes
          },
        },
      },
    ],
  ],
  theme: './config/theme.config.js',
  alias: {
    api: resolve(__dirname, './src/services/'),
    components: resolve(__dirname, './src/components'),
    config: resolve(__dirname, './src/utils/config'),
    models: resolve(__dirname, './src/models'),
    themes: resolve(__dirname, './src/themes'),
    utils: resolve(__dirname, './src/utils'),
  },
  extraBabelPresets: ['@lingui/babel-preset-react'],
}
