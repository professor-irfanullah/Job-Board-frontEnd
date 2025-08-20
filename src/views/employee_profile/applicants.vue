<template>
  <main class="bg-gray-50 min-h-screen p-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
      >
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
            Job Applicants
          </h1>
          <p class="text-gray-600 mt-1">
            Manage applicants for your job postings
          </p>
        </div>
        <div class="mt-4 md:mt-0 flex space-x-3">
          <button
            @click="exportApplicants"
            class="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md font-medium hover:bg-gray-50 transition flex items-center"
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export
          </button>
          <router-link
            to="/employer/jobs"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition flex items-center"
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
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            View Jobs
          </router-link>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div
          class="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0"
        >
          <div class="flex-1">
            <label for="search" class="sr-only">Search applicants</label>
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
                v-model="filters.search"
                id="search"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search applicants..."
                type="search"
              />
            </div>
          </div>
          <div class="w-full md:w-48">
            <select
              v-model="filters.job"
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">All Jobs</option>
              <option v-for="job in jobs" :key="job.job_id" :value="job.job_id">
                {{ job.title }}
              </option>
            </select>
          </div>
          <div class="w-full md:w-48">
            <select
              v-model="filters.application_status"
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
              <option value="interview">Interview</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
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

      <!-- Applicants List -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <!-- Table Header -->
        <div
          class="hidden w1000:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          <div class="col-span-3">Applicant</div>
          <div class="col-span-2">Job Position</div>
          <div class="col-span-2">Applied On</div>
          <div class="col-span-2">Experience</div>
          <div class="col-span-2">Status</div>
          <div class="col-span-1">Actions</div>
        </div>

        <!-- Applicants -->
        <div
          v-if="filteredApplicants.length > 0"
          class="divide-y divide-gray-200"
        >
          <div
            v-for="applicant in paginatedApplicants"
            :key="applicant.id"
            class="grid w1000:grid-cols-12 gap-4 p-6 hover:bg-gray-50 transition"
          >
            <!-- Applicant Column -->
            <div class="md:col-span-3">
              <div class="flex items-center">
                <div
                  class="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden"
                >
                  <img
                    v-if="applicant.photo_url"
                    :src="applicant.photo_url"
                    :alt="applicant.name"
                    class="h-full w-full object-cover"
                  />
                  <div
                    v-else
                    class="h-full w-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium"
                  >
                    {{ applicant.name.charAt(0).toUpperCase() }}
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-base font-medium text-gray-800">
                    {{ applicant.name }}
                  </h3>
                  <p class="text-sm text-gray-500">{{ applicant.email }}</p>
                  <div class="mt-1 flex items-center text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {{ applicant.phone || "Not provided" }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Job Position Column -->
            <div class="md:col-span-2 flex items-center">
              <div>
                <p class="text-sm font-medium text-gray-900">
                  {{ applicant.title }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ applicant.employment_type }} •
                  {{ applicant.location }}
                </p>
              </div>
            </div>

            <!-- Applied On Column -->
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {{ new Date(applicant.applied_at).toISOString().split("T")[0] }}
            </div>

            <!-- Experience Column -->
            <div class="md:col-span-2 flex items-center">
              <span
                class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
              >
                {{ applicant.experience }} years
              </span>
            </div>

            <!-- Status Column -->
            <div class="md:col-span-2 flex items-center">
              <select
                v-model="applicant.application_status"
                @change="updateStatus(applicant)"
                class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                :class="statusClass(applicant.application_status)"
              >
                <option value="IN_PROGRESS" class="bg-blue-100 text-blue-800">
                  New
                </option>
                <option value="reviewed" class="bg-purple-100 text-purple-800">
                  Reviewed
                </option>
                <option value="interview" class="bg-yellow-100 text-yellow-800">
                  Interview
                </option>
                <option value="hired" class="bg-green-100 text-green-800">
                  Hired
                </option>
                <option value="rejected" class="bg-red-100 text-red-800">
                  Rejected
                </option>
              </select>
            </div>

            <!-- Actions Column -->
            <div class="md:col-span-1 flex items-center justify-end space-x-2">
              <a
                :href="applicant.resume_url"
                target="_blank"
                class="text-indigo-600 hover:text-indigo-900"
                title="View Resume"
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </a>
              <button
                @click="handleDetailModal(applicant.job_id)"
                class="text-gray-600 hover:text-gray-900"
                title="View Details"
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
              </button>
              <button
                @click="confirmDelete(applicant)"
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

        <!-- Empty State -->
        <div v-else class="p-12 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">
            No applicants found
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Applicants will appear here when they apply to your job postings.
          </p>
          <div class="mt-6">
            <router-link
              to="/employer/jobs"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="-ml-1 mr-2 h-5 w-5"
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
              View Job Postings
            </router-link>
          </div>
        </div>

        <!-- Pagination -->
        <div
          v-if="filteredApplicants.length > 0"
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
                  Math.min(
                    currentPage * itemsPerPage,
                    filteredApplicants.length
                  )
                }}</span>
                of
                <span class="font-medium">{{ filteredApplicants.length }}</span>
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
    <div v-if="showDeleteModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Delete applicant
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to delete the application from
                    {{ applicantToDelete?.name }}? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="deleteApplicant"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Delete
            </button>
            <button
              @click="showDeleteModal = false"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <section v-if="showDetailModal">
      <teleport to="body">
        <section class="fixed inset-0 overflow-y-auto">
          <applicant-details
            :applicant="jobToPass"
            @close="showDetailModal = false"
          />
        </section>
      </teleport>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import applicantDetails from "../../components/applicantDetails.vue";
import { jobStore } from "../../store/useJobStore";
const store = jobStore();
const jobToPass = ref(null);
/**  */
const showDetailModal = ref(false);
// Sample data - replace with actual API calls
const jobs = ref([
  {
    job_id: 1,
    title: "Senior Frontend Developer",
    employment_type: "full-time",
    is_remote: true,
  },
  {
    job_id: 2,
    title: "UX/UI Designer",
    employment_type: "contract",
    is_remote: true,
  },
  {
    job_id: 3,
    title: "Backend Engineer",
    employment_type: "full-time",
    is_remote: false,
  },
]);

const handleDetailModal = (id) => {
  showDetailModal.value = true;
  const isFound = applicants.value.find((job) => job.job_id === id);
  jobToPass.value = isFound;
};
const applicants = ref([]);

// Filters
const filters = ref({
  search: "",
  job: "",
  status: "",
});

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Delete modal
const showDeleteModal = ref(false);
const applicantToDelete = ref(null);

// Computed properties
const filteredApplicants = computed(() => {
  return applicants.value.filter((applicant) => {
    const matchesSearch =
      applicant.name
        .toLowerCase()
        .includes(filters.value.search.toLowerCase()) ||
      applicant.email
        .toLowerCase()
        .includes(filters.value.search.toLowerCase());
    const matchesJob = filters.value.job
      ? applicant.job_id === parseInt(filters.value.job)
      : true;
    const matchesStatus = filters.value.application_status
      ? applicant.application_status === filters.value.application_status
      : true;

    return matchesSearch && matchesJob && matchesStatus;
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredApplicants.value.length / itemsPerPage.value);
});

const paginatedApplicants = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredApplicants.value.slice(start, end);
});

// Methods

const statusClass = (status) => {
  const classes = {
    new: "border-blue-200 bg-blue-50",
    reviewed: "border-purple-200 bg-purple-50",
    interview: "border-yellow-200 bg-yellow-50",
    hired: "border-green-200 bg-green-50",
    rejected: "border-red-200 bg-red-50",
  };
  return classes[status] || "border-gray-200 bg-gray-50";
};

const resetFilters = () => {
  filters.value = {
    search: "",
    job: "",
    application_status: "",
  };
  currentPage.value = 1;
};

const updateStatus = (applicant) => {
  // In a real app, you would make an API call here
  console.log(
    `Updated status for ${applicant.name} to ${applicant.application_status}`
  );
};

const exportApplicants = () => {
  // In a real app, you would generate and download a CSV/Excel file
  console.log("Exporting applicants data");
};

const confirmDelete = (applicant) => {
  applicantToDelete.value = applicant;
  showDeleteModal.value = true;
};

const deleteApplicant = () => {
  if (applicantToDelete.value) {
    applicants.value = applicants.value.filter(
      (applicant) => applicant.id !== applicantToDelete.value.id
    );
    showDeleteModal.value = false;
    applicantToDelete.value = null;
  }
};

// In a real app, you would fetch applicants and jobs from your API
onMounted(async () => {
  await store.fetchJobApplicants();
  console.log(store?.jobApplicants);
  applicants.value = store?.jobApplicants;
  // await fetchApplicants();
  // await fetchJobs();
});
</script>