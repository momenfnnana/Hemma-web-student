export const getQuery=  (query) =>{

    const urlSearchParams = new URLSearchParams(window.location.search);

    const value = urlSearchParams.get(query);

    return value

}