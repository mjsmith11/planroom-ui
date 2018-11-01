module.exports = {
  lintOnSave: undefined,
  configureWebpack: {
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 256000
    }
  }
}
