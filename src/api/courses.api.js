import {
    getAuthenticatedAxios,
    getDataFromResponse
} from './helpers';

export const CoursesApiEndpoints = {
    getRecentCourses: (page = 1, limit = 20) =>
        getAuthenticatedAxios().get('courses/recent', {
            params: {
                page,
                limit
            }
        })
        .then(getDataFromResponse),
};