export const getQuery = () => {
  const {location : {search}} = window
  const query = new URLSearchParams(search);

  const getQueryValue = (key) => {
    if (!key) return "";
    return query.get(key);
  };

  return [getQueryValue, query];
};

export const createQueryParam = (key,value)=>{
    return `&${key}=${value}`
}