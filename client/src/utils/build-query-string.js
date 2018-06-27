const buildQueryString = params => params
  ? `?${Object.entries(params)
    .map(kv => kv.join('='))
    .join('&')}`
  : ''

export default buildQueryString
