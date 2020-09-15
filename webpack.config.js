const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'  //проверка на то, что находимся в режиме разработки
console.log('iDev', isDev)

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
  resolve: {
    extensions: ['.js', '.json', '.png'],
    alias: {
      '@models': path.resolve(__dirname, 'src/models'), //для указания импорта !!!import Post from '@models/Post'
      '@': path.resolve(__dirname, 'src'),
    }
  },
  optimization: {        //для оптимизации. Чтобы одна и так библиотека, используемая в разных файлах не дублировалась
    splitChunks: {
      chunks: "all"
    }
  },
  devServer: {           //сервер npm i -D webpack-dev-server
    port: 4200,
    hot: isDev
  },
  plugins: [
    new CleanWebpackPlugin(),             //удаляет каждый раз файлы в паке dist
    new HTMLWebpackPlugin({        //подключает базоый HTML
      title: 'webpack Oleg',
      template: './index.html'
    }),
    new CopyWebpackPlugin({        //для копирования файлов из одной папки в конечную dist
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    })
  ],
  module: {                               //возможность работать вебпаку с другими типами файлов
    rules: [
      {
        test: /\.css$/,                         //если файлы своим расширением соответствуют данному паттерну, то мы говорим
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev,
            reloadAll: true
          },
        }, 'css-loader']     //ему делать то, что в use (различные типы лоадеров)
      },                                         //css-loader читает импорты из index.js, style - добавляет стили из js в header html
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.csv$/,
        use: ['csv-loader']
      }
    ]
  }
}
