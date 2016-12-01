export default function getParentByClass (el, selector) {
  const parent = el.parentNode
  if (!parent) return null
  console.log(parent)
  if (parent.classList.contains(selector)) return parent
  else return getParentByClass(parent, selector)
}
