const path = require('path')
const webpack = require('webpack');
module.exports = {
  //entry는 bundle의 목적에 따라 바뀔 수 있음. 사이트 하나에 하나의 bundle.js만 사용할게 아니라면 페이지에 따라 얼마든지 바뀔 수 있음
  entry: path.join(__dirname,'src/app.js'),
  output: {
    path: path.join(__dirname,'dist'),
    filename:'bundle.js'
  },
  devtool:'inline-source-map',
  module:{
    rules:[
      {  test: /.js$/, loader: 'babel-loader', options: {presets:['es2015','react']}  },
      {test: /\.css$/, loader:'style-loader'},
      { test: /\.css$/, loader: 'css-loader' ,options:{modules:true,localIdentName: "[name]__[local]___[hash:base64:5]" }}
    ]
  }
  /*
  ,plugins: [
    new webpack.DefinePlugin({ //<--key to reduce React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
  */
}