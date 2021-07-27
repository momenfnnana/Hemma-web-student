export const getByKey = (key)=>{
    if(!key) return ''
    return localStorage.getItem(key)
}