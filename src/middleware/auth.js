/**
 * @returns {boolean}
 */

const isAuth = () => {
  return true;
};

/**
 *
 * @returns {import("vue-router").RouteLocationRaw} - Location raw router
 */
const onlyUser = () => {
  return isAuth() ? true : { name: "login" };
};
/**
 *
 * @returns {import("vue-router").RouteLocationRaw} - Location raw router
 */
const onlyGuess = () => {
  return !isAuth() ? true : { name: "home" };
};

export { onlyUser, onlyGuess };
