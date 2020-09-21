module.exports = function(api) {
  api.cache.using(() => process.env.NODE_ENV === 'development')
  return {
    presets: [
      ['@babel/preset-env', {
        useBuiltIns: 'entry',
        corejs: 3.6
      }],
    ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-runtime'
    ]
  }
}
