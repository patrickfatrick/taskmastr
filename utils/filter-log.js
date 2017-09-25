module.exports = function filterLog (data) {
  return JSON.stringify(data)
    .replace(/"(key|confirmKey|newKey)":"[^"]*"/, (match, p1) => {
      return `"${p1}":"[FILTERED]"`
    })
}
