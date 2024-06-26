import client from './client'

export const GET_ALL_BLOGS = (params) => client.get('/api/myblog/v1/blogs/', { params })

export const CREATE_NEW_BLOG = (data) => client.post('/api/myblog/v1/blogs/', data)

export const UPDATE_BLOG = (data) => client.put(`/api/myblog/v1/blogs/${data.id}`, data)

export const GET_ONE_BLOG = (id) => client.get(`/api/myblog/v1/blogs/${id}`)

export const DELETE_BLOG = (id) => client.delete(`/api/myblog/v1/blogs/${id}`)
