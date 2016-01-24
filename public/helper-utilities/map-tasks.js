import hat from 'hat'
import _ from 'lodash'
import gregorian from 'gregorian'

export default function (list) {
  return {
    id: list.id || list.agendaID || hat(),
    list: list.list,
    current: list.current,
    _delete: false,
    items: _.map(list.items, function (item) {
      return {
        id: item.id || item.agendaID,
        item: item.item,
        current: item.current,
        complete: item.complete,
        dateCreated: item.dateCreated || gregorian.reform(new Date()).to('iso'),
        dueDate: item.dueDate || '',
        notes: item.notes || '',
        _dueDateDifference: null,
        _delete: false,
        _detailsToggled: false
      }
    })
  }
}
