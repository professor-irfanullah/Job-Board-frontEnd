<template>
  <div class="mt-3 bg-white rounded-xl shadow-sm p-8 text-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-12 w-12 mx-auto text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <h3 class="mt-4 text-lg font-medium text-gray-900">No jobs found</h3>
    <p
      v-if="authStore?.user?.user?.role === 'seeker'"
      class="mt-2 text-gray-500"
    >
      Try adjusting your search or filter criteria
    </p>
    <p v-else class="mt-1 text-sm text-gray-500">
      Get started by posting a new job opening.
    </p>
    <button
      :disabled="props.button === 'Add Company Profile First'"
      type="button"
      @click="resetFilters"
      class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition disabled:bg-indigo-400 disabled:cursor-not-allowed"
    >
      {{ props.button }}
    </button>
  </div>
</template>
<script setup>
import { useAuthStore } from "../store/useUserState";

const authStore = useAuthStore();
const props = defineProps({
  button: {
    type: String,
    default: "Reset Filters",
  },
});
const emits = defineEmits(["reset"]);
const resetFilters = () => {
  emits("reset");
};
</script>