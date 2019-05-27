import * as helpers from "./helpers";
import { CartApiEndpoints } from "./cart.api";
import { CoursesApiEndpoints } from "./courses.api";
import { AuthApiEndpoints } from "./auth.api";
import { UserApiEndpoints } from "./user.api";

export const Api = {
  ...helpers,
  courses: CoursesApiEndpoints,
  cart: CartApiEndpoints,
  auth: AuthApiEndpoints,
  user: UserApiEndpoints
};
