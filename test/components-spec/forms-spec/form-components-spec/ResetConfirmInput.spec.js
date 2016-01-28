/* global it describe sinon */
import chai from 'chai'
import Vue from 'vue'
import ResetConfirmInput from '../../../../public/components/forms/form-components/ResetConfirmInput.vue'

chai.should()
describe('ResetConfirmInput.vue', function () {
  it('should inherit the user property from the state', () => {
    ResetConfirmInput.computed.user().should.be.an.instanceof(Object)
  })

  it('should inherit the resetAttempt property from the state', () => {
    ResetConfirmInput.computed.resetAttempt().should.be.false
  })

  it('should inherit the resetFail property from the state', () => {
    ResetConfirmInput.computed.resetFail().should.be.false
  })

  it('should have a setResetAttempt method', () => {
    ResetConfirmInput.methods.setResetAttempt.should.be.an.instanceof(Function)
  })

  it('should render with initial state', () => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetConfirmInput
      }
    }).$mount()

    vm.$el.querySelector('#reset-confirm').classList.contains('invalid').should.be.false
  })

  it('should respond to changes in the state', (done) => {
    ResetConfirmInput.computed.match = () => {
      return false
    }
    sinon.stub(ResetConfirmInput.computed, 'resetAttempt').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetConfirmInput
      }
    }).$mount()

    vm.$el.querySelector('#reset-confirm').classList.contains('invalid').should.be.true

    delete ResetConfirmInput.computed.match
    ResetConfirmInput.computed.resetAttempt.restore()
    done()
  })

  it('should call setResetAttempt on button push', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetConfirmInput
      }
    }).$mount()

    vm.$el.querySelector('#reset-button').click()

    Vue.nextTick(() => {
      vm.$children[0].resetAttempt.should.be.true
    })
    vm.$children[0].setResetAttempt(false)
    done()
  })
})
