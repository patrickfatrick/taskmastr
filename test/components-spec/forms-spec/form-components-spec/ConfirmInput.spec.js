/* global it describe */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import ConfirmInput from '../../../../public/components/forms/form-components/ConfirmInput.vue'
import state from '../../../../public/store/state'
import mutations from '../../../../public/store/mutations'

describe('ConfirmInput.vue', function () {
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
        'test': ConfirmInput
      }
    }).$mount()
  }

  it('should inherit the user property from the state', () => {
    assert.isObject(ConfirmInput.vuex.getters.user({ user: {} }))
  })

  it('should inherit the loginAttempt property from the state', () => {
    assert.isFalse(ConfirmInput.vuex.getters.loginAttempt({ loginAttempt: false }))
  })

  it('should inherit the confirmAttempt property from the state', () => {
    assert.isFalse(ConfirmInput.vuex.getters.confirmAttempt({ confirmAttempt: false }))
  })

  it('should render with initial state', () => {
    const vm = mountVm()

    assert.isFalse(vm.$el.querySelector('#confirm').classList.contains('invalid'))
  })

  it('should respond to changes in the state', () => {
    ConfirmInput.props.match = false
    const vm = mountVm({ confirmAttempt: true })

    assert.isTrue(vm.$el.querySelector('#confirm').classList.contains('invalid'))

    ConfirmInput.props.match = undefined
  })
})
