/* global describe it beforeEach afterEach */
import { assert } from 'chai'
import getParentByClass from '../../src/helper-utilities/get-parent-by-class'

describe('getParentByClass', () => {
  let container
  let parent
  let child
  beforeEach(() => {
    container = document.createElement('div')
    container.setAttribute('id', 'container')
    parent = document.createElement('div')
    parent.setAttribute('id', 'parent')
    child = document.createElement('div')
    child.setAttribute('id', 'child')
    container.appendChild(parent)
    parent.appendChild(child)
  })

  afterEach(() => {
    container.classList.remove('parent')
    parent.classList.remove('parent')
  })

  it('retrieves parent element with matching class name', () => {
    parent.classList.add('parent')

    assert.strictEqual(getParentByClass(child, 'parent').getAttribute('id'), 'parent')
  })

  it('retrieves the __first__ parent element with matching class name', () => {
    container.classList.add('parent')
    parent.classList.add('parent')

    assert.strictEqual(getParentByClass(child, 'parent').getAttribute('id'), 'parent')
  })

  it('searches recursively', () => {
    container.classList.add('parent')

    assert.strictEqual(getParentByClass(child, 'parent').getAttribute('id'), 'container')
  })

  it('returns null if no parent element', () => {
    parent.classList.add('parent')

    assert.isNull(getParentByClass(container, 'parent'))
  })

  it('returns null if class is nowhere to be found', () => {
    assert.isNull(getParentByClass(container, 'parent'))
  })
})
