<template>
  <main class="bg-gray-50 min-h-screen p-4 relative">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
      >
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
            My Job Postings
          </h1>
          <p class="text-gray-600 mt-1">Manage your current job listings</p>
        </div>
        <button
          @click="showAddNewJobModal = true"
          class="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition flex items-center"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Post New Job
        </button>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div
          class="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0"
        >
          <div class="flex-1">
            <label for="search" class="sr-only">Search jobs</label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                v-model.trim="filters.search"
                id="search"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search jobs..."
                type="search"
              />
            </div>
          </div>
          <div class="w-full md:w-48">
            <select
              v-model="filters.status"
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">All Statuses</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div class="w-full md:w-48">
            <select
              v-model="filters.type"
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <button
            @click="resetFilters"
            class="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- Jobs List -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <!-- Table Header -->
        <div
          class="hidden w1300:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider overflow-x-auto"
        >
          <div class="col-span-4">Title</div>
          <div class="col-span-2">Type</div>
          <div class="col-span-2">Location</div>
          <div class="col-span-2">Salary Range</div>
          <div class="col-span-1">Status</div>
          <div class="col-span-1">Actions</div>
        </div>

        <!-- Jobs -->
        <div
          v-if="filteredJobs.length > 0"
          class="divide-y divide-gray-200 overflow-x-auo"
        >
          <div
            v-for="job in paginatedJobs"
            :key="job.job_id"
            class="grid grid-cols-1 w1300:grid-cols-12 gap-4 p-6 hover:bg-gray-50 transition"
          >
            <!-- Title Column -->
            <div class="md:col-span-4">
              <div class="flex items-center gap-2">
                <div
                  class="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center md:mr-4"
                >
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
                <div class="overflow-hidden">
                  <h3 class="text-base font-medium text-gray-800">
                    {{ job.title }}
                  </h3>
                  <p
                    class="text-center md:text-left text-sm text-gray-500 truncate"
                  >
                    {{ job.description }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Type Column -->
            <div class="md:col-span-2 flex items-center">
              <span
                class="px-2 py-1 text-xs rounded-full"
                :class="jobTypeClass(job.employment_type)"
              >
                {{ formatJobType(job.employment_type) }}
              </span>
              <span
                v-if="job.is_remote"
                class="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
              >
                Remote
              </span>
            </div>

            <!-- Location Column -->
            <div class="md:col-span-2 flex items-center text-sm text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {{ job.location }}
            </div>

            <!-- Salary Column -->
            <div class="md:col-span-2 flex items-center text-sm text-gray-800">
              ${{ job.salary_min }} - ${{ job.salary_max }}
              <span
                v-if="job.employment_type === 'contract'"
                class="text-gray-500 ml-1"
                >/hr</span
              >
              <span v-else class="text-gray-500 ml-1">/year</span>
            </div>

            <!-- Status Column -->
            <div class="md:col-span-1 flex items-center">
              <span
                class="px-2 py-1 text-xs rounded-full"
                :class="statusClass(job.status)"
              >
                {{ formatStatus(job.status) }}
              </span>
            </div>

            <!-- Actions Column -->
            <div class="md:col-span-1 flex items-center justify-end space-x-2">
              <div
                @click="JobDetailModalHandler(job, 'view')"
                class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                title="View"
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div
                @click="JobDetailModalHandler(job, 'edit')"
                class="text-gray-600 hover:text-gray-900 cursor-pointer"
                title="Edit"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <button
                @click="confirmDelete(job)"
                class="text-red-600 hover:text-red-900"
                title="Delete"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div v-else class="p-12 text-center relative">
          <nojob @reset="showAddNewJobModal = true" button="Post New Job" />
        </div>
        <!-- Pagination -->
        <div
          v-if="filteredJobs.length > 0"
          class="px-6 py-4 border-t border-gray-200 flex items-center justify-between"
        >
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div
            class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
          >
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{
                  (currentPage - 1) * itemsPerPage + 1
                }}</span>
                to
                <span class="font-medium">{{
                  Math.min(currentPage * itemsPerPage, filteredJobs.length)
                }}</span>
                of
                <span class="font-medium">{{ filteredJobs.length }}</span>
                results
              </p>
            </div>
            <div>
              <nav
                class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  @click="currentPage = Math.max(1, currentPage - 1)"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  :class="{
                    'cursor-not-allowed opacity-50': currentPage === 1,
                  }"
                >
                  <span class="sr-only">Previous</span>
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  v-for="page in totalPages"
                  :key="page"
                  @click="currentPage = page"
                  :class="{
                    'bg-indigo-50 border-indigo-500 text-indigo-600':
                      currentPage === page,
                    'bg-white border-gray-300 text-gray-500 hover:bg-gray-50':
                      currentPage !== page,
                  }"
                  class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  {{ page }}
                </button>
                <button
                  @click="currentPage = Math.min(totalPages, currentPage + 1)"
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  :class="{
                    'cursor-not-allowed opacity-50': currentPage === totalPages,
                  }"
                >
                  <span class="sr-only">Next</span>
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed z-10 inset-0 overflow-y-auo">
      <delete-job-model
        :jobToDelete="jobToDelete"
        @close-modal="showDeleteModal = false"
        @delete="deleteJob()"
      />
    </div>
    <div v-if="showAddNewJobModal" class="fixed inset-0 overflow-y-auto">
      <add-job @close="closeAddModalAndCallJobs" />
    </div>
    <div v-if="showModifyJobModal" class="fixed inset-0 overflow-y-auto">
      <update-jobs
        class=""
        @close="handleCloseUpdateModal"
        :job="jobToDelete"
      />
    </div>
    <div v-if="showJobDetailModal" class="fixed inset-0 overflow-y-auto">
      <job-details
        :jobs="jobToDelete"
        @close="showJobDetailModal = false"
        class=""
      />
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import nojob from "../../components/noJob.vue";
import addJob from "../../components/postJob.vue";
import { useEmployeeStore } from "../../store/useEmployeeStore";
import deleteJobModel from "../../components/deleteJobModel.vue";
import jobDetails from "../../components/jobDetails.vue";

import axios from "axios";
import UpdateJobs from "../../components/updateJobs.vue";

const employeeStore = useEmployeeStore();

const showAddNewJobModal = ref(false);
const showModifyJobModal = ref(false);
const showJobDetailModal = ref(false);
const jobToDelete = ref();
// Sample data - replace with actual API calls
const jobs = ref([]);
// Filters
const filters = ref({
  search: "",
  status: "",
  type: "",
});

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Delete modal
const showDeleteModal = ref(false);

// Computed properties
const filteredJobs = computed(() => {
  let results = jobs.value;
  if (filters.value.search) {
    const keyword = filters.value.search.toLowerCase();
    results = results.filter((job) =>
      job.title.toLowerCase().includes(keyword)
    );
  }
  if (filters.value.type != "") {
    results = results.filter((job) =>
      job.employment_type.includes(filters.value.type)
    );
  }

  if (filters.value.status != "") {
    results = results.filter((job) =>
      job.status.includes(filters.value.status)
    );
  }
  return results;
});

const totalPages = computed(() => {
  return Math.ceil(filteredJobs.value.length / itemsPerPage.value);
});

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredJobs.value.slice(start, end);
});

// Methods
const JobDetailModalHandler = (job, mode) => {
  if (mode === "view") {
    jobToDelete.value = job;
    showJobDetailModal.value = true;
  } else {
    showModifyJobModal.value = true;
    const jobSelected = employeeStore.allJobs.find(
      (j) => j.job_id === job.job_id
    );
    jobToDelete.value = jobSelected;
  }
};
const truncate = (text, length) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};

const formatJobType = (type) => {
  const types = {
    "full-time": "Full-Time",
    "part-time": "Part-Time",
    contract: "Contract",
    internship: "Internship",
    temporary: "Temporary",
  };
  return types[type] || type;
};

const jobTypeClass = (type) => {
  const classes = {
    "full-time": "bg-indigo-100 text-indigo-800",
    "part-time": "bg-purple-100 text-purple-800",
    contract: "bg-yellow-100 text-yellow-800",
    internship: "bg-green-100 text-green-800",
    temporary: "bg-gray-100 text-gray-800",
  };
  return classes[type] || "bg-gray-100 text-gray-800";
};

const formatStatus = (status) => {
  const statuses = {
    open: "Open",
    closed: "Closed",
    draft: "Draft",
  };
  return statuses[status] || status;
};

const statusClass = (status) => {
  const classes = {
    open: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-800",
    draft: "bg-yellow-100 text-yellow-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

const resetFilters = () => {
  filters.value = {
    search: "",
    status: "",
    type: "",
  };
  currentPage.value = 1;
};

const confirmDelete = (job) => {
  showDeleteModal.value = true;
  jobToDelete.value = job;
};

const fetchEmployeeAllJobs = async () => {
  try {
    const response = await employeeStore.fetchEmployeeAllJobs();
    jobs.value = response;
  } catch (error) {
    console.log(error);
  }
};
// In a real app, you would fetch jobs from your API
const deleteJob = async () => {
  // http://localhost:3000
  try {
    await api.delete(
      `/api/employee/delete/job?job_id=${jobToDelete.value.job_id}&employer_id=${jobToDelete.value.employer_id}`,
      { withCredentials: true }
    );
    showDeleteModal.value = false;
    const updatedJobs = await employeeStore.fetchEmployeeAllJobs();
    jobs.value = updatedJobs;
  } catch (error) {
    console.log(error);
  }
};
const closeAddModalAndCallJobs = async () => {
  showAddNewJobModal.value = false;
  const response = await employeeStore.fetchEmployeeAllJobs();
  jobs.value = response;
};
const handleCloseUpdateModal = async () => {
  showModifyJobModal.value = false;
  const response = await employeeStore.fetchEmployeeAllJobs();
  jobs.value = response;
};
onMounted(async () => {
  await fetchEmployeeAllJobs();
});
</script>