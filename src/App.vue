<template>
  <main>
    <navBar />
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>
<style scoped>
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