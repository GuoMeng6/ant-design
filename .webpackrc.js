const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  "define": {
    "process.iotbaseApi": JSON.parse(process.env.WEWORK)[process.env.ENV].iotbaseApi,
    "process.weworkApi": JSON.parse(process.env.WEWORK)[process.env.ENV].weworkApi,
  },
  externals: {
    '@antv/data-set': 'DataSet',
    rollbar: 'rollbar',
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableDynamicImport: false,
  publicPath: JSON.parse(process.env.WEWORK)[process.env.ENV].publicPath,
  hash: true,
};
