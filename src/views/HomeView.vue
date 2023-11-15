<template>
  <main>
    <button class="bg-blue-500 px-4 py-2 rounded-md" @click="toLogin">
      Login
    </button>
    <div>{{ $t("hello") }}</div>
    <select
      class="px-4 py-2 rounded-md border border-green-500"
      v-model="current_lang"
    >
      <option v-for="lang in SUPPORT_LANGS" :value="lang" :key="lang">
        {{ lang }}
      </option>
    </select>
  </main>
</template>
<script setup>
import { useToast } from "@/utils/toast";
import { setI18nLanguage, SUPPORT_LANGS, i18n } from "@/utils/i18n";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const toLogin = () => router.push({ name: "test" });
const toast = useToast();
toast.success("Hello");
const current_lang = ref(i18n.global.locale);
watch(current_lang, () => {
  setI18nLanguage(current_lang.value);
});
</script>
