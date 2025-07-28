<template>
  <main class="bg-gray-50 relative">
    <header class="header border-b p-4 bg-white mt-2">
      <div class="headings px-4 py-2">
        <h1
          class="text-lg font-bold w350:text-xl w500:text-2xl w600:text-3xl text-3xlfont-bold mb-2"
        >
          Find Your Next Opportunity
        </h1>
        <p class="text-gray-600">
          Browse thousands of job listings tailored to your profile
        </p>
      </div>
    </header>
    <!-- main contents -->
    <section
      class="mainSection flex flex-col w1000:flex-row p-4 mt-4 container mx-auto gap-4"
    >
      <aside class="left w1000:w-1/3 bg-white p-4 rounded-md shadow-md">
        <div class="w1000:sticky w1000:top-4">
          <section class="p-3 flex flex-col gap-4">
            <div class="keywords flex flex-col gap-3">
              <label class="font-medium text-sm" for="keywords">Keywords</label>
              <div class="relative">
                <input
                  v-model.trim="filters.keywords"
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  type="text"
                  id="keywords"
                  placeholder="Job title , skills , company"
                />
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
              </div>
            </div>
            <div class="location flex flex-col gap-3">
              <label class="font-medium text-sm" for="location">Location</label>
              <div class="relative">
                <input
                  v-model="filters.location"
                  class="w-full pl-10 pr-4 py-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  type="text"
                  id="location"
                  placeholder="City, state, or remote"
                />
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex justify-center items-center pointer-events-none"
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>
          <section class="jobType mt-2 px-2 flex flex-col gap-4">
            <div class="form">
              <h1 class="text-sm font-medium text-gray-600">Job Type</h1>
              <div
                v-for="(type, index) in jobTypes"
                :key="index"
                class="boxes flex gap-2 items-center mt-2"
              >
                <input
                  v-model="filters.jobTypes"
                  :id="type.id"
                  type="checkbox"
                  :value="type.name"
                  name="Full-time"
                  class="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label :for="type.id" class="text-gray-600 text-sm">{{
                  type.name
                }}</label>
              </div>
            </div>
            <div class="experienceLevel">
              <div class="form flex flex-col gap-2">
                <h1 class="text-sm font-medium text-gray-600">
                  Experience Level
                </h1>
                <div
                  v-for="(item, index) in experienceLevels"
                  :key="index"
                  class="boxes flex items-center gap-2"
                >
                  <input
                    class="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    :id="item.id"
                    type="checkbox"
                    value="entry-level"
                  />
                  <label class="text-gray-600 text-sm" :for="item.id">{{
                    item.name
                  }}</label>
                </div>
              </div>
            </div>
            <div class="salaryRange">
              <h1 class="text-sm font-medium text-gray-600">Salary Range</h1>
              <div class="drop">
                <select
                  v-model="filters.salaryRange"
                  name=""
                  id=""
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Any salary</option>
                  <option value="30">$30k+</option>
                  <option value="50">$50k+</option>
                  <option value="75">$75k+</option>
                  <option value="100">$100+</option>
                  <option value="125">$125k+</option>
                  <option value="150">$150k+</option>
                </select>
              </div>
            </div>
            <div class="date">
              <h1 class="text-sm font-medium text-gray-600">Date Posted</h1>
              <div
                v-for="date in datePosted"
                :key="date.id"
                class="drop flex items-center gap-2 mt-2"
              >
                <input
                  :id="`period-${date.id}`"
                  v-model="filters.datePosted"
                  :value="date.id"
                  type="radio"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label
                  :id="date.id"
                  :for="`period-${date.id}`"
                  class="text-sm text-gray-600 cursor-pointer"
                  >{{ date.name }}</label
                >
              </div>
            </div>
            <div class="btn text-center">
              <button
                type="button"
                @click="resetFilters"
                class="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition"
              >
                Reset Filters
              </button>
            </div>
          </section>
        </div>
      </aside>
      <aside class="right flex-1 p-4 rounded-md">
        <header
          class="flex justify-between flex-col w500:flex-row gap-4 bg-gray-50"
        >
          <div class="headingsLeft">
            <h1 class="font-semibold">
              <span>{{ filteredJobs.length || 0 }}</span>
              Jobs Found
              <span
                v-if="filters.keywords || filters.location"
                class="text-gray-500"
              >
                for
                <span v-if="filters.keywords" class="font-medium"
                  >"{{ filters.keywords }}"</span
                >
                <span v-if="filters.keywords && filters.location"> in </span>
                <span v-if="filters.location" class="font-medium">{{
                  filters.location
                }}</span>
              </span>
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
              <option value="relevant">Most Relevant</option>
              <option value="recent">Most Recent</option>
              <option value="highestSalary">Highest Salary</option>
              <option value="lowestSalary">Lowest Salary</option>
            </select>
          </div>
        </header>
        <main
          v-for="job in limitedJobs"
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
                      <div class="flex flex-col space-y-1">
                        <span class="text-sm text-gray-500">
                          Posted:
                          {{ date.toISOString(job.posted_at).split("T")[0] }}
                        </span>
                        <span class="text-sm text-gray-500">
                          Deadline:
                          {{
                            date
                              .toISOString(job.application_deadline)
                              .split("T")[0]
                          }}
                        </span>
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
                  <button class="hover:text-red-600 transition">
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
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
            <!-- Pagination -->
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
                  Math.min(currentPage * itemsPerPage, filteredJobs.length)
                }}</span>
                of
                <span class="font-medium">{{ filteredJobs.length }}</span>
                results
              </p>
            </div>
            <div>
              <div class="relative z-0 inline-flex rounded-md -space-x-px py-2">
                <button
                  :disabled="
                    Math.min(currentPage * itemsPerPage, filteredJobs.length) ==
                    filteredJobs.length
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
          <zero-skills
            v-if="filteredJobs.length === 0"
            @resetFilters="resetFilters"
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
import { jobStore } from "../store/useJobStore";
import { useAuthStore } from "../store/useUserState";
import zeroSkills from "../components/noJob.vue";
import jobDetails from "../components/jobDetails.vue";
import quickApplyModel from "../components/quickApplyModel.vue";

const userStore = useAuthStore();
const store = jobStore();
const date = new Date();
const sortBy = ref("relevant");
const showModel = ref(false);
const passJobDetails = ref({});
const itemsPerPage = ref(5);
const currentPage = ref(1);
const filters = ref({
  keywords: "",
  location: "",
  jobTypes: [],
  experienceLevels: [],
  salaryRange: "",
  datePosted: "any",
  companySizes: [],
});
const jobTypes = ref([
  { id: "full-time", name: "Full-time", count: 1243 },
  { id: "part-time", name: "Part-time", count: 342 },
  { id: "contract", name: "Contract", count: 567 },
  { id: "internship", name: "Internship", count: 189 },
  { id: "temporary", name: "Temporary", count: 87 },
]);
const experienceLevels = ref([
  { id: "entry", name: "Entry Level", count: 432 },
  { id: "mid", name: "Mid Level", count: 876 },
  { id: "senior", name: "Senior Level", count: 654 },
  { id: "executive", name: "Executive", count: 123 },
]);
const datePosted = ref([
  { id: "1", name: "Last 24 hours" },
  { id: "3", name: "Last 3 days" },
  { id: "7", name: "Last week" },
  { id: "30", name: "Last month" },
  { id: "any", name: "Any time" },
]);
const jobs = ref([
  {
    job_id: 1,
    title: "Senior Frontend Developer",
    company_name: "TechCorp",
    company_logo: "https://via.placeholder.com/150",
    description:
      "We are looking for an experienced frontend developer to join our team working with Vue.js and Tailwind CSS. You will be responsible for building user interfaces and implementing new features.",
    requirements:
      "5+ years of experience with Vue.js, JavaScript, and modern frontend frameworks. Strong CSS skills required.",
    location: "San Francisco, CA",
    employment_type: "Full-time",
    is_remote: true,
    salary_min: 120000,
    salary_max: 150000,
    status: "active",
    posted_at: "2023-06-10T09:00:00Z",
    application_deadline: "2023-07-10T23:59:59Z",
  },
  {
    job_id: 2,
    title: "UX/UI Designer",
    company_name: "DesignHub",
    company_logo: "https://via.placeholder.com/150",
    description:
      "Join our design team to create beautiful and intuitive user experiences for our products. You will work closely with product managers and developers to bring designs to life.",
    requirements:
      "3+ years of UX/UI design experience. Portfolio required. Proficiency in Figma or Sketch.",
    location: "Remote",
    employment_type: "Contract",
    is_remote: true,
    salary_min: 80,
    salary_max: 100,
    status: "active",
    posted_at: "2023-06-05T09:00:00Z",
    application_deadline: "2023-07-05T23:59:59Z",
  },
  {
    job_id: 3,
    title: "Backend Engineer",
    company_name: "DataSystems",
    company_logo: "https://via.placeholder.com/150",
    description:
      "Looking for a backend engineer with experience in Node.js and databases to help scale our infrastructure and build new APIs.",
    requirements:
      "3+ years of Node.js experience. Strong database skills (SQL/NoSQL). Experience with cloud platforms.",
    location: "New York, NY",
    employment_type: "Full-time",
    is_remote: false,
    salary_min: 110000,
    salary_max: 130000,
    status: "active",
    posted_at: "2023-06-09T09:00:00Z",
    application_deadline: "2023-07-09T23:59:59Z",
  },
  {
    job_id: 4,
    title: "Product Manager",
    company_name: "ProductLabs",
    company_logo: "https://via.placeholder.com/150",
    description:
      "Lead product development for our SaaS platform, working with cross-functional teams to define and execute the product roadmap.",
    requirements:
      "5+ years of product management experience. Technical background preferred. Strong leadership skills.",
    location: "Austin, TX",
    employment_type: "Full-time",
    is_remote: false,
    salary_min: 130000,
    salary_max: 160000,
    status: "active",
    posted_at: "2023-06-07T09:00:00Z",
    application_deadline: "2023-07-07T23:59:59Z",
  },
  {
    job_id: 5,
    title: "DevOps Engineer",
    company_name: "CloudScale",
    company_logo: "https://via.placeholder.com/150",
    description:
      "Join our infrastructure team to build and maintain our cloud-based systems and deployment pipelines.",
    requirements:
      "5+ years of DevOps experience. AWS/GCP certification preferred. CI/CD pipeline expertise.",
    location: "Remote",
    employment_type: "Full-time",
    is_remote: true,
    salary_min: 140000,
    salary_max: 170000,
    status: "active",
    posted_at: "2023-06-11T09:00:00Z",
    application_deadline: "2023-07-11T23:59:59Z",
  },
  {
    job_id: 6,
    title: "Marketing Specialist",
    company_name: "GrowthMarketing",
    company_logo: "https://via.placeholder.com/150",
    description:
      "Assist our marketing team with campaigns, content creation, and social media management.",
    requirements:
      "1+ years of marketing experience. Strong writing skills. Social media savvy.",
    location: "Chicago, IL",
    employment_type: "Part-time",
    is_remote: false,
    salary_min: 25,
    salary_max: 35,
    status: "active",
    posted_at: "2023-05-30T09:00:00Z",
    application_deadline: "2023-06-30T23:59:59Z",
  },
  {
    job_id: 7,
    title: "Mobile App Developer",
    company_name: "AppVerse",
    company_logo: "https://via.placeholder.com/150",
    description:
      "Develop and maintain cross-platform mobile applications using Flutter or React Native.",
    requirements:
      "2+ years of mobile development experience. Familiarity with app store deployment and mobile UI design.",
    location: "Los Angeles, CA",
    employment_type: "Full-time",
    is_remote: true,
    salary_min: 95000,
    salary_max: 115000,
    status: "active",
    posted_at: "2023-06-15T09:00:00Z",
    application_deadline: "2023-07-20T23:59:59Z",
  },
  {
    job_id: 8,
    title: "Technical Writer",
    company_name: "DocuStream",
    company_logo: "https://via.placeholder.com/150",
    description:
      "Create clear and concise technical documentation for APIs and developer tools.",
    requirements:
      "Strong writing skills. Experience with Markdown, Git, and technical docs. Background in software or engineering preferred.",
    location: "Remote",
    employment_type: "Contract",
    is_remote: true,
    salary_min: 40,
    salary_max: 60,
    status: "active",
    posted_at: "2023-06-17T09:00:00Z",
    application_deadline: "2023-07-22T23:59:59Z",
  },
  {
    job_id: 9,
    title: "AI Research Intern",
    company_name: "AI Innovations",
    company_logo: "https://via.placeholder.com/150",
    description:
      "Work with our machine learning team to prototype and test new AI models and techniques.",
    requirements:
      "Enrolled in a CS/AI graduate program. Experience with Python and PyTorch or TensorFlow.",
    location: "Boston, MA",
    employment_type: "Internship",
    is_remote: false,
    salary_min: 3000,
    salary_max: 4000,
    status: "active",
    posted_at: "2023-06-20T09:00:00Z",
    application_deadline: "2023-07-25T23:59:59Z",
  },
  {
    job_id: 10,
    title: "Salesforce Administrator",
    company_name: "CRM Solutions",
    company_logo: "https://via.placeholder.com/150",
    description:
      "Manage and customize our Salesforce platform to improve sales team workflows.",
    requirements:
      "Salesforce Administrator certification required. 2+ years of admin experience.",
    location: "Denver, CO",
    employment_type: "Full-time",
    is_remote: false,
    salary_min: 85000,
    salary_max: 100000,
    status: "active",
    posted_at: "2023-06-12T09:00:00Z",
    application_deadline: "2023-07-18T23:59:59Z",
  },
  {
    job_id: 11,
    title: "Cybersecurity Analyst",
    company_name: "SecureNet",
    company_logo: "https://via.placeholder.com/150",
    description:
      "Monitor and respond to security incidents, perform threat analysis, and implement preventive measures.",
    requirements:
      "3+ years in cybersecurity. Experience with SIEM tools, IDS/IPS, and incident response.",
    location: "Washington, D.C.",
    employment_type: "Full-time",
    is_remote: false,
    salary_min: 115000,
    salary_max: 140000,
    status: "active",
    posted_at: "2023-06-25T09:00:00Z",
    application_deadline: "2023-07-30T23:59:59Z",
  },
  {
    job_id: 12,
    title: "Customer Success Manager",
    company_name: "ClientFirst",
    company_logo: "https://via.placeholder.com/150",
    description:
      "Support our clients post-sale, ensuring adoption, retention, and satisfaction.",
    requirements:
      "Excellent communication skills. Experience with CRM tools like HubSpot or Zendesk.",
    location: "Seattle, WA",
    employment_type: "Full-time",
    is_remote: true,
    salary_min: 70000,
    salary_max: 90000,
    status: "active",
    posted_at: "2023-06-25T09:00:00Z",
    application_deadline: "2023-07-30T23:59:59Z",
  },
]);
const jobsUpdated = ref([]);
const showQuickApplyModel = ref(false);

const getJobs = async () => {
  try {
    const response = await store.fetchJobs();
    jobsUpdated.value = response.jobs;
  } catch (error) {
    console.log(error);
  }
};
const passJobInfoToModel = (job_id, name) => {
  if (name === "applicationModel") {
    showQuickApplyModel.value = true;
  } else {
    showModel.value = true;
  }
  const job = jobsUpdated.value.find((job) => job.job_id === job_id);
  passJobDetails.value = job;
};
const filteredJobs = computed(() => {
  let result = jobsUpdated.value;

  // Keyword filter
  if (filters.value.keywords) {
    const keyword = filters.value.keywords.trim().toLowerCase();
    if (keyword) {
      result = result.filter((job) =>
        job.title.toLowerCase().includes(keyword)
      );
    }
  }

  // Location filter
  if (filters.value.location) {
    const locationKeyword = filters.value.location.trim().toLowerCase();
    if (locationKeyword) {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(locationKeyword)
      );
    }
  }

  // Job types filter
  if (filters.value.jobTypes.length > 0) {
    result = result.filter((job) =>
      filters.value.jobTypes.includes(job.employment_type)
    );
  }

  // Salary filter
  if (filters.value.salaryRange) {
    result = result.filter(
      (job) => job.salary_min >= filters.value.salaryRange
    );
  }

  // 📅 Date posted filter: 1, 3, 7, 30 or "any"
  if (filters.value.datePosted !== "any") {
    const days = parseInt(filters.value.datePosted); // "1", "3", etc.
    const today = new Date();

    result = result.filter((job) => {
      const postedDate = new Date(job.posted_at);
      const diffDays = (today - postedDate) / (1000 * 60 * 60 * 24);
      return diffDays <= days;
    });
  }

  if (sortBy.value == "lowestSalary") {
    result = result.sort((a, b) => a.salary_max - b.salary_max);
  }
  if (sortBy.value == "highestSalary") {
    result = result.sort((a, b) => b.salary_max - a.salary_max);
  }
  return result;
});
const resetFilters = () => {
  filters.value = {
    keywords: "",
    location: "",
    jobTypes: [],
    salaryRange: "",
    datePosted: "any",
    companySizes: [],
  };
};

const limitedJobs = ref(
  computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredJobs.value.slice(start, end);
  })
);
onMounted(async () => {
  await userStore.userAuthStatus();
  getJobs();
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
  transform: translateX(20px); /* Slide up/down */
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>