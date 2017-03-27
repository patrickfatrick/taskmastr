module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'property-no-unknown': [ true, {
      ignoreProperties: [ '/^lost-/' ]
    }],
    'no-empty-source': null
  },
  // Necessary to keep stylelint happy with animate.css
  ignoreFiles: [ './src/stylesheets/styles.css' ],
  processors: [ 'stylelint-processor-html' ]
}
