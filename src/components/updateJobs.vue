<template>
  <main class="bg-gray-50 min-h-screen">
    <div class="container mx-auto p-4 max-w-4xl">
      <!-- Back Button -->
      <div class="mb-4">
        <button
          @click="closeModal"
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

      <!-- Form Header -->
      <div class="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Edit Job Posting</h1>
        <p class="text-sm text-gray-600">
          Edit the details below to
          {{ "update" }} your job listing
        </p>
      </div>

      <!-- Job Posting Form -->
      <div class="bg-white p-6 rounded-xl shadow-sm space-y-6">
        <form @submit.prevent="updateJob">
          <!-- Title -->
          <div class="space-y-2">
            <label for="title" class="block text-sm font-medium text-gray-700">
              Job Title *
            </label>
            <input
              v-model.trim="form.title"
              type="text"
              id="title"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g. Senior Frontend Developer"
            />
          </div>

          <!-- Description -->
          <div class="space-y-2">
            <label
              for="description"
              class="block text-sm font-medium text-gray-700"
            >
              Job Description *
            </label>
            <textarea
              v-model.trim="form.description"
              required
              id="description"
              rows="5"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Describe the role, team, and company culture..."
            ></textarea>
          </div>

          <!-- Requirements -->
          <div class="space-y-2">
            <label
              for="requirements"
              class="block text-sm font-medium text-gray-700"
            >
              Requirements *
            </label>
            <textarea
              v-model.trim="form.requirements"
              id="requirements"
              required
              rows="5"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="List the required skills, qualifications, and experience..."
            ></textarea>
          </div>

          <!-- Responsibilities -->
          <div class="space-y-2">
            <label
              for="responsibilities"
              class="block text-sm font-medium text-gray-700"
            >
              Responsibilities
            </label>
            <textarea
              v-model.trim="form.responsibilities"
              id="responsibilities"
              required
              rows="3"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Describe the day-to-day responsibilities..."
            ></textarea>
          </div>

          <!-- Location & Remote -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label
                for="location"
                class="block text-sm font-medium text-gray-700"
              >
                Location *
              </label>
              <input
                v-model.trim="form.location"
                type="text"
                id="location"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="e.g. San Francisco, CA or Remote"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                Remote Work
              </label>
              <div class="flex items-center mt-1">
                <input
                  v-model="form.is_remote"
                  id="is_remote"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label for="is_remote" class="ml-2 block text-sm text-gray-700">
                  This is a remote position
                </label>
              </div>
            </div>
          </div>

          <!-- Employment Type -->
          <div class="space-y-2">
            <label
              for="employment_type"
              class="block text-sm font-medium text-gray-700"
            >
              Employment Type *
            </label>
            <select
              v-model="form.employment_type"
              id="employment_type"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled selected>Select employment type</option>
              <option value="Full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="temporary">Temporary</option>
            </select>
          </div>

          <!-- Salary Range -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label
                for="salary_min"
                class="block text-sm font-medium text-gray-700"
              >
                Minimum Salary *
              </label>
              <div class="relative rounded-md shadow-sm">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <span class="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  v-model.number="form.salary_min"
                  required
                  type="number"
                  id="salary_min"
                  min="0"
                  class="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="0"
                />
                <div
                  class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                >
                  <span class="text-gray-500 sm:text-sm">
                    {{ form.employment_type === "contract" ? "/hr" : "/yr" }}
                  </span>
                </div>
              </div>
            </div>
            <div class="space-y-2">
              <label
                for="salary_max"
                class="block text-sm font-medium text-gray-700"
              >
                Maximum Salary *
              </label>
              <div class="relative rounded-md shadow-sm">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <span class="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  v-model.number="form.salary_max"
                  type="number"
                  required
                  id="salary_max"
                  min="0"
                  class="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="0"
                />
                <div
                  class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                >
                  <span class="text-gray-500 sm:text-sm">
                    {{ form.employment_type === "contract" ? "/hr" : "/yr" }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Status -->
          <div class="flex gap-4 items-center flex-wrap mb-2">
            <div class="space-y-2 flex-1">
              <label
                for="status"
                class="block text-sm font-medium text-gray-700"
              >
                Status *
              </label>
              <select
                v-model="form.status"
                id="status"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled selected>Select status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending Approval</option>
              </select>
            </div>
            <div class="space-y-2 flex- overflow-hidden">
              <label
                for="deadline"
                class="block text-sm font-medium text-gray-700"
              >
                Deadline *
              </label>
              <input
                type="date"
                required
                v-model="form.application_deadline"
                id="deadline"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div class="statusMessages">
            <h1
              v-if="errMessage"
              class="text-red-400 font-medium mt-2 animate-pulse"
            >
              {{ errMessage }}
            </h1>
            <h1
              v-if="responseMessage"
              class="text-green-400 font-medium mt-2 animate-pulse"
            >
              {{ responseMessage }} ,
            </h1>
          </div>

          <!-- Form Actions -->
          <div class="flex flex-col sm:flex-row gap-3 border-t pt-6">
            <button
              type="submit"
              class="px-6 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition flex items-center justify-center disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              Update Job
            </button>
            <button
              type="button"
              @click="closeModal"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import axios from "axios";
import { ref, computed } from "vue";
import api from "../api/api";
const updatingUrl = "http://localhost:3000/api/employee/update/job";
const errMessage = ref("");
const responseMessage = ref("");
const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
});
const form = computed(() => ({
  ...props.job,
  application_deadline: new Date(props.job.application_deadline)
    .toISOString()
    .split("T")[0],
}));

// props.job[0];
const updateJob = async () => {
  console.log(form.value);
  try {
    const response = await api.post(
      "/api/employee/update/job",
      {
        application_deadline: form.value.application_deadline,
        description: form.value.description,
        employee_id: form.value.employer_id,
        employement_type: form.value.employment_type,
        is_remote: form.value.is_remote,
        job_id: form.value.job_id,
        location: form.value.location,
        requirements: form.value.requirements,
        responsibilities: form.value.responsibilities,
        salary_max: form.value.salary_max,
        salary_min: form.value.salary_min,
        status: form.value.status,
        title: form.value.title,
      },
      { withCredentials: true }
    );
    errMessage.value = "";
    responseMessage.value = response.data.msg;
    console.log(response.data.msg);
  } catch (error) {
    errMessage.value = error.response.data.err;
    responseMessage.value = "";
    console.error(error.response.data.err);
  }
};
</script>