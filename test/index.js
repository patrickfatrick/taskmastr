// Set Vue to silent to suppress warnings unless VUE_DEBUG
import Vue from 'vue'
Vue.config.productionTip = false
Vue.config.silent = process.env.VUE_DEBUG !== true

// require all test files using special Webpack feature
// https://webpack.github.io/docs/context.html#require-context
const testsContext = require.context('.', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require store files
const storeContext = require.context('../src/store/', true, /\.js$/)
storeContext.keys().forEach(storeContext)

// require component files
const componentContext = require.context('../src/components/', true, /\.vue$/)
componentContext.keys().forEach(componentContext)
