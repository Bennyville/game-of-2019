const path = require('path');

module.exports = {
    entry: './src/game.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'game.js',
    },
    module: {
        rules: [
            {test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/'},
            {test: /phaser\.js$/, loader: 'expose-loader?Phaser'}
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, './'),
        publicPath: '/dist/',
        host: '127.0.0.1',
        port: 8080,
        open: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            phaser: path.join(__dirname, '/node_modules/phaser/dist/phaser.js')
        }
    }
};
