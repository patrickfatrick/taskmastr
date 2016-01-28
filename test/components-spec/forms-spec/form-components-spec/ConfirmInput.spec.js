/* global it describe sinon */
import chai from 'chai'
import Vue from 'vue'
import ConfirmInput from '../../../../public/components/forms/form-components/ConfirmInput.vue'

chai.should()
describe('ConfirmInput.vue', function () {
  it('should inherit the user property from the state', () => {
    ConfirmInput.computed.user().should.be.an.instanceof(Object)
  })

  it('should inherit the loginAttempt property from the state', () => {
    ConfirmInput.computed.loginAttempt().should.be.false
  })

  it('should inherit the confirmAttempt property from the state', () => {
    ConfirmInput.computed.confirmAttempt().should.be.false
  })

  it('should have a setConfirmAttempt method', () => {
    ConfirmInput.methods.setConfirmAttempt.should.be.an.instanceof(Function)
  })

  it('should render with initial state', () => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ConfirmInput
      }
    }).$mount()

    vm.$el.querySelector('#confirm').classList.contains('invalid').should.be.false
  })

  it('should respond to changes in the state', (done) => {
    ConfirmInput.props.match = false
    sinon.stub(ConfirmInput.computed, 'confirmAttempt').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ConfirmInput
      }
    }).$mount()

    vm.$el.querySelector('#confirm').classList.contains('invalid').should.be.true

    ConfirmInput.props.match = undefined
    ConfirmInput.computed.confirmAttempt.restore()
    done()
  })

  it('should call setConfirmAttempt on button push', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ConfirmInput
      }
    }).$mount()

    vm.$el.querySelector('#confirm-button').click()

    Vue.nextTick(() => {
      vm.$children[0].confirmAttempt.should.be.true
    })

    vm.$children[0].setConfirmAttempt(false)
    done()
  })
})
