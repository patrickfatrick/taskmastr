export default function getParentByClass (el, selector) {
  const parent = el.parentNode
  if (!parent) return null
  if (parent.classList && parent.classList.contains(selector)) return parent
  else return getParentByClass(parent, selector)
}
