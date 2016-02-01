/* global it describe sinon assert beforeEach afterEach*/
import chai from 'chai'
import Vue from 'vue'
import Mousetrap from 'mousetrap'
import Lists from '../../../../public/components/menu/menu-components/Lists.vue'

chai.should()
describe('Lists.vue', function () {
  beforeEach(() => {
    sinon.stub(Lists.computed, 'lists').returns([
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
    ])
  })

  afterEach(() => {
    Lists.computed.lists.restore()
  })

  it('should have a renameToggled property', () => {
    assert.isNull(Lists.data().renameToggled)
  })

  it('should have a dragStart property', () => {
    assert.isNull(Lists.data().dragStart)
  })

  it('should inherit the current property from the state', () => {
    Lists.computed.current().should.be.an.instanceof(Object)
  })

  it('should inherit the lists property from the state', () => {
    Lists.computed.lists().should.be.an.instanceof(Array)
  })

  it('should inherit a deleteList action from the store', () => {
    Lists.methods.deleteList.should.be.an.instanceof(Function)
  })

  it('should inherit a setCurrentList action from the store', () => {
    Lists.methods.setCurrentList.should.be.an.instanceof(Function)
  })

  it('should inherit a sortLists action from the store', () => {
    Lists.methods.sortLists.should.be.an.instanceof(Function)
  })

  it('should inherit a setSaveButton action from the store', () => {
    Lists.methods.setSaveButton.should.be.an.instanceof(Function)
  })

  it('should have a renameList method', () => {
    Lists.methods.renameList.should.be.an.instanceof(Function)
  })

  it('should have a renameToggle method', () => {
    Lists.methods.renameToggle.should.be.an.instanceof(Function)
  })

  it('should have a _drag method', () => {
    Lists.methods._drag.should.be.an.instanceof(Function)
  })

  it('should have a _drop method', () => {
    Lists.methods._drop.should.be.an.instanceof(Function)
  })

  it('should have a _index method', () => {
    Lists.methods._index.should.be.an.instanceof(Function)
  })

  it('should render with initial state', (done) => {
    Lists.computed.lists.restore()
    sinon.stub(Lists.computed, 'lists').returns([])
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Lists
      }
    }).$mount()

    vm.$el.querySelector('.table-body').children.should.have.length(0)

    done()
  })

  it('should render rows with lists', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Lists
      }
    }).$mount()

    vm.$el.querySelector('.table-body').children.should.have.length(2)
    vm.$el.querySelector('.table-body').children[0].getAttribute('name').should.equal('list1')
    vm.$el.querySelector('.table-body').children[1].getAttribute('name').should.equal('list2')

    done()
  })

  it('should respond to _delete and current properties', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Lists
      }
    }).$mount()

    vm.$el.querySelector('.table-body').children[0].classList.contains('deleting').should.be.true
    vm.$el.querySelector('.table-body').children[1].classList.contains('current').should.be.true

    done()
  })

  it('should call setCurrentList method on click', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Lists
      }
    }).$mount()
    sinon.spy(vm.$children[0], 'setCurrentList')

    vm.$el.querySelectorAll('.name')[0].click()
    vm.$children[0].setCurrentList.calledWith(0).should.be.true

    vm.$children[0].setCurrentList.restore()
    done()
  })

  it('should call renameToggle method on dblclick', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Lists
      }
    }).$mount()
    sinon.spy(vm.$children[0], 'renameToggle')

    let dblclick
    dblclick = document.createEvent('HTMLEvents')
    dblclick.initEvent('dblclick', true, true, window)
    vm.$el.querySelectorAll('.name')[0].dispatchEvent(dblclick)

    vm.$children[0].renameToggle.calledWith(0).should.be.true
    Vue.nextTick(() => {
      vm.$children[0].renameToggled.should.equal(0)
      vm.$el.querySelectorAll('.name')[0].classList.contains('hidden').should.be.true
    })

    vm.$children[0].renameToggle.restore()
    done()
  })

  it('should reset renameToggle when called on current renameToggle index', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Lists
      }
    }).$mount()
    sinon.spy(vm.$children[0], 'renameToggle')

    let dblclick
    dblclick = document.createEvent('HTMLEvents')
    dblclick.initEvent('dblclick', true, true, window)
    vm.$el.querySelectorAll('.name')[0].dispatchEvent(dblclick)

    vm.$children[0].renameToggle.calledWith(0).should.be.true

    vm.$el.querySelectorAll('.name')[0].dispatchEvent(dblclick)

    vm.$children[0].renameToggle.calledWith(0).should.be.true

    Vue.nextTick(() => {
      assert.isNull(vm.$children[0].renameToggled)
      vm.$el.querySelectorAll('.name')[0].classList.contains('hidden').should.be.false
    })

    vm.$children[0].renameToggle.restore()
    done()
  })

  it('should call renameList on .rename change', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Lists
      }
    }).$mount()
    sinon.spy(vm.$children[0], 'renameList')

    let change
    change = document.createEvent('HTMLEvents')
    change.initEvent('change', true, true, window)
    vm.$el.querySelectorAll('.rename')[0].value = 'List 11'
    vm.$el.querySelectorAll('.rename')[0].dispatchEvent(change)

    vm.$children[0].renameList.calledWith(0, 'List 11').should.be.true

    vm.$children[0].renameList.restore()
    done()
  })

  it('should not call renameList if null', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Lists
      }
    }).$mount()
    sinon.spy(vm.$children[0], 'renameList')

    let change
    change = document.createEvent('HTMLEvents')
    change.initEvent('change', true, true, window)
    vm.$children[0].lists[0].list = ''
    vm.$el.querySelectorAll('.rename')[0].dispatchEvent(change)

    vm.$children[0].renameList.calledOnce.should.be.false

    vm.$children[0].renameList.restore()
    done()
  })

  it('sets renameToggled to null on blur', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Lists
      }
    }).$mount()
    sinon.spy(vm.$children[0], 'renameToggle')

    let blur
    blur = document.createEvent('HTMLEvents')
    blur.initEvent('blur', true, true, window)
    vm.$el.querySelectorAll('.rename')[0].dispatchEvent(blur)

    vm.$children[0].renameToggle.calledWith(null).should.be.true
    assert.isNull(vm.$children[0].renameToggled)

    vm.$children[0].renameToggle.restore()
    done()
  })

  it('should call setCurrentList on alt+up', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Lists
      }
    }).$mount()
    sinon.spy(vm.$children[0], 'setCurrentList')

    Mousetrap.trigger('alt+up')
    vm.$children[0].setCurrentList.calledWith(0).should.be.true

    vm.$children[0].setCurrentList.restore()
    done()
  })

  it('should call setCurrentList on alt+down', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Lists
      }
    }).$mount()
    sinon.spy(vm.$children[0], 'setCurrentList')

    Mousetrap.trigger('alt+down')
    vm.$children[0].setCurrentList.calledWith(1).should.be.true

    vm.$children[0].setCurrentList.restore()
    done()
  })

  it('should call deleteList on alt+backspace', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Lists
      }
    }).$mount()
    sinon.spy(vm.$children[0], 'deleteList')

    Mousetrap.trigger('alt+backspace')
    vm.$children[0].deleteList.calledWith(1).should.be.true

    vm.$children[0].deleteList.restore()
    done()
  })

  it('should call renameToggle on alt+/', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Lists
      }
    }).$mount()
    sinon.spy(vm.$children[0], 'renameToggle')

    Mousetrap.trigger('alt+/')
    vm.$children[0].renameToggle.calledWith(1).should.be.true

    vm.$children[0].renameToggle.restore()
    done()
  })

  it('should call sortLists on alt+command+up', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Lists
      }
    }).$mount()
    sinon.spy(vm.$children[0], 'sortLists')

    Mousetrap.trigger('alt+command+up')
    vm.$children[0].sortLists.calledWith(1, 0).should.be.true

    vm.$children[0].sortLists.restore()
    done()
  })

  it('should not call sortLists on alt+command+up if first list', (done) => {
    Lists.computed.lists.restore()
    sinon.stub(Lists.computed, 'lists').returns([
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
    ])
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Lists
      }
    }).$mount()
    sinon.spy(vm.$children[0], 'sortLists')

    Mousetrap.trigger('alt+command+up')
    vm.$children[0].sortLists.calledOnce.should.be.false

    vm.$children[0].sortLists.restore()
    done()
  })

  it('should call sortLists on alt+command+down', (done) => {
    Lists.computed.lists.restore()
    sinon.stub(Lists.computed, 'lists').returns([
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
    ])
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Lists
      }
    }).$mount()
    sinon.spy(vm.$children[0], 'sortLists')

    Mousetrap.trigger('alt+command+down')
    vm.$children[0].sortLists.calledWith(0, 1).should.be.true

    vm.$children[0].sortLists.restore()
    done()
  })

  it('should not call sortLists on alt+command+down if last list', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Lists
      }
    }).$mount()
    sinon.spy(vm.$children[0], 'sortLists')

    Mousetrap.trigger('alt+command+down')
    vm.$children[0].sortLists.calledOnce.should.be.false

    vm.$children[0].sortLists.restore()
    done()
  })
})
