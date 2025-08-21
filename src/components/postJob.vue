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
        <h1 class="text-2xl font-bold text-gray-900 mb-2">
          {{ isEditing ? "Edit Job Posting" : "Create New Job Posting" }}
        </h1>
        <p class="text-sm text-gray-600">
          Fill in the details below to
          {{ isEditing ? "update" : "create" }} your job listing
        </p>
      </div>

      <!-- Job Posting Form -->
      <div class="bg-white p-6 rounded-xl shadow-sm space-y-6">
        <form @submit.prevent="submitForm">
          <!-- Title -->
          <div class="space-y-2">
            <label for="title" class="block text-sm font-medium text-gray-700">
              Job Title *
            </label>
            <input
              v-model.trim="form.title"
              type="text"
              id="title"
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
              <option value="full-time">Full-time</option>
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
                v-model="form.deadline"
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
              {{ responseMessage }}
            </h1>
          </div>

          <!-- Form Actions -->
          <div class="flex flex-col sm:flex-row gap-3 border-t pt-6">
            <button
              type="submit"
              class="px-6 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition flex items-center justify-center disabled:bg-indigo-400 disabled:cursor-not-allowed"
              :disabled="errMessage != '' || responseMessage != ''"
            >
              <svg
                v-if="isSubmitting"
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
              {{
                isSubmitting
                  ? "Processing..."
                  : isEditing
                  ? "Update Job"
                  : "Post Job"
              }}
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
import { ref, computed, onMounted } from "vue";
import { useEmployeeStore } from "../store/useEmployeeStore";
import api from "../api/api";

const employeeStore = useEmployeeStore();
const jobPostUrl = "http://localhost:3000/api/employee/post/job";
const emit = defineEmits(["close"]);
const closeModal = () => {
  emit("close");
};

const errMessage = ref("");
const responseMessage = ref("");
const props = defineProps({
  jobData: {
    type: Object,
    default: null,
  },
});

const isEditing = computed(() => !!props.jobData);

// Form data structure
const form = ref({
  title: "",
  description: "",
  requirements: "",
  responsibilities: "",
  location: "",
  employment_type: "",
  is_remote: false,
  salary_min: "",
  salary_max: "",
  status: "draft",
  deadline: "",
});

const isSubmitting = ref(false);

// If editing, populate form with existing data
onMounted(() => {
  if (props.jobData) {
    form.value = {
      ...props.jobData,
      is_remote: props.jobData.is_remote || false,
    };
  }
});

const submitForm = async () => {
  responseMessage.value = "Please wait..";
  errMessage.value = "";
  isSubmitting.value = true;
  try {
    const response = await api.post(
      "/api/employee/post/job",
      {
        title: form.value.title,
        description: form.value.description,
        requirements: form.value.requirements,
        responsibilities: form.value.responsibilities,
        location: form.value.location,
        employment_type: form.value.employment_type,
        is_remote: form.value.is_remote,
        salary_min: form.value.salary_min,
        salary_max: form.value.salary_max,
        status: form.value.status,
        application_deadline: form.value.deadline,
      },
      { withCredentials: true }
    );
    responseMessage.value = response.data.msg || "Operation Successful..";
    await employeeStore.fetchEmployeeAllJobs();
  } catch (error) {
    errMessage.value = error.response.data.err || "Something went wrong...";
    responseMessage.value = "";
    console.log(error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>