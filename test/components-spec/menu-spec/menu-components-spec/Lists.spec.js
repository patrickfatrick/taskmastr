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

  // Mock vue-router
  Lists.computed.$route = () => {
    return {
      router: {
        go (location) {
          return location
        }
      }
    }
  }

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
        _deleting: true,
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
        _deleting: false,
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

  it('should have a removeList method', () => {
    assert.isFunction(Lists.methods.removeList)
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

  it('should render with initial state', () => {
    lists = []
    const vm = mountVm()

    assert.lengthOf(vm.$el.querySelector('.table-body').children, 0)
  })

  it('should render rows with lists', () => {
    const vm = mountVm()

    assert.lengthOf(vm.$el.querySelector('.table-body').children, 2)
    assert.deepEqual(vm.$el.querySelector('.table-body').children[0].getAttribute('name'), 'list1')
    assert.deepEqual(vm.$el.querySelector('.table-body').children[1].getAttribute('name'), 'list2')
  })

  it('should respond to _deleting and current properties', () => {
    const vm = mountVm()

    assert.isTrue(vm.$el.querySelector('.table-body').children[0].classList.contains('deleting'))
    assert.isTrue(vm.$el.querySelector('.table-body').children[1].classList.contains('current'))
  })

  it('should call navigateToList method on click', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'navigateToList')

    vm.$el.querySelectorAll('.name')[0].click()
    assert.isTrue(vm.$children[0].navigateToList.calledWith('listid'))

    vm.$children[0].navigateToList.restore()
  })

  it('should call renameToggle method on dblclick', () => {
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
  })

  it('should reset renameToggle when called on current renameToggle index', () => {
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
  })

  it('should call renameList on .rename change', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'renameList')

    let change
    change = document.createEvent('HTMLEvents')
    change.initEvent('change', true, true, window)
    vm.$el.querySelectorAll('.rename')[0].value = 'List 11'
    vm.$el.querySelectorAll('.rename')[0].dispatchEvent(change)

    assert.isTrue(vm.$children[0].renameList.calledWith(0, 'List 11'))

    vm.$children[0].renameList.restore()
  })

  it('should not call renameList if null', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'renameList')

    let change
    change = document.createEvent('HTMLEvents')
    change.initEvent('change', true, true, window)
    vm.$el.querySelectorAll('.rename')[0].value = ''
    vm.$el.querySelectorAll('.rename')[0].dispatchEvent(change)

    assert.isFalse(vm.$children[0].renameList.calledOnce)

    vm.$children[0].renameList.restore()
  })

  it('sets renameToggled to null on blur', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'renameToggle')

    let blur
    blur = document.createEvent('HTMLEvents')
    blur.initEvent('blur', true, true, window)
    vm.$el.querySelectorAll('.rename')[0].dispatchEvent(blur)

    assert.isTrue(vm.$children[0].renameToggle.calledWith(null))
    assert.isNull(vm.$children[0].renameToggled)

    vm.$children[0].renameToggle.restore()
  })

  it('should call removeList on trash can click', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'removeList')

    vm.$el.querySelectorAll('.delete-button')[1].click()
    assert.isTrue(vm.$children[0].removeList.calledWith(1))

    vm.$children[0].removeList.restore()
  })

  it('should call deleteList and navigateToList on removeList', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'deleteList').callsArgWith(1, 'listid')
    sinon.stub(vm.$children[0], 'navigateToList')

    vm.$children[0].removeList(1)
    assert.isTrue(vm.$children[0].deleteList.calledWith(1))
    assert.isTrue(vm.$children[0].navigateToList.calledWith('listid'))

    vm.$children[0].deleteList.restore()
    vm.$children[0].navigateToList.restore()
  })

  it('should call unmountList on navigateToList', () => {
    const vm = mountVm({ current: lists[1] })

    sinon.stub(vm.$children[0], 'unmountList')
    sinon.stub(vm.$children[0].$route.router, 'go').returns(true)

    vm.$children[0].navigateToList('listid')
    assert.isTrue(vm.$children[0].unmountList.calledOnce)
    assert.isTrue(vm.$children[0].$route.router.go.calledWith('/app/list/listid'))

    vm.$children[0].unmountList.restore()
    vm.$children[0].$route.router.go.restore()
  })

  it('should not call unmountList on navigateToList if id === current.id', () => {
    const vm = mountVm({ current: lists[1] })

    sinon.stub(vm.$children[0], 'unmountList')
    sinon.stub(vm.$children[0].$route.router, 'go').returns(true)

    vm.$children[0].navigateToList('listid2')
    assert.isFalse(vm.$children[0].unmountList.calledOnce)
    assert.isTrue(vm.$children[0].$route.router.go.calledWith('/app/list/listid2'))

    vm.$children[0].unmountList.restore()
    vm.$children[0].$route.router.go.restore()
  })

  it('should call navigateToList on alt+,', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'navigateToList')

    Mousetrap.trigger('alt+,')
    assert.isTrue(vm.$children[0].navigateToList.calledWith('listid'))

    vm.$children[0].navigateToList.restore()
  })

  it('should call navigateToList on alt+.', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'navigateToList')

    Mousetrap.trigger('alt+.')
    assert.isTrue(vm.$children[0].navigateToList.calledWith('listid'))

    vm.$children[0].navigateToList.restore()
  })

  it('should call removeList on alt+backspace', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'removeList')

    Mousetrap.trigger('alt+backspace')
    assert.isTrue(vm.$children[0].removeList.calledWith(1))

    vm.$children[0].removeList.restore()
  })

  it('should call renameToggle on alt+/', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'renameToggle')

    Mousetrap.trigger('alt+/')
    assert.isTrue(vm.$children[0].renameToggle.calledWith(1))

    vm.$children[0].renameToggle.restore()
  })

  it('should call sortLists on alt+command+up', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'sortLists')

    Mousetrap.trigger('alt+command+up')
    assert.isTrue(vm.$children[0].sortLists.calledWith(1, 0))

    vm.$children[0].sortLists.restore()
  })

  it('should not call sortLists on alt+command+up if first list', () => {
    lists = [
      {
        id: 'listid',
        list: 'List 1',
        current: true,
        _deleting: true,
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
        _deleting: false,
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
  })

  it('should call sortLists on alt+command+down', () => {
    lists = [
      {
        id: 'listid',
        list: 'List 1',
        current: true,
        _deleting: true,
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
        _deleting: false,
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
  })

  it('should not call sortLists on alt+command+down if last list', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'sortLists')

    Mousetrap.trigger('alt+command+down')
    assert.isFalse(vm.$children[0].sortLists.calledOnce)

    vm.$children[0].sortLists.restore()
  })
})
