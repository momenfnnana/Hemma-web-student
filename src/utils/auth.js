import { getByKey } from "./localStorage"
export const TOKEN_LOCALSTORAGE_KEY = 'token'

export const getToken = ()=>{
    const token = getByKey(TOKEN_LOCALSTORAGE_KEY)
    return token
}

export const getAuthHeader = ()=>({
    Authorization: `Bearer ${getToken()}`,
})