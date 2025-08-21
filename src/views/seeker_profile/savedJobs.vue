<template>
  <main class="bg-gray-50 relative">
    <header class="header border-b p-4 bg-white mt-2">
      <div class="headings px-4 py-2">
        <h1
          class="text-lg font-bold w350:text-xl w500:text-2xl w600:text-3xl text-3xlfont-bold mb-2"
        >
          Saved Jobs
        </h1>
        <p class="text-gray-600">
          Your curated collection of interesting opportunities
        </p>
      </div>
    </header>
    <!-- main contents -->
    <section
      class="mainSection flex flex-col w1000:flex-row p-4 mt-4 container mx-auto gap-4"
    >
      <aside class="right flex-1 p-4 rounded-md">
        <header
          class="flex justify-between flex-col w500:flex-row gap-4 bg-gray-50"
        >
          <div class="headingsLeft">
            <h1 class="font-semibold">
              <span>{{ savedJobs.length || 0 }}</span>
              Jobs Saved
            </h1>
            <p class="text-sm text-gray-600">Sorted by: Most Relevant</p>
          </div>
          <div
            class="headingsLeft rounded-md p-2 bg-white w-full w500:w-[200px]"
          >
            <select
              v-model="sortBy"
              class="block w-full outline-none"
              name=""
              id=""
            >
              <option value="recent">Most Recently Saved</option>
              <option value="oldest">Oldest Saved</option>
              <option value="expiring">Expiring Soonest</option>
              <option value="salary">Highest Salary</option>
            </select>
          </div>
        </header>
        <main
          v-for="job in filterJobs"
          :key="job.job_id"
          class="mainContents mt-4"
        >
          <div
            class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition flex flex-col gap-4"
          >
            <div class="p-6">
              <div class="header flex justify-between">
                <div
                  class="img&titel flex flex-col w500:flex-row gap-2 flex-wra"
                >
                  <img
                    :src="job.company_logo"
                    alt="logo"
                    class="h-6 w-6 w400:h-16 w400:w-16 object-contain rounded-lg"
                  />
                  <div class="JobTitle">
                    <h1 class="font-semibold w300:text-lg">
                      {{ job.title }}
                    </h1>
                    <p class="text-sm text-gray-600">
                      {{ job.company_name }} • {{ job.location }}
                    </p>
                    <div class="tags text-sm flex gap-2 mt-4">
                      <p
                        class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-green-800"
                      >
                        {{ job.employment_type }}
                      </p>
                      <p
                        v-if="job.is_remote"
                        class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-green-800"
                      >
                        Remote
                      </p>
                    </div>
                    <p class="mt-3 text-gray-600 line-clamp-2">
                      {{ job.description }}
                    </p>

                    <div
                      class="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 text-gray-400 mr-1"
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
                          >Saved
                          {{
                            new Date(job.created_at).toISOString().split("T")[0]
                          }}</span
                        >
                      </div>
                      <div class="mt-2 sm:mt-0">
                        <span class="text-lg font-bold text-gray-800">
                          ${{ job.salary_min }} - ${{ job.salary_max }}
                          <span v-if="job.employment_type === 'Contract'"
                            >/hr</span
                          >
                          <span v-else>/year</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="heartIcon">
                  <button
                    @click="removeFromFavorite(job.job_id)"
                    class="hover:text-red-600 transition text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-6 py-4 flex justify-between items-center">
              <div class="flex gap-3 justify-center items-centers flex-wrap">
                <button
                  @click="
                    passJobInfoToModel(job.job_id, (name = 'applicationModel'))
                  "
                  v-if="userStore.isAuthenticated"
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
                      d="M9 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Quick Apply
                </button>
                <router-link
                  to="/"
                  v-else
                  class="px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition flex items-center"
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
                      d="M9 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Registered Only
                </router-link>
                <button
                  @click="passJobInfoToModel(job.job_id, (name = 'jobModel'))"
                  class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition flex items-center"
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
                  View Job
                </button>
              </div>
              <div
                v-if="job.posted_at"
                class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
              >
                New
              </div>
            </div>
          </div>
        </main>
        <div
          v-if="limitedJobs.length > 0"
          class="mt-2 bg-white rounded-xl shadow-sm px-6 py-4 flex items-center justify-between border-t border-gray-200"
        >
          <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{
                  (currentPage - 1) * itemsPerPage + 1
                }}</span>
                to
                <span class="font-medium">{{
                  Math.min(currentPage * itemsPerPage, savedJobs.length)
                }}</span>
                of
                <span class="font-medium">{{ savedJobs.length }}</span>
                results
              </p>
            </div>
            <div>
              <div class="relative z-0 inline-flex rounded-md -space-x-px py-2">
                <button
                  :disabled="
                    Math.min(currentPage * itemsPerPage, savedJobs.length) ==
                    savedJobs.length
                  "
                  @click="itemsPerPage = itemsPerPage + 5"
                  class="text-indigo-600 hover:underline font-medium disabled:text-indigo-400 disabled:cursor-not-allowed"
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- no results -->
        <transition name="fade-slide">
          <!-- v-if="savedJobs.length === 0" -->
          <no-jobs
            button="Browse Jobs"
            @reset="router.push('/find-jobs')"
            v-if="savedJobs.length === 0"
          />
        </transition>
      </aside>
    </section>
    <transition name="fade-slide">
      <div
        v-if="showModel"
        class="model absolute w-full bg-gray-50 top-0 left-0 flex h-full"
      >
        <div class="mx-auto w-full">
          <job-details
            @close="showModel = false"
            :jobs="passJobDetails"
            class="sticky p-4 top-4 rounded-md mx-auto"
          />
        </div>
      </div>
    </transition>
    <quickApplyModel
      @hide="showQuickApplyModel = false"
      v-if="showQuickApplyModel"
      :jobs="passJobDetails"
    />
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { jobStore } from "../../store/useJobStore";
import { useAuthStore } from "../../store/useUserState";
import jobDetails from "../../components/jobDetails.vue";
import quickApplyModel from "../../components/quickApplyModel.vue";
import axios from "axios";
import noJobs from "../../components/noJob.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useAuthStore();
const store = jobStore();
const date = new Date();
const sortBy = ref("recent");
const showModel = ref(false);
const passJobDetails = ref({});
const itemsPerPage = ref(5);
const currentPage = ref(1);
const showQuickApplyModel = ref(false);
const savedJobs = ref([]);

const passJobInfoToModel = (job_id, name) => {
  if (name === "applicationModel") {
    showQuickApplyModel.value = true;
  } else {
    showModel.value = true;
  }
  const job = savedJobs.value.find((job) => job.job_id === job_id);
  passJobDetails.value = job;
};

const limitedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return savedJobs.value.slice(start, end);
});
const filterJobs = ref(
  computed(() => {
    let result = [...limitedJobs.value];
    if (sortBy.value === "salary") {
      result = result.sort((a, b) => b.salary_max - a.salary_max);
    }
    if (sortBy.value === "recent") {
      result = result.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    }
    if (sortBy.value === "oldest") {
      result = result.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    }

    return result;
  })
);

const removeFromFavorite = async (jobId) => {
  // `http://localhost:3000/api/seeker/delete/favorite/job?job_id=${jobId}`,
  try {
    await axios.delete(`/api/seeker/delete/favorite/job?job_id=${jobId}`, {
      withCredentials: true,
    });

    savedJobs.value = savedJobs.value.filter((job) => job.job_id !== jobId);
  } catch (error) {
    console.log(error);
  }
};

const fetchSavedJobs = async () => {
  try {
    const response = await store.fetchFavoriteJobs();
    savedJobs.value = response;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await userStore.userAuthStatus();
  fetchSavedJobs();
});
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>