<template>
  <main class="bg-gray-50 flex flex-col space-y-3">
    <header class="p-4 shadow-md bg-white">
      <div class="welcomeNote py-2">
        <h1 class="font-bold font-sans w200:text-2xl w600:text-3xl">
          Welcome, John Doe!
        </h1>
        <p class="text-sm w400:font-medium">
          Here's what's happening with your job search
        </p>
      </div>
    </header>
    <section
      class="details grid gap-4 grid-cols-1 w700:grid-cols-2 w-[95%] mx-auto p-4"
    >
      <div
        @click="handleNavigation('/dashboard')"
        class="card hover:cursor-pointer hover:transition p-6 bg-white rounded-xl border-l-4 border-blue-500 flex flex-col gap-2 hover:shadow-md transition"
      >
        <div class="iconandHeading flex justify-between items-center">
          <h1 class="text-lg font-semibold text-gray-500">New Job Matches</h1>
          <p class="border px-3 py-3 rounded-full bg-blue-200">
            <f-a-c class="text-blue-700 text-xl" :icon="faBriefcase" />
          </p>
        </div>
        <h1 class="font-bold text-2xl">5</h1>
        <router-link
          to="/dashboard"
          class="text-blue-500 font-semibold text-sm"
        >
          View recommentadions
          <f-a-c class="text-black" :icon="faChevronRight" />
        </router-link>
      </div>
      <div
        @click="handleNavigation('/applications')"
        class="card hover:cursor-pointer hover:transition p-6 bg-white rounded-xl border-l-4 border-yellow-500 flex flex-col gap-2 hover:shadow-md transition"
      >
        <div class="iconandlogo flex justify-between items-center">
          c
          <h1 class="text-lg font-semibold text-gray-500">
            Application Pending
          </h1>
          <p class="border px-3 py-2 rounded-full bg-yellow-200">
            <f-a-c class="text-yellow-700 text-xl" :icon="faFileAlt" />
          </p>
        </div>
        <h1 class="font-bold text-2xl">3</h1>
        <router-link
          to="/applications"
          class="text-yellow-500 font-semibold text-sm"
        >
          View applications
          <f-a-c class="text-black" :icon="faChevronRight" />
        </router-link>
      </div>
      <div
        @click="handleNavigation('/profile')"
        class="card hover:cursor-pointer hover:transition p-6 bg-white rounded-xl border-l-4 border-green-500 flex flex-col gap-2 hover:shadow-md transition"
      >
        <div class="iconandlogo flex justify-between items-center">
          <h1 class="text-lg font-semibold text-gray-500">
            Application Pending
          </h1>
          <p class="border px-3 py-2 rounded-full bg-green-200">
            <f-a-c class="text-green-700 text-xl" :icon="faShieldAlt" />
          </p>
        </div>
        <h1 class="font-bold text-2xl">80%</h1>
        <!-- <input type="range" readonly /> -->
        <div class="outer bg-gray-100 h-2.5 rounded-full">
          <div
            class="inner h-2.5 bg-green-400 rounded-full"
            style="max-width: 100%; width: 80%"
          ></div>
        </div>
        <router-link to="/profile" class="text-green-500 font-semibold text-sm">
          Complete your profile
        </router-link>
      </div>
    </section>
    <!-- quick actions -->
    <section class="quick bg-white w-[95%] p-4 mx-auto rounded-md shadow-md">
      <div class="quikAction">
        <h1 class="font-bold text-xl">Quick Actions</h1>
      </div>
      <section class="actions flex flex-col gap-3 p-4">
        <router-link
          to="/upload-resume"
          class="resume flex items-center gap-4 border p-4 rounded-md hover:cursor-pointer hover:bg-gray-50 transition"
        >
          <div class="icon px-4 py-3 rounded-full bg-blue-100">
            <f-a-c class="text-xl text-blue-600" :icon="faFileUpload" />
          </div>
          <div class="text flex flex-col">
            <h1 class="font-semibold">Upload Resume</h1>
            <small>Increase your chances</small>
          </div>
        </router-link>
        <router-link
          to="/profile"
          class="profile flex items-center gap-4 border p-4 rounded-md hover:cursor-pointer hover:bg-gray-50 transition"
        >
          <div class="icon px-3 py-3 rounded-full bg-green-100">
            <f-a-c class="text-green-600 text-xl" :icon="faUserEdit" />
          </div>
          <div class="text flex flex-col">
            <h1 class="font-semibold">Complete your Profile</h1>
            <small>Increase your chances</small>
          </div>
        </router-link>
        <router-link
          to="/job-alerts"
          class="alerts flex items-center gap-4 border p-4 rounded-md hover:cursor-pointer hover:bg-gray-50 transition"
        >
          <div class="icon text-xl py-2 px-3 rounded-full bg-purple-100">
            <f-a-c class="text-xl text-purple-600" :icon="faBell" />
          </div>
          <div class="text flex flex-col">
            <h1 class="font-semibold">Job Alerts</h1>
            <small>Increase your chances</small>
          </div>
        </router-link>
        <router-link
          to="/saved-jobs"
          class="saved flex items-center gap-4 border p-4 rounded-md hover:cursor-pointer hover:bg-gray-50 transition"
        >
          <div class="icon px-3 py-2 rounded-full bg-red-100">
            <f-a-c class="text-xl text-red-600" :icon="faHeart" />
          </div>
          <div class="text flex flex-col">
            <h1 class="font-semibold">Saved Jobs</h1>
            <small>Increase your chances</small>
          </div>
        </router-link>
      </section>
    </section>
  </main>
</template>
<script setup>
import { ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBriefcase,
  faFileAlt,
  faShieldAlt,
  faFileUpload,
  faUserEdit,
  faBell,
  faHeart,
  faFile,
  faCheckCircle,
  faTimesCircle,
  faClock,
  faChevronRight,
  faTimes,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "vue-router";

// Add icons to library
library.add(
  faBriefcase,
  faFileAlt,
  faShieldAlt,
  faFileUpload,
  faUserEdit,
  faBell,
  faHeart,
  faFile,
  faCheckCircle,
  faTimesCircle,
  faClock,
  faChevronRight,
  faTimes,
  faCloudUploadAlt
);
const router = useRouter();
const handleNavigation = (route) => {
  router.push(route);
};
</script>