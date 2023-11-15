import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
Promise.all([
  import("./utils/FontAwesome"),
  import("./utils/toast"),
  import("./utils/i18n"),
])
  .then(([{ default: FontAwesome }, { Toast, options }, { setupI18n }]) => {
    app.use(FontAwesome.FaConfig, FontAwesome.icons);
    app.use(Toast, options);
    app.use(setupI18n());
    app.component("FontAwesomeIcon", FontAwesome.VueFontAwesome);
  })
  .then(() => {
    app.mount("#app");
  });
