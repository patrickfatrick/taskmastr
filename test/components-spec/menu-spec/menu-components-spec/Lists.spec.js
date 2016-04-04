/* global it describe sinon beforeEach afterEach*/
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import Mousetrap from 'mousetrap'
import Lists from '../../../../public/components/menu/menu-components/Lists.vue'
import state from '../../../../public/store/state'
import mutations from '../../../../public/store/mutations'

describe('Lists.vue', function () {
  let lists

  function mountVm (changes) {
    return new Vue({
      store: new Vuex.Store({
        state: {
          ...state,
          ...changes,
          user: {
            ...state.user,
            tasks: lists
          }
        },
        mutations
      }),
      template: '<div><test></test></div>',
      components: {
        'test': Lists
      }
    }).$mount()
  }

  beforeEach(() => {
    lists = [
      {
        id: 'listid',
        list: 'List 1',
        current: false,
        _delete: true,
        items: [
          {
            id: 'itemid',
            item: 'Item 1'
          }
        ]
      },
      {
        id: 'listid2',
        list: 'List 2',
        current: true,
        _delete: false,
        items: [
          {
            id: 'itemid2',
            item: 'Item 2'
          }
        ]
      }
    ]
  })

  afterEach(() => {
    lists = []
  })

  it('should have a renameToggled property', () => {
    assert.isNull(Lists.data().renameToggled)
  })

  it('should have a dragStart property', () => {
    assert.isNull(Lists.data().dragStart)
  })

  it('should inherit the current property from the state', () => {
    assert.isObject(Lists.vuex.getters.current({ current: {} }))
  })

  it('should inherit the lists property from the state', () => {
    assert.isArray(Lists.vuex.getters.lists({ user: { tasks: [] } }))
  })

  it('should inherit a deleteList action from the store', () => {
    assert.isFunction(Lists.vuex.actions.deleteList)
  })

  it('should inherit a setCurrentList action from the store', () => {
    assert.isFunction(Lists.vuex.actions.setCurrentList)
  })

  it('should inherit a sortLists action from the store', () => {
    assert.isFunction(Lists.vuex.actions.sortLists)
  })

  it('should have a renameList method', () => {
    assert.isFunction(Lists.methods.renameList)
  })

  it('should have a renameToggle method', () => {
    assert.isFunction(Lists.methods.renameToggle)
  })

  it('should have a _drag method', () => {
    assert.isFunction(Lists.methods._drag)
  })

  it('should have a _drop method', () => {
    assert.isFunction(Lists.methods._drop)
  })

  it('should have a _index method', () => {
    assert.isFunction(Lists.methods._index)
  })

  it('should render with initial state', (done) => {
    lists = []
    const vm = mountVm()

    assert.lengthOf(vm.$el.querySelector('.table-body').children, 0)

    done()
  })

  it('should render rows with lists', (done) => {
    const vm = mountVm()

    assert.lengthOf(vm.$el.querySelector('.table-body').children, 2)
    assert.deepEqual(vm.$el.querySelector('.table-body').children[0].getAttribute('name'), 'list1')
    assert.deepEqual(vm.$el.querySelector('.table-body').children[1].getAttribute('name'), 'list2')

    done()
  })

  it('should respond to _delete and current properties', (done) => {
    const vm = mountVm()

    assert.isTrue(vm.$el.querySelector('.table-body').children[0].classList.contains('deleting'))
    assert.isTrue(vm.$el.querySelector('.table-body').children[1].classList.contains('current'))

    done()
  })

  it('should call navigateToList method on click', (done) => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'navigateToList')

    vm.$el.querySelectorAll('.name')[0].click()
    assert.isTrue(vm.$children[0].navigateToList.calledWith('listid'))

    vm.$children[0].navigateToList.restore()
    done()
  })

  it('should call renameToggle method on dblclick', (done) => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'renameToggle')

    let dblclick
    dblclick = document.createEvent('HTMLEvents')
    dblclick.initEvent('dblclick', true, true, window)
    vm.$el.querySelectorAll('.name')[0].dispatchEvent(dblclick)

    assert.isTrue(vm.$children[0].renameToggle.calledWith(0))
    Vue.nextTick(() => {
      vm.$children[0].renameToggled.should.equal(0)
      assert.isTrue(vm.$el.querySelectorAll('.name')[0].classList.contains('hidden'))
    })

    vm.$children[0].renameToggle.restore()
    done()
  })

  it('should reset renameToggle when called on current renameToggle index', (done) => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'renameToggle')

    let dblclick
    dblclick = document.createEvent('HTMLEvents')
    dblclick.initEvent('dblclick', true, true, window)
    vm.$el.querySelectorAll('.name')[0].dispatchEvent(dblclick)

    assert.isTrue(vm.$children[0].renameToggle.calledWith(0))

    vm.$el.querySelectorAll('.name')[0].dispatchEvent(dblclick)

    assert.isTrue(vm.$children[0].renameToggle.calledWith(0))

    Vue.nextTick(() => {
      assert.isNull(vm.$children[0].renameToggled)
      assert.isFalse(vm.$el.querySelectorAll('.name')[0].classList.contains('hidden'))
    })

    vm.$children[0].renameToggle.restore()
    done()
  })

  it('should call renameList on .rename change', (done) => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'renameList')

    let change
    change = document.createEvent('HTMLEvents')
    change.initEvent('change', true, true, window)
    vm.$el.querySelectorAll('.rename')[0].value = 'List 11'
    vm.$el.querySelectorAll('.rename')[0].dispatchEvent(change)

    assert.isTrue(vm.$children[0].renameList.calledWith(0, 'List 11'))

    vm.$children[0].renameList.restore()
    done()
  })

  it('should not call renameList if null', (done) => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'renameList')

    let change
    change = document.createEvent('HTMLEvents')
    change.initEvent('change', true, true, window)
    vm.$el.querySelectorAll('.rename')[0].value = ''
    vm.$el.querySelectorAll('.rename')[0].dispatchEvent(change)

    assert.isFalse(vm.$children[0].renameList.calledOnce)

    vm.$children[0].renameList.restore()
    done()
  })

  it('sets renameToggled to null on blur', (done) => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'renameToggle')

    let blur
    blur = document.createEvent('HTMLEvents')
    blur.initEvent('blur', true, true, window)
    vm.$el.querySelectorAll('.rename')[0].dispatchEvent(blur)

    assert.isTrue(vm.$children[0].renameToggle.calledWith(null))
    assert.isNull(vm.$children[0].renameToggled)

    vm.$children[0].renameToggle.restore()
    done()
  })

  it('should call navigateToList on alt+,', (done) => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'navigateToList')

    Mousetrap.trigger('alt+,')
    assert.isTrue(vm.$children[0].navigateToList.calledWith('listid'))

    vm.$children[0].navigateToList.restore()
    done()
  })

  it('should call navigateToList on alt+.', (done) => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'navigateToList')

    Mousetrap.trigger('alt+.')
    assert.isTrue(vm.$children[0].navigateToList.calledWith('listid'))

    vm.$children[0].navigateToList.restore()
    done()
  })

  it('should call deleteList on alt+backspace', (done) => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'deleteList')

    Mousetrap.trigger('alt+backspace')
    assert.isTrue(vm.$children[0].deleteList.calledWith(1))

    vm.$children[0].deleteList.restore()
    done()
  })

  it('should call renameToggle on alt+/', (done) => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'renameToggle')

    Mousetrap.trigger('alt+/')
    assert.isTrue(vm.$children[0].renameToggle.calledWith(1))

    vm.$children[0].renameToggle.restore()
    done()
  })

  it('should call sortLists on alt+command+up', (done) => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'sortLists')

    Mousetrap.trigger('alt+command+up')
    assert.isTrue(vm.$children[0].sortLists.calledWith(1, 0))

    vm.$children[0].sortLists.restore()
    done()
  })

  it('should not call sortLists on alt+command+up if first list', (done) => {
    lists = [
      {
        id: 'listid',
        list: 'List 1',
        current: true,
        _delete: true,
        items: [
          {
            id: 'itemid',
            item: 'Item 1'
          }
        ]
      },
      {
        id: 'listid2',
        list: 'List 2',
        current: false,
        _delete: false,
        items: [
          {
            id: 'itemid2',
            item: 'Item 2'
          }
        ]
      }
    ]

    const vm = mountVm()

    sinon.stub(vm.$children[0], 'sortLists')

    Mousetrap.trigger('alt+command+up')
    assert.isFalse(vm.$children[0].sortLists.calledOnce)

    vm.$children[0].sortLists.restore()
    done()
  })

  it('should call sortLists on alt+command+down', (done) => {
    lists = [
      {
        id: 'listid',
        list: 'List 1',
        current: true,
        _delete: true,
        items: [
          {
            id: 'itemid',
            item: 'Item 1'
          }
        ]
      },
      {
        id: 'listid2',
        list: 'List 2',
        current: false,
        _delete: false,
        items: [
          {
            id: 'itemid2',
            item: 'Item 2'
          }
        ]
      }
    ]

    const vm = mountVm()

    sinon.stub(vm.$children[0], 'sortLists')

    Mousetrap.trigger('alt+command+down')
    assert.isTrue(vm.$children[0].sortLists.calledWith(0, 1))

    vm.$children[0].sortLists.restore()
    done()
  })

  it('should not call sortLists on alt+command+down if last list', (done) => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'sortLists')

    Mousetrap.trigger('alt+command+down')
    assert.isFalse(vm.$children[0].sortLists.calledOnce)

    vm.$children[0].sortLists.restore()
    done()
  })
})
