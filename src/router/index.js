import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/LoginView.vue";
import TestView from "../views/TestView.vue";
import { onlyUser, onlyGuess } from "../middleware/auth";
import { useTitle } from "@vueuse/core";
import * as types from "@/types";

const title = useTitle("Vue 3 Template", {
  titleTemplate: "%s | Paracel Technology ",
});

/**
 * @typedef   {object}        meta
 * @property  {types.layouts}        [layout=DefaultLayout]      - The layout's of page
 * @property  {string}        title       - The title's of page
 * @property  {Function[]?}   middleware  - The handle middleware before active page
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      /**
       * @type {meta}
       */
      meta: {
        layout: "DefaultLayout",
        title: "Home",
        middleware: [onlyUser],
      },
    },
    {
      path: "/test",
      name: "test",
      component: TestView,
      /**
       * @type {meta}
       */
      meta: {
        layout: "DefaultLayout",
        title: "Test",
        middleware: [onlyUser],
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      /**
       * @type {meta}
       */
      meta: {
        layout: "AuthLayout",
        title: "Login",
        middleware: [onlyGuess],
      },
    },
  ],
});

router.beforeEach(async (to, from) => {
  /**
   * @type {meta}
   */
  const toMeta = to.meta;
  const middleware = toMeta.middleware;
  if (middleware && middleware.constructor === Array) {
    for (const handle of middleware) {
      if (handle.constructor !== Function) continue;
      const res = await handle(to, from);
      if (res !== true) return res;
    }
  }
  if (toMeta.title) title.value = toMeta.title;
});

export default router;
