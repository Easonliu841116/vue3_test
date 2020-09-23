if (process.env.NODE_ENV === 'production') {
  module.exports = require('vue/dist/vue.esm-browser.prod')
} else {
  module.exports = require('vue/dist/vue.esm-browser')
}
