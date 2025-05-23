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
import navBar from "./components/customNavbar.vue";
</script>