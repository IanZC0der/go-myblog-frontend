import client from './client'

export const ADD_COMMENT = (data) => client.post('/api/myblog/v1/comments/', data)
export const GET_COMMENTS = (id) => client.get(`/api/myblog/v1/comments/${id}`)
