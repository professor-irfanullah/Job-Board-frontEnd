<template>
  <main class="bg-gray-50 min-h-screen">
    <div class="container mx-auto p-4">
      <!-- Back Button -->
      <div class="mb-4">
        <button
          @click="closeModel"
          class="text-indigo-600 hover:underline flex items-center text-sm"
        >
          <svg
            class="h-5 w-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Jobs
        </button>
      </div>

      <!-- Job Header -->
      <div class="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div class="flex items-center gap-4">
            <img
              :src="jobs.company_logo"
              alt="Company Logo"
              class="h-16 w-16 object-contain rounded-md border"
            />
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ jobs.title }}</h1>
              <p class="text-sm text-gray-600">
                {{ jobs.company_name }} • {{ jobs.location }}
              </p>
              <div class="flex flex-wrap gap-2 mt-2 text-sm">
                <span
                  class="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs font-medium"
                >
                  {{ jobs.employment_type }}
                </span>
                <span
                  v-if="jobs.is_remote"
                  class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium"
                >
                  Remote
                </span>
              </div>
            </div>
          </div>
          <div class="text-right">
            <p class="text-lg font-bold text-gray-900">
              ${{ jobs.salary_min }} - ${{ jobs.salary_max }}
              <span v-if="jobs.employment_type === 'Contract'">/hr</span>
              <span v-else>/year</span>
            </p>
            <p class="text-sm text-gray-500">
              Posted: {{ new Date(jobs.posted_at).toISOString().split("T")[0] }}
            </p>
            <p class="text-sm text-gray-500">
              Deadline:
              {{
                new Date(jobs.application_deadline).toISOString().split("T")[0]
              }}
            </p>
          </div>
        </div>
      </div>

      <!-- Job Description -->
      <div class="bg-white p-6 rounded-xl shadow-sm space-y-6">
        <section>
          <h2 class="text-lg font-semibold text-gray-800 mb-2">
            Job Description
          </h2>
          <p class="text-gray-700 leading-relaxed whitespace-pre-line">
            {{ jobs.description }}
          </p>
        </section>

        <!-- Responsibilities -->
        <section v-if="jobs.responsibilities">
          <h2 class="text-lg font-semibold text-gray-800 mb-2">
            Responsibilities
          </h2>
          <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li>
              {{ jobs.responsibilities }}
            </li>
          </ul>
        </section>

        <!-- Requirements -->
        <section v-if="jobs.requirements">
          <h2 class="text-lg font-semibold text-gray-800 mb-2">Requirements</h2>
          <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li>{{ jobs.requirements }}</li>
          </ul>
        </section>

        <!-- Perks / Benefits -->
        <section v-if="jobs.perks?.length">
          <h2 class="text-lg font-semibold text-gray-800 mb-2">
            Perks & Benefits
          </h2>
          <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li v-for="(perk, index) in job.perks" :key="index">{{ perk }}</li>
          </ul>
        </section>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 border-t pt-6">
          <button
            v-if="store.isAuthenticated"
            class="px-6 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition"
          >
            Quick Apply
          </button>
          <button
            v-else
            class="px-6 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition"
          >
            Registered Only
          </button>
          <button
            @click="closeModel"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/useUserState";
const store = useAuthStore();
const job = ref({});
const date = new Date();
const props = defineProps({
  jobs: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close"]);
const closeModel = () => {
  emit("close");
};
</script>

