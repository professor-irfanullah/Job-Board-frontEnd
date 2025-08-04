<template>
  <nav class="p-4 shadow-md relative">
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
          v-if="store?.user?.user?.role === 'employee'"
          class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          to="/employee-dashboard"
          active-class="text-gray-900"
          >Dashboard</router-link
        >
        <router-link
          v-else
          class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          to="/home"
          active-class="text-gray-900"
          >Home</router-link
        >
        <router-link
          v-if="store?.user?.user?.role === 'employee'"
          class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          to="/my-jobs"
          active-class="text-gray-900"
          >My Jobs</router-link
        >
        <router-link
          v-else
          class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          to="/find-jobs"
          active-class="text-gray-900"
          >Find Jobs</router-link
        >
        <router-link
          v-if="store?.user?.user?.role === 'employee'"
          class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          to="/applicants"
          active-class="text-gray-900"
          >Applicants</router-link
        >
        <router-link
          v-else
          class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          to="/finalJobs"
          active-class="text-gray-900"
          >Companies</router-link
        >
        <router-link
          v-if="store?.user?.user?.role === 'employee'"
          class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          to="/company-profile"
          active-class="text-gray-900"
          >Company Profile</router-link
        >

        <router-link
          v-else
          class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          to="/c"
          active-class="text-gray-900"
          >Career Resources</router-link
        >
      </div>
      <div v-if="store.isAuthenticated" class="right hidden w700:block">
        <div class="bell_and_user_icon flex justify-center items-center gap-3">
          <div @click="checkAuth" class="bell">
            <f-a-c
              icon="bell"
              class="text-2xl text-gray-400 hover:text-gray-500 cursor-pointer transition"
            />
          </div>
          <div
            ref="userMenuRef"
            @click="isUserMenuOpen = !isUserMenuOpen"
            class="relative cursor-pointer"
          >
            <img
              :src="store?.userInfo?.data?.photo_url || image_url"
              alt="User profile"
              class="w-9 h-9 rounded-full object-center border-2 border-white shadow-sm hover:border-gray-200 transition-all"
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
                class="userMenu absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
              >
                <div class="py-2 px-4">
                  <div class="userInfo mb-3 pb-2 border-b border-gray-100">
                    <p class="text-xs text-gray-400 font-medium">
                      Signed in as
                    </p>
                    <p class="text-sm font-medium text-gray-700 truncate">
                      {{ store?.user?.user?.email || "No email" }}
                    </p>
                  </div>

                  <div class="links flex flex-col space-y-1">
                    <router-link
                      class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded transition-colors"
                      to="/dashboard"
                      active-class="bg-gray-50 text-gray-900"
                    >
                      <svg
                        class="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                      Dashboard
                    </router-link>

                    <router-link
                      class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded transition-colors"
                      to="/profile"
                      active-class="bg-gray-50 text-gray-900"
                    >
                      <svg
                        class="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      My Profile
                    </router-link>

                    <router-link
                      class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded transition-colors"
                      to="/saved-jobs"
                      active-class="bg-gray-50 text-gray-900"
                    >
                      <svg
                        class="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                      Saved Jobs
                    </router-link>

                    <router-link
                      class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded transition-colors"
                      to="/applications"
                      active-class="bg-gray-50 text-gray-900"
                    >
                      <svg
                        class="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      Applications
                    </router-link>

                    <router-link
                      class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded transition-colors"
                      to="/accountSetting"
                      active-class="bg-gray-50 text-gray-900"
                    >
                      <svg
                        class="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Account Settings
                    </router-link>
                  </div>

                  <div class="pt-2 mt-2 border-t border-gray-100">
                    <button
                      @click="handleSignOut"
                      class="flex w-full items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <svg
                        class="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div class="hidden w700:block" v-else>
        <router-link
          to="/login"
          class="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Sign Up
        </router-link>
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
        class="absolute top-16 right-0 w-full h-fit p-2 max-w-full min-w-0 overflow-y-auto w700:hidden z-50 bg-white shadow-md"
      >
        <div
          class="center flex flex-col space-y-1 text-gray-600 font-sans font-semibold text-sm px-4"
        >
          <router-link
            v-if="store?.user?.user?.role === 'employee'"
            @click="hideMobileMenuAfterClick"
            class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
            to="/employee-dashboard"
            active-class="text-gray-900"
            >Dashboard</router-link
          >
          <router-link
            v-else
            @click="hideMobileMenuAfterClick"
            class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
            to="/home"
            active-class="text-gray-900"
            >Home</router-link
          >
          <router-link
            v-if="store?.user?.user?.role === 'employee'"
            @click="hideMobileMenuAfterClick"
            class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
            to="/my-jobs"
            active-class="text-gray-900"
            >My Jobs</router-link
          >
          <router-link
            v-else
            @click="hideMobileMenuAfterClick"
            class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
            to="/find-jobs"
            active-class="text-gray-900"
            >Find Jobs</router-link
          >
          <router-link
            v-if="store?.user?.user?.role === 'employee'"
            @click="hideMobileMenuAfterClick"
            class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
            to="/applicants"
            active-class="text-gray-900"
            >Applicants</router-link
          >
          <router-link
            v-else
            @click="hideMobileMenuAfterClick"
            class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
            to="/findJobs"
            active-class="text-gray-900"
            >Companies</router-link
          >
          <router-link
            v-if="store?.user?.user?.role === 'employee'"
            @click="hideMobileMenuAfterClick"
            class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
            to="/company-profile"
            active-class="text-gray-900"
            >Company Profile</router-link
          >
          <router-link
            v-else
            @click="hideMobileMenuAfterClick"
            class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
            to="/c"
            active-class="text-gray-900"
            >Career Resources</router-link
          >
        </div>
        <div
          v-if="store.isAuthenticated"
          class="mt-4 flex items flex-col border-t px-4 mb-4"
        >
          <div class="links flex flex-col space-y-1">
            <div
              class="userInfo cursor-default mb-2 break-words flex items-center gap-4"
            >
              <div class="img">
                <img
                  :src="store?.userInfo?.data?.photo_url || image_url"
                  alt="user logo"
                  class="w-8 h-8 rounded-full"
                />
              </div>
              <div class="info">
                <small>{{ store.user.user.name || "Professor Irfan" }}</small>
                <p class="break-words">
                  {{ store.user.user.email || "irfanprofessor60@gmail.com" }}
                </p>
              </div>
            </div>
            <router-link
              v-if="store?.user?.user?.role === 'seeker'"
              @click="hideMobileMenuAfterClick"
              class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
              to="/dashboard"
              >Dashboard</router-link
            >
            <router-link
              v-if="store?.user?.user?.role === 'seeker'"
              @click="hideMobileMenuAfterClick"
              class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
              to="/profile"
              >My Profile</router-link
            >
            <router-link
              v-else
              @click="hideMobileMenuAfterClick"
              class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
              to="/my-profile"
              >My Profile</router-link
            >
            <router-link
              v-if="store?.user?.user?.role === 'seeker'"
              @click="hideMobileMenuAfterClick"
              class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
              to="/dashboard"
              >Saved Jobs</router-link
            >
            <router-link
              v-if="store?.user?.user?.role === 'seeker'"
              @click="hideMobileMenuAfterClick"
              class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
              to="/applications"
              >Applications</router-link
            >
            <router-link
              v-if="store?.user?.user?.role === 'seeker'"
              @click="hideMobileMenuAfterClick"
              class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
              to="/accountSetting"
              >Account Settings</router-link
            >
            <router-link
              v-else
              @click="hideMobileMenuAfterClick"
              class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
              to="/employee-accountSetting"
              >Account Settings</router-link
            >
            <button
              @click="handleSignOut"
              class="border-transparent text-gray-500 font-medium text-sm inline-flex p-2 hover:rounded-md hover:bg-[rgba(240,248,255,0.8)] transition"
            >
              Sign out
            </button>
          </div>
        </div>
        <div class="mt-2" v-else>
          <hr />
          <div class="button text-sm p-2 mt-2 w-fit ml-2">
            <router-link
              to="/login"
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
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useAuthStore } from "../store/useUserState";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
const image_url = ref(
  "https://res.cloudinary.com/dvrlvz76t/image/upload/v1752045266/Fa-Team-Fontawesome-FontAwesome-Circle-User.512_1_xpral9.png"
);
const router = useRouter();
const store = useAuthStore();
const isMobileMenuOpen = ref(false);
const { isAuthenticated } = storeToRefs(store);
const userMenuRef = ref(null);
const isUserMenuOpen = ref(false);
const hideMobileMenuAfterClick = () => {
  isMobileMenuOpen.value = false;
};

const handleSignOut = async () => {
  const privatePaths = [
    "/dashboard",
    "/profile",
    "/saved-job",
    "/accout-setting",
    "/sign-out",
    "/application",
  ];

  await store.logOut();
  await store.userAuthStatus();
  // console.log(router.currentRoute.value.path);

  setTimeout(() => {
    if (privatePaths.includes(router.currentRoute.value.path)) {
      router.push("/home");
    }
    isMobileMenuOpen.value = false;
  }, 1000);
};
const onClickOutside = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    isUserMenuOpen.value = false;
  }
};

onBeforeUnmount(() => {
  document.removeEventListener("click", onClickOutside);
});
onMounted(async () => {
  document.addEventListener("click", onClickOutside);
  await store.userAuthStatus();
  await store.getUserInformation();

  // console.log("hu from nav", response);
});
</script>