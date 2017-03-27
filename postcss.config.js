module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-url')({
      url: 'rebase',
      basePath: 'public/'
    }),
    require('postcss-cssnext')({
      browsers: [ 'last 2 versions', '> 5%' ]
    }),
    require('lost')
  ],
  sourceMap: 'inline',
  to: 'public/stylesheets/styles.css'
}
