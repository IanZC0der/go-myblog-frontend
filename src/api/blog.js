import client from './client'


export const GET_ALL_BLOGS = (params) => client.get('/api/myblog/v1/blogs', {params})
