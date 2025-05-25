<template>
  <nav class="p-4 shadow-md mb-2 relative">
    <div class="main flex justify-between items-center flex-wrap">
      <div class="left inline-flex items-center w200:gap-2">
        <img src="../../public/vite.svg" alt="" class="w200:h-8 w200:w-8" />
        <h1 class="font-bold hidden w200:block text-[12px] w250:text-lg">
          JobConnect
        </h1>
      </div>
      <div
        class="center hidden w700:flex space-x-8 text-gray-600 font-sans font-semibold text-sm"
      >
        <router-link
          class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          to="/home"
          active-class="text-gray-900"
          >Home</router-link
        >
        <router-link
          class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          to="/a"
          active-class="text-gray-900"
          >Find Jobs</router-link
        >
        <router-link
          class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          to="/b"
          active-class="text-gray-900"
          >Companies</router-link
        >
        <router-link
          class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          to="/c"
          active-class="text-gray-900"
          >Career Resources</router-link
        >
      </div>
      <div v-if="isAuthenticated" class="right hidden w700:block">
        <div class="bell_and_user_icon flex justify-center items-center gap-3">
          <div class="bell">
            <f-a-c
              icon="bell"
              class="text-2xl text-gray-400 hover:text-gray-500 cursor-pointer transition"
            />
          </div>
          <div
            @click="isUserMenuOpen = !isUserMenuOpen"
            class="img relative cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="user logo"
              class="w-8 h-8 rounded-full"
            />
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-show="isUserMenuOpen"
                class="userMenu absolute top-9 -right-3 w-[220px] h-full text-gray-600 font-sans font-semibold text-sm"
              >
                <div class="items bg-gray-100/90 p-2 rounded-md">
                  <div class="userInfo cursor-default mb-2">
                    <small>Signed in as</small>
                    <p>irfanprofessor60@gmail.com</p>
                  </div>
                  <div class="links flex flex-col gap-3">
                    <router-link
                      class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      to="/dashboard"
                      >Dashboard</router-link
                    >
                    <router-link
                      class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      to="/profile"
                      >My Profile</router-link
                    >
                    <router-link
                      class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      to="/dashboard"
                      >Saved Jobs</router-link
                    >
                    <router-link
                      class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      to="/dashboard"
                      >Applications</router-link
                    >
                    <router-link
                      class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      to="/dashboard"
                      >Account Settings</router-link
                    >
                    <router-link
                      class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      to="/dashboard"
                      >Sign out</router-link
                    >
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div class="hidden w700:block" v-else>
        <router-link
          class="border p-2 rounded-md bg-indigo-300 hover:bg-indigo-400 transition font-medium text-sm"
          to="/"
          >Sign Up</router-link
        >
      </div>
      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="bars w700:hidden text-2xl p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        aria-controls="mobile-menu"
      >
        <f-a-c v-if="!isMobileMenuOpen" icon="bars" class="block h-6 w-6" />
        <f-a-c v-else icon="xmark" class="block h-6 w-6" />
      </button>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isMobileMenuOpen"
        class="absolute top-16 right-0 w-full h-[40vh] max-w-full min-w-0 overflow-y-auto w700:hidden z-50 bg-white shadow-md"
      >
        <div
          class="center flex flex-col space-y-1 text-gray-600 font-sans font-semibold text-sm px-4"
        >
          <router-link
            @click="hideMobileMenuAfterClick"
            class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
            to="/home"
            active-class="text-gray-900"
            >Home</router-link
          >
          <router-link
            @click="hideMobileMenuAfterClick"
            class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
            to="/a"
            active-class="text-gray-900"
            >Find Jobs</router-link
          >
          <router-link
            @click="hideMobileMenuAfterClick"
            class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
            to="/b"
            active-class="text-gray-900"
            >Companies</router-link
          >
          <router-link
            @click="hideMobileMenuAfterClick"
            class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
            to="/c"
            active-class="text-gray-900"
            >Career Resources</router-link
          >
        </div>
        <div
          v-if="isAuthenticated"
          class="mt-4 flex items flex-col border-t px-4 mb-4"
        >
          <div class="links flex flex-col space-y-1">
            <div
              class="userInfo cursor-default mb-2 break-words flex items-center gap-4"
            >
              <div class="img">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="user logo"
                  class="w-8 h-8 rounded-full"
                />
              </div>
              <div class="info">
                <small>Professor Irfan</small>
                <p class="break-words">irfanprofessor60@gmail.com</p>
              </div>
            </div>
            <router-link
              @click="hideMobileMenuAfterClick"
              class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
              to="/dashboard"
              >Dashboard</router-link
            >
            <router-link
              @click="hideMobileMenuAfterClick"
              class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
              to="/profile"
              >My Profile</router-link
            >
            <router-link
              @click="hideMobileMenuAfterClick"
              class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
              to="/dashboard"
              >Saved Jobs</router-link
            >
            <router-link
              @click="hideMobileMenuAfterClick"
              class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
              to="/dashboard"
              >Applications</router-link
            >
            <router-link
              @click="hideMobileMenuAfterClick"
              class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
              to="/dashboard"
              >Account Settings</router-link
            >
            <router-link
              @click="hideMobileMenuAfterClick"
              class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
              to="/dashboard"
              >Sign out</router-link
            >
          </div>
        </div>
        <div class="mt-2" v-else>
          <hr />
          <div class="button text-sm p-2 mt-2 w-fit ml-2">
            <router-link
              to="/"
              class="font-medium border p-2 bg-blue-500/70 rounded-md hover:bg-blue-500/90 transition"
              @click="hideMobileMenuAfterClick"
              >Sign Up</router-link
            >
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>
<script setup>
import { ref } from "vue";

const isAuthenticated = ref(false);
const isMobileMenuOpen = ref(false);
const isUserMenuOpen = ref(false);

const hideMobileMenuAfterClick = () => {
  isMobileMenuOpen.value = false;
};
</script>