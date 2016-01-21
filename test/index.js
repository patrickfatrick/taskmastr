// require all test files using special Webpack feature
// https://webpack.github.io/docs/context.html#require-context
var testsContext = require.context('.', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require store files
const componentsContext = require.context('../public/store/', true, /\.js$/)
componentsContext.keys().forEach(componentsContext)
