<template>
  <div
    v-if="store.isAuthenticated"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold text-gray-800">Quick Apply</h3>
        <button @click="hideModel" class="text-gray-400 hover:text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <form @submit.prevent="submitApplication" class="mt-4">
        <p class="text-gray-600 mb-6">
          You're applying for
          <span class="font-semibold">{{ jobs?.title }}</span> at
          <span class="font-semibold">{{ jobs?.location }}</span>
        </p>

        <div
          class="space-y-1 mx-auto flex justify-center items-center flex-col"
        >
          <label class="text-sm font-medium text-gray-600" for="selection"
            >Tell us why we should hire you!</label
          >
          <textarea
            name=""
            id="selection"
            cols="50"
            rows="3"
            class="p-2 border overflow-hidden outline-blue-400 rounded-md transition text-sm font-serif"
            required
            placeholder="What makes you fit for this job"
            v-model.trim="textInput"
          ></textarea>

          <div class="messages mt-2">
            <p
              v-if="responseMsg"
              class="text-sm font-medium text-green-500 capitalize animate-pulse"
            >
              {{ responseMsg }}
            </p>
            <p
              v-if="errMsg"
              class="text-sm font-medium text-red-500 capitalize animate-pulse"
            >
              {{ errMsg }}
            </p>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="hideModel"
            class="px-4 py-2 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <!-- @click="submitApplication" -->
          <button
            type="submit"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "../store/useUserState";
import axios from "axios";

const submitionURL = "http://localhost:3000/api/seeker/insert/job/application";
const emits = defineEmits(["hide"]);
const store = useAuthStore();
const textInput = ref("");
const errMsg = ref("");
const responseMsg = ref("");
const hideModel = () => {
  emits("hide");
};
const props = defineProps({
  jobs: Object,
});
const submitApplication = async () => {
  try {
    const response = await axios.post(
      submitionURL,
      {
        job_id: props?.jobs?.job_id,
        cover_letter: textInput.value,
      },
      { withCredentials: true }
    );
    responseMsg.value = response.data.msg;
    errMsg.value = "";
  } catch (error) {
    errMsg.value = error.response.data.err || "something went wrong";
    responseMsg.value = "";
  } finally {
    setTimeout(() => {
      errMsg.value = "";
      responseMsg.value = "";
      hideModel();
    }, 3000);
  }
};
onMounted(() => store.userAuthStatus());
</script>