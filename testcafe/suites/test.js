import { Selector } from 'testcafe'

fixture('First test')
  .page('https://taskmastr-staging.herokuapp.com')

test('Things exist', async t => {
  await t
    .expect(Selector('#app-container'))
    .ok()
    .expect(Selector('.modal__header__headline').innerText)
    .eql('taskmastr')
})
