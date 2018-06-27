import buildQueryString from './build-query-string'

const handleResponse = res => {
  if (res.status >= 400)
    throw new Error(res.status);

  return res.json()
}

const _http = ({ URL, method, data, query }) =>
  fetch(`${URL}${buildQueryString(query)}`, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(handleResponse)

const http = Object.assign(_http,
  ...['get', 'post', 'put', 'delete'].map(m =>
    ({ [m]: (URL, init) => http({ URL, method: m, ...init }) })
  )
)

export default http
