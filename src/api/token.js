import client from './client'

// login request
export const LOGIN = (data) => {
  return client({
    method: 'post',
    url: '/api/myblog/v1/tokens',
    data: data
  })
}

export const LOGOUT = (data) => {
  return client({
    method: 'delete',
    url: '/api/myblog/v1/tokens',
    data: data
  })
}
