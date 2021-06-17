import { apiBaseUrl } from "./helpers";

export const successUrl = (limit =9,page = 1)=> `${apiBaseUrl}/Success?Limit=${limit}&Page=${page}`