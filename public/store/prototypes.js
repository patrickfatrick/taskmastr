import gregorian from 'gregorian'
import date from 'date.js'

/**
* Takes a string containing a human-readable date, and outputs the string and a date object
* @params {String}  item    user-input string (including date)
* @returns {String}         the string without the date information
* @returns {Date}           the corresponding due date
*/
export var extractDate = function (string) {
  const keywords = [
    'next', ' on ', 'tomorrow',
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
    'January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
    'january', 'february', 'march', 'april', 'june', 'july', 'august', 'september', 'october', 'november', 'december',
    ' Jan ', ' Feb ', ' Mar ', ' Apr ', ' May ', ' Jun ', ' Jul ', ' Aug ', ' Sept ', ' Oct ', ' Nov ', ' Dec ',
    ' jan ', ' feb ', ' mar ', ' apr ', ' may ', ' jun ', ' jul ', ' aug ', ' sept ', ' oct ', ' nov ', ' dec ',
    ' 01/', ' 02/', ' 03/', ' 04/', ' 05/', ' 06/', ' 07/', ' 08/', ' 09/', ' 10/',
    ' 11/', ' 12/', ' 13/', ' 14/', ' 15/', ' 16/', ' 17/', ' 18/', ' 19/', ' 20/',
    ' 21/', ' 22/', ' 23/', ' 24/', ' 25/', ' 26/', ' 27/', ' 28/', ' 29/', ' 30/', ' 31/',
    ' 2015-', ' 2016-', '2017-', '2018-', '2019-', '2020-'
  ]

  let keyword

  keywords.some((word) => {
    const index = string.indexOf(word)
    if (index !== -1) {
      keyword = index
      return true
    }
  })

  let dueDate = gregorian.reform(string.slice(keyword, string.length))
  let item
  dueDate = (dueDate.reagent()) ? dueDate.recite() : date(string.slice(keyword, string.length))
  // if (dueDate <= gregorian.reform(dueDate).restart('d').recite()) {
  //  dueDate = gregorian.reform(dueDate).add(1, 'y').recite()
  // }
  item = string.slice(0, 1).toUpperCase() + string.slice(1, keyword)
  return {item: item, dueDate: gregorian.reform(dueDate).to('iso')}
}
