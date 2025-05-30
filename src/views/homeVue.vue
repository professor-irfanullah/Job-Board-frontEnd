<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-indigo-700 text-white">
      <div class="container mx-auto px-4 py-20 md:py-28">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            Find Your Dream Job Today
          </h1>
          <p class="text-xl md:text-2xl text-indigo-100 mb-10">
            Thousands of jobs waiting for you. Search by title, location, or
            keywords.
          </p>

          <!-- Search Bar -->
          <div
            class="bg-white rounded-lg shadow-xl p-2 flex flex-col md:flex-row"
          >
            <div
              class="flex-1 relative flex items-center px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200"
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
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Job title, keywords"
                class="ml-3 flex-1 outline-none text-gray-700"
              />
            </div>
            <div class="flex-1 relative flex items-center px-4 py-3">
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
              <input
                v-model="locationQuery"
                type="text"
                placeholder="Location"
                class="ml-3 flex-1 outline-none text-gray-700"
              />
            </div>
            <button
              @click="searchJobs"
              class="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition md:ml-2"
            >
              Search Jobs
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Jobs Section -->
    <div class="container mx-auto px-4 py-16">
      <div class="flex justify-between items-center mb-10">
        <h2 class="text-3xl font-bold text-gray-800">Featured Jobs</h2>
        <a href="#" class="text-indigo-600 hover:underline font-medium"
          >View All</a
        >
      </div>

      <!-- Jobs Carousel -->
      <div class="relative">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="job in featuredJobs"
            :key="job.id"
            class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div class="p-6">
              <div class="flex items-start">
                <div class="ml-4">
                  <h3 class="text-lg font-semibold text-gray-800">
                    {{ job.title }}
                  </h3>
                  <p class="text-gray-600">{{ job.companyName }}</p>
                </div>
              </div>
              <div class="mt-4 flex flex-wrap gap-2">
                <span
                  class="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full"
                  >{{ job.type }}</span
                >
                <span
                  class="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                  >{{ job.location }}</span
                >
                <span
                  v-if="job.isRemote"
                  class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                  >Remote</span
                >
              </div>
              <p class="mt-4 text-gray-600 line-clamp-2">
                {{ job.description }}
              </p>
              <div class="mt-6 flex justify-between items-center">
                <span class="text-lg font-bold text-gray-800">{{
                  job.salary
                }}</span>
                <a
                  :href="`/jobs/${job.id}`"
                  class="text-indigo-600 hover:underline font-medium"
                  >View Details</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Categories Section -->
    <div class="bg-gray-100 py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">
          Browse by Category
        </h2>

        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          <div
            v-for="category in categories"
            :key="category.id"
            class="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition cursor-pointer"
          >
            <div
              class="mx-auto h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4"
            >
              <!-- <f-a-c icon="xmark" /> -->
              <!-- <component :is="category.icon" class="h-6 w-6 text-indigo-600" /> -->
            </div>
            <h3 class="font-medium text-gray-800">{{ category.name }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ category.jobs }} jobs</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-indigo-700 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Ready to take the next step?
        </h2>
        <p class="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
          Whether you're looking for talent or your next opportunity, we've got
          you covered.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/post-job"
            class="bg-white text-indigo-700 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition"
          >
            Post a Job
          </a>
          <a
            href="/jobs"
            class="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-bold hover:bg-indigo-800 transition"
          >
            Browse Jobs
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const searchQuery = ref("");
const locationQuery = ref("");

const featuredJobs = ref([
  {
    id: 1,
    title: "Senior Frontend Developer",
    companyName: "TechCorp",
    companyLogo: "https://via.placeholder.com/150",
    type: "Full-time",
    location: "San Francisco, CA",
    isRemote: true,
    description:
      "We are looking for an experienced frontend developer to join our team working with Vue.js and Tailwind CSS.",
    salary: "$120,000 - $150,000",
  },
  {
    id: 2,
    title: "Marketing Manager",
    companyName: "Digital Agency",
    companyLogo: "https://via.placeholder.com/150",
    type: "Full-time",
    location: "New York, NY",
    isRemote: false,
    description:
      "Lead our marketing team and develop strategies to grow our client base and brand awareness.",
    salary: "$90,000 - $110,000",
  },
  {
    id: 3,
    title: "Healthcare Administrator",
    companyName: "MediCare Systems",
    companyLogo: "https://via.placeholder.com/150",
    type: "Full-time",
    location: "Chicago, IL",
    isRemote: false,
    description:
      "Oversee daily operations of our healthcare facility and ensure quality patient care standards.",
    salary: "$85,000 - $100,000",
  },
]);

const categories = ref([
  { id: 1, name: "Technology", jobs: 1243 },
  { id: 2, name: "Marketing", jobs: 876 },
  { id: 3, name: "Healthcare", jobs: 765 },
  { id: 4, name: "Finance", jobs: 543 },
  { id: 5, name: "Education", jobs: 432 },
  { id: 6, name: "Engineering", jobs: 987 },
  { id: 7, name: "Business", jobs: 654 },
  { id: 8, name: "Science", jobs: 321 },
  { id: 9, name: "Legal", jobs: 234 },
  { id: 10, name: "Consulting", jobs: 456 },
  { id: 11, name: "Government", jobs: 345 },
  { id: 12, name: "Remote", jobs: 678 },
]);

const searchJobs = () => {
  // Implement search functionality
  console.log("Searching for:", searchQuery.value, "in", locationQuery.value);
};
</script>