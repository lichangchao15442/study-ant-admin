
// ref: https://umijs.org/config/
export default {
  publicPath: 'https://cdn.antd-admin.zuiidea.com/',
  hash: true,
  ignoreMomentLocale: true,
  targets: {ie: 9},
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' }
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: false,
      title: 'flip-clock',
      dll: false,

      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  theme: './config/theme.config.js'

}
