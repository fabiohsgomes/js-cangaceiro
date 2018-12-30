const path = require('path');
const webpack = require('webpack');

const babiliPlugin = require('babili-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const htmlWebPackPlugin = require('html-webpack-plugin');

let plugins = [];
plugins.push(new htmlWebPackPlugin({
    hash:true,
    minify:{
        html5:true,
        collapseWhitespace:true,
        removeComments:true,
    },
    filename:'index.html',
    template:__dirname + '/main.html',
}));
plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name:'vendor',
    filename:'vendor.bundle.js'
}));
plugins.push(new extractTextPlugin('styles.css'));
plugins.push(new webpack.ProvidePlugin({
    $: "jquery",
    jquery: "jquery/dist/jquery.js",
    "window.jQuery": "jquery/dist/jquery.js",
    jQuery:"jquery/dist/jquery.js"
}));

if(process.env.NODE_ENV=='production'){
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

    plugins.push(new babiliPlugin());

    plugins.push(new optimizeCSSAssetsPlugin({
        cssProcessor:require('cssnano'),
        cssProcessorOptions:{
            discardComments:{
                removeAll:true
            }
        },
        canPrint:true
    }));
}

module.exports = {
    entry:{
        app:'./app-src/index.js',
        vendor:['jquery','bootstrap','reflect-metadata']
    },
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist'),
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test:/\.css$/,
                use:extractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader'
                })
            },
            {
                test:/\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader:'url-loader?limit=1000&mimetype=application/font-woff'
            },
            {
                test:/\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader:'url-loader?limit=1000&mimetype=application/octet-stream'
            },
            {
                test:/\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader:'file-loader'
            },
            {
                test:/\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader:'url-loader?limit=1000&mimetype=image/svg+xml'
            }
        ]
    },
    plugins,
    devServer:{
        noInfo:true
    }
};