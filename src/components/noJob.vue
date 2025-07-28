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
    <p class="mt-2 text-gray-500">
      Try adjusting your search or filter criteria
    </p>
    <button
      type="button"
      @click="resetFilters"
      class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition"
    >
      Reset Filters
    </button>
  </div>
</template>
<script setup>
const emits = defineEmits(["reset"]);
const resetFilters = () => {
  emits("reset");
};
</script>