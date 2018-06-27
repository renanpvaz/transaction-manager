const omit = (key, obj) => Object
  .keys(obj)
  .filter(k => k !== key)
  .reduce((acc, k) => ({ ...acc, [k]: obj[k] }), {})

export default omit
