import * as helpers from './helpers';
import { CartApiEndpoints } from './cart.api';
import { CoursesApiEndpoints } from './courses.api';

export const Api = {
    ...helpers,
    courses: CoursesApiEndpoints,
    cart: CartApiEndpoints,
};
