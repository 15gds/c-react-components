import { defineConfig } from 'dumi';
// const CompressionPlugin = require("compression-webpack-plugin");

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';

export default defineConfig({
  title: 'c-react-components',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  //设置别名
  alias: {
    src: './src',
  },
  define: {
    'process.env.BASE_URL': isProd ? '/c-react-components/' : '/',
  },
  base: '/c-react-components/',
  publicPath: '/c-react-components/',
  apiParser: {
    propFilter: {
      // 是否忽略从 node_modules 继承的属性，默认值为 false
      skipNodeModules: true,
      // 需要忽略的属性名列表，默认为空数组
      skipPropsWithName: [],
      // 是否忽略没有文档说明的属性，默认值为 false
      skipPropsWithoutDoc: false,
    },
  },
  //在生产环境中取消console
  extraBabelPlugins: isProd && ['transform-remove-console'],
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed',
  },
  chainWebpack: function (config, { webpack }) {
    config.module
      .rule('fbx')
      .test(/\.(fbx)$/)
      .use()
      .loader('url-loader')
      .end();
  },
  // chainWebpack: function (config, { webpack }) {
  //   config.merge({
  //     optimization: {
  //       splitChunks: {
  //         chunks: 'async',
  //         minSize: 30000,
  //         minChunks: 2,
  //         automaticNameDelimiter: '.',
  //         cacheGroups: {
  //           react: {
  //             name: 'react',
  //             priority: 20,
  //             test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router)[\\/]/,
  //           },
  //           echarts: {
  //             name: 'echarts',
  //             chunks: 'async',
  //             test: /[\\/]node_modules[\\/](echarts|zrender)[\\/]/,
  //             priority: 10,
  //             enforce: true,
  //           },
  //           antdesigns: {
  //             name: 'antdesigns',
  //             chunks: 'all',
  //             test: /[\\/]node_modules[\\/](antd|@ant-design|antd-mobile)/,
  //             priority: 10,
  //             enforce: true,
  //           },
  //           // antv: {
  //           //   name: 'antv',
  //           //   chunks: 'all',
  //           //   test: /[\\/]node_modules[\\/](@antv)[\\/]/,
  //           //   priority: 10,
  //           //   enforce: true,
  //           // },
  //           lodash: {
  //             name: 'lodash',
  //             test: /[\\/]node_modules[\\/]lodash[\\/]/,
  //             priority: -2,
  //             enforce: true,
  //           },
  //           vendors: {
  //             name: 'vendors',
  //             test({ resource }: any) {
  //               return /[\\/]node_modules[\\/]/.test(resource)
  //             },
  //             priority: -11,
  //             enforce: true,
  //           },
  //         },
  //       },
  //     },
  //   });

  //   //在生产环境开启gzip压缩
  //   // if (isProd) {
  //     // Gzip压缩
  //     // config.plugin('compression-webpack-plugin').use(CompressionPlugin, [
  //     //   {
  //     //     test: /\.(js|css|html)$/i, // 匹配
  //     //     threshold: 10240, // 超过10k的文件压缩
  //     //     deleteOriginalAssets: false, // 不删除源文件
  //     //   },
  //     // ]);
  //   }
  // },
  // more config: https://d.umijs.org/config
});
