// helper modified from http://vuex.vuejs.org/en/testing.html
export const testAction = (action, args, state, expectedMutations, done) => {
  let count = 0
  // mock dispatch
  const dispatch = (name, ...payload) => {
    const mutation = expectedMutations[count]
    mutation.name.should.equal(name)
    if (payload) {
      mutation.payload.should.deep.equal(payload)
    }
    count++
    if (count >= expectedMutations.length) {
      done()
    }
  }
  // call the action with mocked store and arguments
  action({dispatch, state}, ...args)

  // check if nothing should have been dispatched
  if (count === 0) {
    expectedMutations.length.should.equal(0)
    done()
  }
  // expectedMutations.length.should.equal(count)
  // done()
}
