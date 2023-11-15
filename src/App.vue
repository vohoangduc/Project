<template>
  <transition
    leave-to-class="opacity-0 transition-all absolute inset-0 duration-[0ms]"
    enter-from-class="opacity-0 transition-all absolute inset-0 duration-[300ms]"
    enter-to-class="opacity-1 transition-all duration-[300ms]"
  >
    <component :is="layout">
      <router-view v-slot="{ Component }">
        <transition
          leave-to-class="opacity-0 transition-all absolute inset-0 duration-[0ms]"
          enter-from-class="opacity-0 transition-all absolute inset-0 duration-[500ms]"
          enter-to-class="opacity-1 transition-all duration-[500ms]"
          :duration="500"
        >
          <Suspense timeout="0">
            <component :is="Component" />
            <template #fallback>
              <PageLoading />
            </template>
          </Suspense>
        </transition>
      </router-view>
    </component>
  </transition>
</template>
<script setup>
import * as types from "@/types";
import { computed } from "vue";
import { useRoute } from "vue-router";
import AuthLayout from "./layouts/AuthLayout.vue";
import DefaultLayout from "./layouts/DefaultLayout.vue";
import PageLoading from "./pages/PageLoading.vue";

const route = useRoute();
/**
 * @type {types.layouts}
 */
const layouts = {
  AuthLayout,
  DefaultLayout,
};
const layout = computed(
  () => layouts[route.meta.layout] ?? layouts.DefaultLayout
);
</script>
