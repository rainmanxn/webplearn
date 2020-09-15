const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, 'src'), //здесь лежат все исходники приложения
  mode: 'development',
  entry: {                                //входные точки
    main: './index.js',
    analytics: './analytics.js'
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),             //удаляет каждый раз файлы в паке dist
    new HTMLWebpackPlugin({        //подключает базоый HTML
      title: 'webpack Oleg',
      template: './index.html'
    })
  ],
  module: {                               //возможность работать вебпаку с другими типами файлов
    rules: [
      {
        test: /\.css$/,                         //если файлы своим расширением соответствуют данному паттерну, то мы говорим
        use: ['style-loader', 'css-loader']     //ему делать то, что в use (различные типы лоадеров)
      }                                         //css-loader читает импорты из index.js, style - добавляет стили из js в header html
    ]
  }
}
