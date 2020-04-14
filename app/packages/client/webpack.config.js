const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const {
  SourceMapDevToolPlugin,
} = require("webpack");

const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackExcludeAssetsPlugin = require("html-webpack-exclude-assets-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

// config helpers:
const ensureArray = (config) => config && (Array.isArray(config) ? config : [config]) || [];
const when = (condition, config, negativeConfig) => condition ? ensureArray(config) : ensureArray(negativeConfig);

// primary config:
const outDir = path.resolve(__dirname, "dist");
const srcDir = path.resolve(__dirname, "src");
const nodeModulesDir = path.resolve(__dirname, "node_modules");
const baseUrl = "/";

module.exports = ({ production, version } = {}) => ({
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [`${srcDir}/app`, "node_modules"]
  },
  entry: {
    app: `${srcDir}/index.tsx`,
  },
  output: {
    path: outDir,
    publicPath: baseUrl,
    filename: production ? "[name].[chunkhash].bundle.js" : "[name].[hash].bundle.js",
    sourceMapFilename: production ? "[name].[chunkhash].bundle.map" : "[name].[hash].bundle.map",
    chunkFilename: production ? "[name].[chunkhash].chunk.js" : "[name].[hash].chunk.js"
  },
  mode: production ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.min\.css$/,
        issuer: /\.tsx$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader
        },
          'css-loader'
        ]
      },
      {
        test: /index\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        issuer: /\.tsx$/i
      },
      { test: /\.html$/i, loader: "html-loader" },
      { test: /\.tsx?$/i, loader: "ts-loader", exclude: nodeModulesDir },
      { test: /\.json$/i, loader: "json-loader" },
      { test: /\.(png|gif|jpg|cur)$/i, loader: "url-loader", options: { limit: 8192 } },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: "url-loader", options: { limit: 10000, mimetype: "application/font-woff2" } },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: "url-loader", options: { limit: 10000, mimetype: "application/font-woff" } },
      { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: "url-loader" }
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },

  plugins: [
    new DuplicatePackageCheckerPlugin(),
    new HtmlWebpackPlugin({
      template: `${srcDir}/index.ejs`,
      filename: 'index.html',
      version: version || "0.0.0.0"
    }),
    new HtmlWebpackExcludeAssetsPlugin(),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: [
        '!icons/**/*',
        '!img/**/*',
        '!vendor/**/*',
        '!webfonts/**/*'
      ]
    }),
    new MiniCssExtractPlugin({
      filename: production ? '[contenthash].css' : '[id].css',
      allChunks: true
    }),
    new CopyWebpackPlugin([{
      from: `${srcDir}/static`,
      to: outDir
    },
    { from: "./node_modules/react/umd/react.development.js", to: "./vendor/react.js" },
    { from: "./node_modules/react-dom/umd/react-dom.development.js", to: "./vendor/react-dom.js" },
    { from: "./node_modules/@fortawesome/fontawesome-free/css/all.min.css", to: "./vendor/fontawesome.css" },
    { from: "./node_modules/@fortawesome/fontawesome-free/webfonts", to: "./webfonts" },
    ]),
    ...when(!production, new SourceMapDevToolPlugin({
      filename: "[file].map"
    }))
  ]
});
