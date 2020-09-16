const path = require('path');

module.exports = {
    entry: './src/script.js', // where to figure out what dependencies are needed and libraries
    output: {
        path: path.resolve(__dirname, 'public'), // The root directory to store output files in.
        filename: 'bundle.js', // The filename used for generated files.
        publicPath: '/', // What folder (prefix needed) webpack output is served from ex. ./foldername/bundle.js
    },
    devServer: {
        contentBase: './public'
    },
    module:{
        rules: [
            {
              test: /\.s[ac]ss$/i,
              use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
              ],
            },
          ]
    }
};
