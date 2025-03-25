import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { AngularWebpackPlugin } from "@ngtools/webpack";
import "@angular/compiler";

export default {
  mode: 'development', 
  entry: './src/main.ts',
  output: {
    path: path.resolve('dist'),
    filename: 'app.js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        // use: 'ts-loader',
        loader: '@ngtools/webpack',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: [
            {
                loader: 'source-map-loader'
            }
        ],
        enforce: 'pre',
        exclude: /node_modules/,
    },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.css$/,
        // use: ['raw-loader'],
        type: 'asset/source',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new AngularWebpackPlugin({
        tsconfig: './tsconfig.spec.json',
    })
  ],
  devServer: {
    static: {
      directory: path.join(process.cwd(), 'dist'),
    },
    port: 4200,
    open: true,
    hot: true,
  },
};