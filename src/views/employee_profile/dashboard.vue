<template>
  <main class="bg-gray-50 min-h-screen p-4">
    <div class="max-w-7xl mx-auto">
      <!-- Dashboard Header -->
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
      >
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
            Employer Dashboard
          </h1>
          <p class="text-gray-600 mt-1">
            Welcome back,
            <span class="font-medium">{{
              employeeStore?.profile_percentage?.name
            }}</span>
          </p>
        </div>
        <button
          @click="showInsertModel = true"
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

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Active Jobs -->
        <router-link
          to="/my-jobs"
          class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition border-l-4 border-blue-500"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Active Jobs</p>
              <p class="text-3xl font-semibold text-gray-800 mt-1">
                {{ employeeStore?.employeeJobsLength || 0 }}
              </p>
            </div>
            <div class="bg-indigo-100 p-3 rounded-lg">
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
          </div>
          <h1
            class="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View all jobs
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1"
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
          </h1>
        </router-link>

        <!-- Total Applicants -->
        <router-link
          to="/applicants"
          class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition border-l-4 border-green-500"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Total Applicants</p>
              <p class="text-3xl font-semibold text-gray-800 mt-1">
                {{ usejobsStore?.jobApplicants?.length || 0 }}
              </p>
            </div>
            <div class="bg-green-100 p-3 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-green-600"
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
            </div>
          </div>
          <h1
            class="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View applicants
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1"
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
          </h1>
        </router-link>

        <!-- New Applicants -->
        <router-link
          to="/applicants"
          class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition border-l-4 border-orange-300"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">New Applicants</p>
              <p class="text-3xl font-semibold text-gray-800 mt-1">
                {{ filterForNewJobs?.length || 0 }}
              </p>
            </div>
            <div class="bg-blue-100 p-3 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
          <h1
            class="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Review new applicants
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1"
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
          </h1>
        </router-link>

        <!-- Interview Scheduled -->
        <!-- <div
          class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition border-l-4 border-purple-500"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">
                Complete Your Profile
              </p>
              <div class="text-3xl font-semibold text-gray-800 mt-1">
                {{ stats.interviewsScheduled || 0 }}%
              </div>
            </div>
            <div class="bg-purple-100 p-3 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-purple-600"
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
            </div>
          </div>
          <router-link
            to="/employee-profile"
            class="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View Profile
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1"
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
          </router-link>
        </div> -->
        <router-link
          to="/employee-profile"
          class="card hover:cursor-pointer hover:transition p-6 bg-white rounded-xl border-l-4 border-purple-500 flex flex-col gap-2 hover:shadow-md transition"
        >
          <div class="iconandlogo flex justify-between items-center">
            <h1 class="text-lg font-semibold text-gray-500">Profile Status</h1>
            <div class="bg-purple-100 p-3 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="none"
                class="h-6 w-6 text-purple-600"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M4.35009 13.3929L8 16L11.6499 13.3929C13.7523 11.8912 15 9.46667 15 6.88306V3L8 0L1 3V6.88306C1 9.46667 2.24773 11.8912 4.35009 13.3929Z"
                    fill="#731ae0"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
          <h1 class="font-bold text-2xl">
            {{ employeeStore?.profile_percentage?.profile || "0" }}%
          </h1>
          <div class="outer bg-gray-100 h-2.5 rounded-full">
            <div
              class="inner h-2.5 bg-green-400 rounded-full"
              :style="`max-width: ${100}%; width: ${
                employeeStore?.profile_percentage?.profile || '0'
              }%`"
            ></div>
          </div>
          <h1 class="text-green-500 font-semibold text-sm">
            Complete your profile
          </h1>
        </router-link>
      </div>

      <!-- Recent Activity and Jobs -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Applicants -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-800">
                Recent Applicants
              </h2>
            </div>
            <div class="divide-y divide-gray-200">
              <div
                v-for="applicant in filterRecentApplicants"
                :key="applicant.application_id"
                class="p-6 hover:bg-gray-50 transition"
              >
                <div class="flex items-center">
                  <img
                    :src="
                      applicant.photo_url ||
                      'https://res.cloudinary.com/dvrlvz76t/image/upload/v1752045266/Fa-Team-Fontawesome-FontAwesome-Circle-User.512_1_xpral9.png'
                    "
                    alt="Applicant photo"
                    class="h-10 w-10 rounded-full object-cover"
                  />
                  <div class="ml-4">
                    <h3 class="font-medium text-gray-800">
                      {{ applicant.name }}
                    </h3>
                    <p class="text-sm text-gray-500">
                      Applied for
                      <span class="font-bold">{{ applicant.title }}</span>
                    </p>
                    <div class="flex items-center mt-1">
                      <span
                        class="px-2 py-1 text-xs rounded-full"
                        :class="{
                          'bg-green-100 text-green-800':
                            applicant.application_status === 'IN_PROGRESS',
                          'bg-blue-100 text-blue-800':
                            applicant.application_status === 'Reviewed',
                          'bg-purple-100 text-purple-800':
                            applicant.application_status === 'Interview',
                          'bg-gray-100 text-gray-800':
                            applicant.application_status === 'REJECTED',
                        }"
                      >
                        {{ applicant.application_status }}
                      </span>
                      <span class="text-xs text-gray-500 ml-2">{{
                        new Date(applicant.applied_at)
                          .toISOString()
                          .split("T")[0]
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-if="filterRecentApplicants?.length === 0"
                class="p-6 text-center text-gray-500"
              >
                No recent applicants
              </div>
            </div>
            <div class="px-6 py-4 border-t border-gray-200 text-center">
              <router-link
                to="/applicants"
                class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View all applicants
              </router-link>
            </div>
          </div>
        </div>

        <!-- Active Jobs -->
        <div>
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-800">
                Active Job Postings
              </h2>
            </div>
            <div class="divide-y divide-gray-200">
              <div
                v-for="job in employeeStore?.limitedJobs"
                :key="job.job_id"
                class="p-6 hover:bg-gray-50 transition"
              >
                <h3 class="font-medium text-gray-800">
                  {{ job.title || "title" }}
                </h3>
                <div class="flex items-center mt-2 text-sm text-gray-500">
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
                  <span>{{ job.location }}</span>
                </div>
                <div class="flex items-center justify-between mt-3">
                  <div class="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-1 text-gray-400"
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
                    <span class="text-sm text-gray-500">
                      {{ filterJobApplicants(job) }}
                      {{
                        filterJobApplicants(job) === 1
                          ? "applicant"
                          : "applicants"
                      }}</span
                    >
                  </div>
                  <span
                    class="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full"
                  >
                    {{ job.employment_type }}
                  </span>
                </div>
              </div>
              <div
                v-if="employeeStore?.employeeJobsLength === 0"
                class="p-6 text-center text-gray-500"
              >
                No active job postings
              </div>
            </div>
            <div class="px-6 py-4 border-t border-gray-200 text-center">
              <router-link
                to="/my-jobs"
                class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View all jobs
              </router-link>
            </div>
          </div>
          <teleport to="body">
            <transition name="fade-slide">
              <div
                v-if="showInsertModel"
                class="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-start overflow-y-auto pt-12 px-4"
                @click.self="showInsertModel = false"
                @keydown.esc="showInsertModel = false"
                tabindex="0"
              >
                <div
                  class="relative w-full max-w-4xl bg-white rounded-lg shadow-xl p-6 outline-none"
                  role="dialog"
                  aria-modal="true"
                >
                  <post-job @close="showInsertModel = false" />
                </div>
              </div>
            </transition>
          </teleport>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import postJob from "../../components/postJob.vue";
import { useAuthStore } from "../../store/useUserState";
import { useEmployeeStore } from "../../store/useEmployeeStore";
import { jobStore } from "../../store/useJobStore";

const userStore = useAuthStore();
const employeeStore = useEmployeeStore();
const usejobsStore = jobStore();
const showInsertModel = ref(false);

const filterRecentApplicants = ref(
  computed(() =>
    usejobsStore?.jobApplicants
      ?.filter((job) => job.application_status === "IN_PROGRESS")
      .splice(0, 3)
  )
);
const filterJobApplicants = (j) => {
  return usejobsStore?.jobApplicants?.filter((job) => j.job_id === job.job_id)
    .length;
};
// usejobsStore?.jobApplicants?.filter((j) => j.job_id === job.job_id);
const filterForNewJobs = ref(
  computed(() => {
    return usejobsStore?.jobApplicants?.filter(
      (job) => job.application_status === "IN_PROGRESS"
    );
  })
);

// In a real app, you would fetch this data from your API
onMounted(async () => {
  // await fetchDashboardData();
  await userStore.userAuthStatus();
  await employeeStore.fetchEmployeeAllJobs();
  await employeeStore.fetchEmployeeProfileCompletionProgress();
  await usejobsStore.fetchJobApplicants();
});
</script>