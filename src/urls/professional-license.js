export const specUrl = `${process.env.REACT_APP_API_ENDPOINT}/Packages/SpecialCourse`;
export const generalUrl = `${process.env.REACT_APP_API_ENDPOINT}/Packages/GeneralCourse`;
export const getTrinerInfoUrl = (id) =>
  `${process.env.REACT_APP_API_ENDPOINT}/Users/instructor/${id}`;
export const getTotalsUrl = `${process.env.REACT_APP_API_ENDPOINT}/Packages`;
export const noPackageSubscribtionUrl = `${process.env.REACT_APP_API_ENDPOINT}/cart_v2/items/courses`;
export const packageSubscribtionUrl = `${process.env.REACT_APP_API_ENDPOINT}/cart_v2/packages`;
export const checkCoursesUrl = `${process.env.REACT_APP_API_ENDPOINT}/cart_v2/items/checkcourses`;