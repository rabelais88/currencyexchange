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
      {
        //지정한 entry로 연결된 모든 .js파일에 babel-loader를 적용한다는 뜻임
        //babel의 경우 여러가지 preset들이 존재하므로 거기에 맞는 preset을 설정해 준것임
        //react의 경우 묶기만 하고 별도로 react를 건드리는것은 아니기 때문에, babel에게 react라는것만 알려주면 되는 것임
        test: /.js$/, loader: 'babel-loader', options: {presets:['es2015','react']}
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ //<--key to reduce React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ]
}