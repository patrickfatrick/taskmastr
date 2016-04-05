/* global it describe */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import UsernameInput from '../../../../public/components/forms/form-components/UsernameInput.vue'
import state from '../../../../public/store/state'
import mutations from '../../../../public/store/mutations'

describe('UsernameInput.vue', function () {
  // mock vue-router
  UsernameInput.computed.$route = () => {
    return {
      path: '/login'
    }
  }

  function mountVm (changes) {
    return new Vue({
      store: new Vuex.Store({
        state: {
          ...state,
          ...changes
        },
        mutations
      }),
      template: '<div><test></test></div>',
      components: {
        'test': UsernameInput
      }
    }).$mount()
  }

  it('should inherit the user property from the state', () => {
    assert.isObject(UsernameInput.vuex.getters.user({ user: {} }))
  })

  it('should inherit the forgot property from the state', () => {
    assert.isFalse(UsernameInput.vuex.getters.forgot({ forgot: false }))
  })

  it('should inherit the forgotEmail property from the state', () => {
    assert.isFalse(UsernameInput.vuex.getters.forgotEmail({ forgotEmail: false }))
  })

  it('should inherit the forgotFail property from the state', () => {
    assert.isFalse(UsernameInput.vuex.getters.forgotFail({ forgotFail: false }))
  })

  it('should inherit the confirmAttempt property from the state', () => {
    assert.isFalse(UsernameInput.vuex.getters.confirmAttempt({ confirmAttempt: false }))
  })

  it('should inherit the createFail property from the state', () => {
    assert.isFalse(UsernameInput.vuex.getters.createFail({ createFail: false }))
  })

  it('should inherit the loginAttempt property from the state', () => {
    assert.isFalse(UsernameInput.vuex.getters.loginAttempt({ loginAttempt: false }))
  })

  it('should have a setForgotAttempt method', () => {
    assert.isFunction(UsernameInput.vuex.actions.setForgotAttempt)
  })

  it('should render with initial state', () => {
    const vm = mountVm()

    assert.isFalse(vm.$el.querySelector('#user').classList.contains('invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[2].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[3].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[4].classList.contains('hidden'))
  })

  it('should respond to changes in the state (loginAttempt, !require)', () => {
    UsernameInput.computed.require = () => {
      return false
    }
    UsernameInput.computed.validate = () => {
      return false
    }
    const vm = mountVm({
      loginAttempt: true,
      forgotAttempt: false
    })

    assert.isTrue(vm.$el.querySelector('#user').classList.contains('invalid'))
    assert.isFalse(vm.$el.querySelector('.error-text').children[0].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[2].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[3].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[4].classList.contains('hidden'))

    delete UsernameInput.computed.require
    delete UsernameInput.computed.validate
  })

  it('should respond to changes in the state (forgotAttempt, !require)', () => {
    UsernameInput.computed.require = () => {
      return false
    }
    UsernameInput.computed.validate = () => {
      return false
    }
    const vm = mountVm({
      loginAttempt: false,
      forgotAttempt: true
    })

    assert.isTrue(vm.$el.querySelector('#user').classList.contains('invalid'))
    assert.isFalse(vm.$el.querySelector('.error-text').children[0].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[2].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[3].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[4].classList.contains('hidden'))

    delete UsernameInput.computed.require
    delete UsernameInput.computed.validate
  })

  it('should respond to changes in the state (loginAttempt, !validate)', () => {
    UsernameInput.computed.require = () => {
      return true
    }
    UsernameInput.computed.validate = () => {
      return false
    }
    const vm = mountVm({
      loginAttempt: true,
      forgotAttempt: false
    })

    assert.isTrue(vm.$el.querySelector('#user').classList.contains('invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.error-text').children[1].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[2].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[3].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[4].classList.contains('hidden'))

    delete UsernameInput.computed.require
    delete UsernameInput.computed.validate
  })

  it('should respond to changes in the state (confirmAttempt, createFail)', () => {
    // mock vue-router
    UsernameInput.computed.$route = () => {
      return {
        path: '/create'
      }
    }
    UsernameInput.computed.require = () => {
      return true
    }
    UsernameInput.computed.validate = () => {
      return true
    }

    const vm = mountVm({
      confirmAttempt: true,
      createFail: 'Create fail'
    })

    assert.isFalse(vm.$el.querySelector('#user').classList.contains('invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.error-text').children[2].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[3].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[4].classList.contains('hidden'))

    delete UsernameInput.computed.require
    delete UsernameInput.computed.validate
  })

  it('should respond to changes in the state (forgotAttempt, forgotFail)', () => {
    // mock vue-router
    UsernameInput.computed.$route = () => {
      return {
        path: '/forgot'
      }
    }
    UsernameInput.computed.require = () => {
      return true
    }
    UsernameInput.computed.validate = () => {
      return true
    }
    const vm = mountVm({
      forgotAttempt: true,
      forgotFail: 'Forgot fail',
      forgotEmail: false
    })

    assert.isTrue(vm.$el.querySelector('#user').classList.contains('invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[2].classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.error-text').children[3].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[4].classList.contains('hidden'))

    delete UsernameInput.computed.require
    delete UsernameInput.computed.validate
  })

  it('should respond to changes in the state (forgotAttempt, forgotEmail)', () => {
    // mock vue-router
    UsernameInput.computed.$route = () => {
      return {
        path: '/forgot'
      }
    }
    UsernameInput.computed.require = () => {
      return true
    }
    UsernameInput.computed.validate = () => {
      return true
    }
    const vm = mountVm({
      forgotAttempt: true,
      forgotFail: false,
      forgotEmail: true
    })

    assert.isFalse(vm.$el.querySelector('#user').classList.contains('invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[2].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[3].classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.error-text').children[4].classList.contains('hidden'))

    delete UsernameInput.computed.require
    delete UsernameInput.computed.validate
  })
})
