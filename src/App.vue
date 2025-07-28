<template>
  <main>
    <navBar />
    <router-view v-slot="{ Component }">
      <transition name="fade-slide">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>
<style scoped>
/* The transition name is "fade-slide" */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(20px); /* Slide up/down */
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>

<script setup>
import testLoginAndFileUpload from "./components/tempCVupload.vue";
import login from "./components/testLoginAndFileUpload.vue";
import navBar from "./components/navBar.vue";
import { useAuthStore } from "../src/store/useUserState";
import { onMounted } from "vue";
const store = useAuthStore();

onMounted(async () => {
  await store.userAuthStatus();
});
</script>