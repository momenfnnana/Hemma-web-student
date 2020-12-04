import * as helpers from "./helpers";
import { CartApiEndpoints } from "./cart.api";
import { CoursesApiEndpoints } from "./courses.api";
import { AuthApiEndpoints } from "./auth.api";
import { UserApiEndpoints } from "./user.api";
import { SubscriptionApiEndpoints } from "./subscription.api";
import { CategoriesApiEndpoints } from "./categories.api";
import { readyApiEndpoints } from "./health.api";

export const Api = {
  ...helpers,
  courses: CoursesApiEndpoints,
  cart: CartApiEndpoints,
  auth: AuthApiEndpoints,
  user: UserApiEndpoints,
  subscription: SubscriptionApiEndpoints,
  categories: CategoriesApiEndpoints,
  healthy: readyApiEndpoints
};
