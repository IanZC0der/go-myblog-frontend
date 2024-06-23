import client from './client'

// login request
export const LOGIN = (data) => {
    return client(
        {
            method: 'post',
            url: '/api/myblog/v1/tokens',
            data: data
        }
    )
}