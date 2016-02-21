import gregorian from 'gregorian'
import datejs from 'date.js'

/**
* Takes a string containing a human-readable date, and outputs the string and a date object
* @params {String}  item    user-input string (including date)
* @returns {String}         the string without the date information
* @returns {Date}           the corresponding due date
*/
export default function (string) {
  const re = /(tomorrow)|(((next|on)\W)?((week|month|year)|([mM]onday|[tT]uesday|[wW]ednesday|[tT]hursday|[fF]riday|[sS]aturday|[sS]unday)))|((on\W)?([jJ]an(uary)?|[fF]eb(ruary)?|[mM]ar(ch)?|[aA]pr(il)?|[mM]ay|[jJ]une?|[jJ]uly?|[aA]ug(ust)?|[sS]ept(ember)?|[oO]ct(ober)?|[nN]ov(ember)?|[dD]ec(ember)?)\.?\W(0?[1-9]|[12][0-9]|3[01])(th|st|rd|nd)?,?\W(19|20)\d\d)|((on\W)?(((19|20)\d\d)([- /.])(0[1-9]|1[012])\28(0[1-9]|[12][0-9]|3[01])|((0?[1-9]|1[012])([- /.])(0?[1-9]|[12][0-9]|3[01])\33((19|20)\d\d))|((0?[1-9]|[12][0-9]|3[01])([- /.])(0?[1-9]|1[012])\39((19|20)\d\d))))$/g

  let found = string.search(re)
  if (found === -1) found = undefined

  const item = string.slice(0, found).replace(/^\w/g, string.charAt(0).toUpperCase())
  const date = gregorian.reform(string.slice(found, string.length))
  const dueDate = (date.reagent())
    ? date.set(0, 'h').to('iso')
    : gregorian.reform(datejs(string.slice(found, string.length))).to('iso')

  return {
    item: item.trim(),
    dueDate: dueDate
  }
}
