<template>
  <main class="p-4 max-w-[900px] mx-auto">
    <header
      class="header rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-md max-w-[900px] mx-auto p-4"
    >
      <div
        class="flex flex-col gap-2 items-cente flex-wrap justify-around w700:flex-row w700:items-center"
      >
        <section
          class="profile&info flex items-center flex-wrap w600:gap-2 gap-1"
        >
          <div v-if="companyInfo?.profile_photo_url" class="imageIcon relative">
            <div
              class="img w-[50px] h-[50px] w200:w-[100px] w200:h-[100px] rounded-full overflow-hidden border-2 w200:border-4"
            >
              <img
                class="w-[50px] h-[50px] w200:w-[100px] w200:h-[100px] flex items-center justify-center bg-white"
                alt="Profile"
                :src="
                  companyInfo?.profile_photo_url ||
                  'https://via.placeholder.com/150?text=Company+Logo'
                "
              />
            </div>
            <div v-if="isEditing" class="profile">
              <label for="profile">
                <p
                  class="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-800 transition-all transform hover:scale-110 shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </p>
                <input
                  @change="handleLogoChange"
                  type="file"
                  class="hidden"
                  id="profile"
                  accept="image/jpg,image/png,image/jpeg"
                />
              </label>
            </div>
          </div>
          <div
            v-else
            class="imageIcon relative w-[5rem] h-[5rem] flex justify-center items-center text-4xl bg-green-400/25 text-gray-200 font-bold rounded-full"
          >
            {{ companyInfo?.email?.charAt(0).toUpperCase() }}
            <div v-if="isEditing" class="profile">
              <label for="profile">
                <p
                  class="absolute top-10 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-800 transition-all transform hover:scale-110 shadow-md cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </p>
                <input
                  @change="handleLogoChange"
                  type="file"
                  class="hidden"
                  id="profile"
                  accept="image/jpg,image/png,image/jpeg"
                />
              </label>
            </div>
          </div>

          <div class="userInfo">
            <h1 class="text-white font-bold text-xl capitalize">
              {{ userStore?.user?.user?.name || "Company Name" }}
            </h1>
            <template v-if="!isEditing">
              <div v-if="companyInfo?.headline" class="">
                <p class="text-white text-sm">{{ companyInfo?.headline }}</p>
              </div>
              <div v-else class="">
                <p class="text-white text-sm">Add your company name</p>
              </div>
            </template>
          </div>
        </section>
        <div class="btn mt-2 w400:mt-0">
          <button
            @click="isEditing = !isEditing"
            class="px-5 py-2.5 bg-white text-indigo-700 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md flex items-center flex-wrap"
          >
            <span>{{ isEditing ? "Cancel Edit" : "Edit Profile" }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <div
            v-if="isEditing && logoInput"
            :title="companyInfo?.company_logo_url"
            class="btn mt-2"
          >
            <button
              @click="submitLogo"
              class="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition flex items-center shadow-sm cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p class="">{{ logoInput.name }}</p>
            </button>
            <div class="errInLogoUpload mt-2">
              <p v-if="errInLogoUpload" class="text-red-400">
                {{ errInLogoUpload }}
              </p>
              <p v-if="successLogoUpload" class="text-green-300">
                {{ successLogoUpload }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section class="details">
      <div class="mb-8 p-4 rounded-md bg-gray-50">
        <div class="flex items-center mb-4 mt-4">
          <div class="bg-indigo-100 p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-800 ml-3">About</h2>
        </div>
        <template v-if="!isEditing">
          <div v-if="companyInfo?.about">
            <p class="text-gray-600 whitespace-pre-line pl-11">
              {{ companyInfo?.about }}
            </p>
          </div>
          <div v-else>
            <p class="text-gray-600 whitespace-pre-line pl-11">
              Tell job seekers about your company, culture, and values.
            </p>
          </div>
        </template>
        <template v-else>
          <textarea
            @focus="enableButtonAgain"
            class="w-full p-2 border"
            rows="4"
            v-model.trim="companyInfo.about"
            placeholder="About your company"
          ></textarea>
          <p class="text-xs text-gray-500 mt-1">
            This will be displayed on your public profile.
          </p>
        </template>
      </div>
      <div class="mb-8 p-4 rounded-md bg-gray-50">
        <div class="flex items-center mb-4">
          <div class="bg-indigo-100 p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-800 ml-3">
            Personal Information
          </h2>
        </div>
        <div class="space-y-5 pl-11">
          <div>
            <label class="block text-sm font-medium text-gray-500 mb-1"
              >Email Address</label
            >
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p class="text-gray-700 text-wrap overflow-auto">
                {{ store?.profileInfo?.email }}
              </p>
            </div>
            <div class="mt-3">
              <label class="block text-sm font-medium text-gray-500 mb-1"
                >Role Assigned</label
              >
              <template v-if="!isEditing">
                <div v-if="companyInfo?.job_role" class="">
                  <div class="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    <p class="text-indigo-600 hover:underline">
                      {{ companyInfo?.job_role }}
                    </p>
                  </div>
                </div>
                <div v-else class="">
                  <div class="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    <p class="text-gray-700">
                      {{ "Not specified" }}
                    </p>
                  </div>
                </div>
              </template>
              <template v-else>
                <input
                  v-model.trim="companyInfo.job_role"
                  type="text"
                  @focus="enableButtonAgain"
                  class="read-only:cursor-not-allowed w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="https://yourcompany.com"
                  readonly
                />
              </template>
            </div>
            <div class="mt-3">
              <label class="block text-sm font-medium text-gray-500 mb-1"
                >Headline</label
              >
              <template v-if="!isEditing">
                <div v-if="companyInfo?.headline" class="">
                  <div class="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <p class="text-gray-700">
                      {{ companyInfo?.headline }}
                    </p>
                  </div>
                </div>
                <div v-else class="">
                  <div class="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <p class="text-gray-700">
                      {{ "Not specified" }}
                    </p>
                  </div>
                </div>
              </template>
              <template v-else>
                <input
                  v-model.trim="companyInfo.headline"
                  type="text"
                  @focus="enableButtonAgain"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="E.g. Information Technology"
                />
              </template>
            </div>
            <p
              class="text-red-500 animate-pulse text-sm mt-2 font-medium capitalize"
              v-if="errorMessage && isEditing"
            >
              {{ errorMessage }}
            </p>
            <p
              v-if="responseMessage && isEditing"
              class="text-green-500 animate-pulse text-sm mt-2 font-medium capitalize"
            >
              {{ responseMessage }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="isEditing" class="mt-10 flex justify-end space-x-4">
        <button
          @click="isEditing = !isEditing"
          class="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
        >
          Cancel Edit
        </button>
        <button
          :disabled="disableBtn"
          @click="postProfile"
          class="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
        >
          <svg
            v-if="isSaving"
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>{{ isSaving ? "Saving..." : "Save Profile" }}</span>
        </button>
      </div>
    </section>
  </main>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useEmployeeStore } from "../../store/useEmployeeStore";
import { useAuthStore } from "../../store/useUserState";
import api from "../../api/api";

const store = useEmployeeStore();
const companyInfo = ref({});
const userStore = useAuthStore();
const isEditing = ref(false);
const logoInput = ref(null);
const isSaving = ref(false);
const disableBtn = ref(false);
const errorMessage = ref("");
const responseMessage = ref("");
const errInLogoUpload = ref("");
const successLogoUpload = ref("");

const postProfile = async () => {
  try {
    const response = await store.insertEmployeeProfile(companyInfo.value);
    responseMessage.value = response.msg;
  } catch (error) {
    console.log(error);
  } finally {
    await store.fetchEmployeeProfile();
    companyInfo.value = store?.profileInfo || {};
    isEditing.value = false;
  }
};
onMounted(async () => {
  await userStore.userAuthStatus();
  await store.fetchEmployeeProfile();
  companyInfo.value = store?.profileInfo;
});
</script>