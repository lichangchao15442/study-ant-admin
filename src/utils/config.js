module.exports = {
  siteName: 'AntD Admin',
  copyright: 'Ant Design Admin ©2020',
  logoPath: '/logo.svg',
  apiPrefix: '/api/v1',
  fixedHeader: true,
  layouts: [{
    name: 'primary', //布局名称
    include: [/.*/], // 指定使用该布局的路由规则，规则可为正则表达式或字符串
    exclude: [/(\/(en|zh))*\/login/] // 指定不使用该布局的路由规则，规则可为正则表达式或字符串
    // 注意： exclude的优先级要高于include，前面的布局优先级要高于后面的布局
  }],
  i18n: {
    languages: [
      {
        key: "pt-br",
        title: "Português",
        flag: "/portugal.svg"
      },
      {
        key: "en",
        title: "English",
        flag: "/america.svg"
      },
      {
        key: "zh",
        title: "中文",
        flag: "/china.svg"
      },
    ],
    defaultLanguage: 'en'
  }
}
