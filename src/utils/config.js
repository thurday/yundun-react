module.exports = {
  siteName: '网络安全威胁智能检测平台',
  copyright: 'Yue Dun ©2019',
  logoPath: 'logo/logo@128.png',
  apiPrefix: 'http://192.168.3.110:7000/api',
  // apiPrefix: ip.url,
  // apiPrefix: 'http://47.92.131.30:7000/api',
  export:'http://192.168.3.110:7000/api',
  // export:ip.url,
  // export:'http://47.92.131.30:7000/api',
  // apiPrefix: './__mock__',
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/(\/(en|zh))*\/login|situation/],
    },
  ],

  /* I18n configuration, `languages` and `defaultLanguage` are required currently. */
  i18n: {
    /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
    languages: [
      {
        key: 'zh',
        title: '中文',
        flag: '/china.svg',
      },
    ],
    defaultLanguage: 'zh',
  },
}
