<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-6">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
              My Applications
            </h1>
            <p class="text-gray-600 mt-1">
              Track your job applications and interview progress
            </p>
          </div>
          <div class="mt-4 md:mt-0">
            <button
              @click="showApplicationStats = !showApplicationStats"
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              View Stats
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Application Stats -->
    <div
      v-if="showApplicationStats"
      class="bg-indigo-50 border-b border-indigo-100"
    >
      <div class="container mx-auto px-4 py-6">
        <div class="grid grid-cols-1 w300:grid-cols-2 w500:grid-cols-4 gap-4">
          <div class="bg-white rounded-lg shadow-sm p-4 text-center">
            <p class="text-sm font-medium text-gray-500">Total Applications</p>
            <p class="text-3xl font-bold text-indigo-600 mt-1">
              {{ applications.length }}
            </p>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-4 text-center">
            <p class="text-sm font-medium text-gray-500">In Progress</p>
            <p class="text-3xl font-bold text-blue-600 mt-1">
              {{ applicationsInProgress.length }}
            </p>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-4 text-center">
            <p class="text-sm font-medium text-gray-500">Reviewed</p>
            <p class="text-3xl font-bold text-purple-600 mt-1">
              {{ applicationsAccepted.length }}
            </p>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-4 text-center">
            <p class="text-sm font-medium text-gray-500">Rejected</p>
            <p class="text-3xl font-bold text-green-600 mt-1">
              {{ applicationsRejected.length }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:w-1/4">
          <div class="bg-white rounded-xl shadow-sm p-6 sticky top-4">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">
              Filter Applications
            </h2>

            <!-- Status Filter -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Status</label
              >
              <div class="space-y-2">
                <div
                  v-for="status in applicationStatuses"
                  :key="status.id"
                  class="flex items-center"
                >
                  <input
                    :id="`status-${status.id}`"
                    v-model="filters.status"
                    :value="status.id"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    :for="`status-${status.id}`"
                    class="ml-3 text-sm text-gray-700"
                  >
                    {{ status.name }}
                  </label>
                </div>
              </div>
            </div>

            <!-- Date Applied Filter -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Date Applied</label
              >
              <div class="space-y-2">
                <div
                  v-for="period in dateRanges"
                  :key="period.id"
                  class="flex items-center"
                >
                  <input
                    :id="`period-${period.id}`"
                    v-model="filters.dateRange"
                    :value="period.id"
                    type="radio"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label
                    :for="`period-${period.id}`"
                    class="ml-3 text-sm text-gray-700"
                  >
                    {{ period.name }}
                  </label>
                </div>
              </div>
            </div>

            <!-- Reset Filters -->
            <button
              @click="resetFilters"
              class="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>

        <!-- Applications List -->
        <div class="lg:w-3/4">
          <!-- Applications Header -->
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6"
          >
            <div>
              <h2 class="text-lg font-semibold text-gray-800">
                {{ filteredApplications.length }} Applications
                <span v-if="activeFilterCount > 0" class="text-gray-500"
                  >({{ activeFilterCount }} filter{{
                    activeFilterCount > 1 ? "s" : ""
                  }}
                  applied)</span
                >
              </h2>
            </div>
            <div class="mt-2 sm:mt-0">
              <select
                v-model="sortBy"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="status">By status</option>
              </select>
            </div>
          </div>

          <!-- Applications List -->
          <div class="space-y-4">
            <div
              v-for="application in filteredApplications"
              :key="application.application_id"
              class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div class="p-6">
                <div class="flex flex-col sm:flex-row sm:items-start">
                  <!-- Company Logo -->
                  <div class="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                    <img
                      :src="application.company_logo_url"
                      :alt="'company logo'"
                      class="h-16 w-16 object-contain rounded-lg"
                    />
                  </div>

                  <!-- Application Details -->
                  <div class="flex-1">
                    <div class="flex items-start justify-between">
                      <div>
                        <h3 class="text-lg font-semibold text-gray-800">
                          <p
                            class="hover:text-indigo-600 hover:underline capitalize"
                          >
                            {{ application.title }}
                          </p>
                        </h3>
                        <p class="text-gray-600">
                          {{ application.location }}
                        </p>
                      </div>
                      <div class="flex items-center">
                        <span
                          :class="
                            statusBadgeClass(application.application_status)
                          "
                          class="px-2.5 py-0.5 rounded-full text-xs font-medium"
                        >
                          {{ application.application_status }}
                        </span>
                      </div>
                    </div>

                    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p class="text-sm text-gray-500">Applied on</p>
                        <p class="text-gray-700">
                          {{ application.applied_at }}
                        </p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500">Last updated</p>
                        <p class="text-gray-700">
                          {{ application.lastUpdate || "last updated" }}
                        </p>
                      </div>
                      <div v-if="application.nextStep">
                        <p class="text-sm text-gray-500">Next step</p>
                        <p class="text-gray-700">{{ application.nextStep }}</p>
                      </div>
                      <div v-if="application.method">
                        <p class="text-sm text-gray-500">Application method</p>
                        <p class="text-gray-700">
                          {{ application.applicationMethod }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Application Actions -->
              <div
                class="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-gray-200"
              >
                <div class="flex items-center mb-2 sm:mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400 mr-1"
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
                  <span class="text-sm text-gray-500"
                    >Application ID: {{ application.application_id }}</span
                  >
                </div>
                <div class="flex space-x-3">
                  <button
                    @click="viewApplicationDetails(application.application_id)"
                    class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-100 transition flex items-center"
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View Details
                  </button>
                </div>
              </div>
            </div>

            <no-job
              @reset="resetFilters"
              v-if="filteredApplications.length === 0"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Application Details Modal -->
    <div
      v-if="selectedApplication"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-gray-800">Application Details</h3>
            <button
              @click="selectedApplication = null"
              class="text-gray-400 hover:text-gray-500"
            >
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

          <!-- Application Header -->
          <div class="bg-gray-50 rounded-lg p-6 mb-6">
            <div class="flex flex-col md:flex-row md:items-center">
              <div class="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <img
                  :src="'this image'"
                  :alt="'this image'"
                  class="h-16 w-16 object-contain rounded-lg"
                />
              </div>
              <div class="flex-1">
                <h4 class="text-lg font-semibold text-gray-800">
                  {{ selectedApplication.title }}
                </h4>
                <p class="text-gray-600">
                  {{ selectedApplication.location }}
                </p>
                <div class="mt-2 flex flex-wrap gap-2">
                  <span
                    :class="
                      statusBadgeClass(selectedApplication.application_status)
                    "
                    class="px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {{ selectedApplication.application_status }}
                  </span>
                  <span
                    class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    Applied {{ selectedApplication.applied_at }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="mt-4 flex justify-end">
              <button
                type="button"
                @click="selectedApplication = null"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "../../store/useUserState";
import { jobStore } from "../../store/useJobStore";
import noJob from "../../components/noJob.vue";
const store = useAuthStore();
const jobsStore = jobStore();
const date = new Date();
const applications = ref([]);

// Filters
const applicationStatuses = ref([
  { id: "IN_PROGRESS", name: "In Progress", count: 12 },
  { id: "INTERVIEW", name: "Interview", count: 5 },
  { id: "REJECTED", name: "Rejected", count: 3 },
]);

const dateRanges = ref([
  { id: "7", name: "Last 7 days" },
  { id: "30", name: "Last 30 days" },
  { id: "90", name: "Last 90 days" },
  { id: "all", name: "All time" },
]);

const filters = ref({
  status: [],
  dateRange: "30",
  jobTypes: [],
});

const sortBy = ref("newest");
const showApplicationStats = ref(true);
const selectedApplication = ref(null);

// Computed properties
const filteredApplications = ref(
  computed(() => {
    let results = applications.value;
    if (filters.value.status.length > 0) {
      results = results.filter((job) =>
        filters.value.status.includes(job.application_status)
      );
    }

    // Date range filter
    if (filters.value.dateRange !== "all") {
      const days = parseInt(filters.value.dateRange); // "1", "3", etc.
      const today = new Date();

      results = results
        .filter((job) => {
          const postedDate = new Date(job.applied_at);
          const diffDays = (today - postedDate) / (1000 * 60 * 60 * 24);
          return diffDays <= days;
        })
        .sort((a, b) => {
          if (sortBy.value === "oldest") {
            return new Date(b.applied_at) - new Date(a.applied_at);
          } else if (sortBy.value === "status") {
            return a.application_status.localeCompare(b.application_status);
          } else {
            return new Date(a.applied_at) - new Date(b.applied_at);
          }
        });
    }
    return results;
  })
);
const activeFilterCount = computed(() => {
  let count = 0;
  if (filters.value.status.length > 0) count++;
  if (filters.value.dateRange !== "30") count++;
  if (filters.value.jobTypes.length > 0) count++;
  return count;
});

// Methods
const resetFilters = () => {
  filters.value = {
    status: [],
    dateRange: "30",
    jobTypes: [],
  };
};

const statusBadgeClass = (status) => {
  switch (status) {
    case "IN_PROGRESS":
      return "bg-blue-100 text-blue-800";
    case "ACCEPTED":
      return "bg-green-100 text-green-800";
    case "REJECTED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const viewApplicationDetails = (appId) => {
  selectedApplication.value = applications.value.find(
    (app) => app.application_id === appId
  );
};

const getApplications = async () => {
  try {
    const response = await jobsStore.fetchApplications();
    applications.value = response.map((app) => ({
      title: app.title,
      location: app.location,
      applied_at: date.toISOString(app.applied_at).split("T")[0],
      application_status: app.application_status,
      application_id: app.application_id,
      company_logo_url: app.logo_url,
    }));
    console.log(applications.value);
  } catch (error) {
    console.log(error);
  }
};
const applicationsInProgress = ref(
  computed(() =>
    applications.value.filter(
      (application) => application.application_status === "IN_PROGRESS"
    )
  )
);
const applicationsAccepted = ref(
  computed(() =>
    applications.value.filter(
      (application) => application.application_status !== "IN_PROGRESS"
    )
  )
);
const applicationsRejected = ref(
  computed(() =>
    applications.value.filter(
      (application) => application.application_status === "REJECTED"
    )
  )
);
onMounted(async () => {
  await store.getUserInformation();
  getApplications();
});
</script>