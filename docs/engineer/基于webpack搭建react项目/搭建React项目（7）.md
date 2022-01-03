---
title: 搭建 React 项目（7）

---

## 使用 antd

### 安装

```shell
yarn add antd
```

### 配置

仍然需要使用`babel-plugin-import`，不过在`v4`版本的介绍文档中没有该部分说明了，需要到`v3`版本找 —— [antd@v3 - 高级配置](https://3x.ant.design/docs/react/use-in-typescript-cn#%E9%AB%98%E7%BA%A7%E9%85%8D%E7%BD%AE)

```shell
yarn add babel-plugin-import -D
```

只安装`babel-plugin-import`是不够的，还需要安装`less`和`less-loader`

```shell
yarn add less less-loader -D
```

安装完了以后，配置分为以下两步：

- 在`babel-loader`的`plugin`配置项中配置`babel-plugin-import`

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          plugins: [
            [
              'import',
              {
                libraryName: 'antd',
                style: true,
              },
            ],
          ],
        },
      },
    ],
  },
};
```

- 配置`less-loader`

如果项目中遇到下面这个错误，就是因为没有安装`less-loader`

![image-20201011171119950](../../../public/images/image-20201011171119950-164113776531531.png)

`less`的处理需要至少三个相关`loader`，也就是下面这种配置顺序

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          isDevelopment && {
            loader: 'style-loader',
          },
          isProduction && {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              publicPath: '../../',
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
};
```

对于项目中自己写的`less`和 antd 中的`less`需要分开配置`less-loader`，即

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/, // 项目开发时自己写的less
        use: [
          isDevelopment && {
            loader: 'style-loader',
          },
          isProduction && {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              publicPath: '../../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: {
                localIdentName: isDevelopment
                  ? '[path][name]__[local]'
                  : '[hash:base64]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-flexbugs-fixes',
                  'autoprefixer',
                  'postcss-preset-env',
                  [
                    '@fullhuman/postcss-purgecss',
                    {
                      content: [
                        path.join(__dirname, './public/index.html'),
                        ...glob.sync(
                          `${path.join(__dirname, 'src')}/**/*.jsx`,
                          {
                            nodir: true,
                          },
                        ),
                      ],
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                paths: [path.resolve(__dirname, 'src')],
              },
            },
          },
        ].filter(Boolean),
      },
      {
        test: /\.less$/,
        include: /node_modules/, // antd的less
        use: [
          isDevelopment && {
            loader: 'style-loader',
          },
          isProduction && {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              publicPath: '../../',
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ].filter(Boolean),
      },
    ],
  },
};
```

这是因为，webpack 4 以后多数配置会在`css-loader`中开启 CSS Module 的配置，也就是像下面这样，这个配置默认也会把 antd 的 CSS 文件名进行 hash 改写，所以在项目中引入`antd`组件后，样式就不会生效了；但是又不能通过`exclude`直接排除`node_modules`文件夹，那样 antd 的样式还是找不到，所以就得分开配置

```javascript
{
  loader: "css-loader",
    options: {
      esModule: true,
        modules: {
          localIdentName: isDevelopment
            ? "[path][name]__[local]"
          : "[hash:base64]",
        },
    },
}
```

还有一个需要注意的点是对于 antd 的`less`，`les-loader`需要额外配置`javascriptEnabled: true`这个配置项，如果出现像下面这样的错误，就说明没配置正确。并且`less-loader`的`v5`版本和`v6+`版本以后的配置方式也不一样，`v5`版本是直接在`options`中配置，而`v6+`版本以后是在`options.lessOptions`中配置

```javascript
// v5版本
{
  loader: "less-loader",
  options: {
    javascriptEnabled: true,
  },
},

// v6+版本
{
  loader: "less-loader",
  options: {
    lessOptions: {
      javascriptEnabled: true,
    },
  },
},
```

![image-20201011172422043](../../../public/images/image-20201011172422043-164113776530430.png)