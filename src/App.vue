<template>
  <main>
    <!-- <login />
    <testLoginAndFileUpload /> -->
    <navBar />
    <router-view />
  </main>
</template>
<script setup>
import testLoginAndFileUpload from "./components/tempCVupload.vue";
import login from "./components/testLoginAndFileUpload.vue";
import navBar from "./components/navBar.vue";
import { useAuthStore } from "../src/store/useUserState";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
const store = useAuthStore();
const { isAuthenticated } = storeToRefs(store);

onMounted(async () => {
  await store.userAuthStatus();
});
</script>