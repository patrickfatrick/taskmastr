/* global describe it */
import chai from 'chai'
import {testAction} from '../test-action'
const actionsInjector = require('inject!../../../public/store/actions')

chai.should()

describe('setDarkmode', () => {
  it('dispatches SET_DARKMODE and SET_SAVE_BUTTON on true', done => {
    const actions = actionsInjector({})

    testAction(actions.default.setDarkmode, [true], {}, [
      {name: 'SET_DARKMODE', payload: [true]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
  })

  it('dispatches SET_DARKMODE and SET_SAVE_BUTTON on false', done => {
    const actions = actionsInjector({})

    testAction(actions.default.setDarkmode, [false], {}, [
      {name: 'SET_DARKMODE', payload: [false]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
  })
})
