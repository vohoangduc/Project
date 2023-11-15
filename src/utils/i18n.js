import { createI18n } from "vue-i18n";

/**
 * @type {import("vue-i18n").I18n}
 */
let i18n;

const SUPPORT_LANGS = ["en", "jp", "vi"];

const loadMessage = async (i18n, locale) => {
  const messages = await import(`@/locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
};

const setI18nLanguage = async (locale) => {
  await loadMessage(i18n, locale);
  if (i18n.mode === "legacy") {
    i18n.global.locale = locale;
  } else {
    i18n.global.locale.value = locale;
  }
  document.querySelector("html").setAttribute("lang", locale);
};

const setupI18n = () => {
  i18n = createI18n({
    locale: "en",
  });
  setI18nLanguage(i18n.global.locale);
  return i18n;
};

export { setI18nLanguage, setupI18n, loadMessage, SUPPORT_LANGS, i18n };
