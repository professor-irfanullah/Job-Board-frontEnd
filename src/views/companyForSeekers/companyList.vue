<template>
  <main class="bg-gray-50 min-h-screen p-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
      >
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
            Explore Companies
          </h1>
          <p class="text-gray-600 mt-1">
            Discover amazing companies and their technologies
          </p>
        </div>

        <div class="mt-4 md:mt-0 flex items-center space-x-4">
          <div class="relative">
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search companies..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
            />
            <svg
              class="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

      <!-- Filters -->
      <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div
          class="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0 justify-between"
        >
          <!-- Industry Filter -->
          <div class="w-full md:w-48">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Industry</label
            >
            <select
              v-model="filters.industry"
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">All Industries</option>
              <option
                v-for="industry in industries"
                :key="industry"
                :value="industry"
              >
                {{ industry }}
              </option>
            </select>
          </div>

          <!-- Technology Filter -->
          <div class="w-full md:w-48">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Technology</label
            >
            <select
              v-model="filters.technology"
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">All Technologies</option>
              <option v-for="tech in allTech" :key="tech" :value="tech">
                {{ tech }}
              </option>
            </select>
          </div>

          <!-- Company Size Filter -->
          <div class="w-full md:w-48">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Company Size</label
            >
            <select
              v-model="filters.size"
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Any Size</option>
              <option
                v-for="(size, index) in companySize"
                :key="index"
                :value="size"
              >
                {{ size }}
              </option>
              <!-- <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="501-1000">501-1000 employees</option>
              <option value="1000+">1000+ employees</option> -->
            </select>
          </div>

          <button
            @click="resetFilters"
            class="self-end px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- Companies Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="company in filteredCompanies"
          :key="company.id"
          class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          @click="viewCompany(company)"
        >
          <!-- Company Header -->
          <div class="p-6 border-b border-gray-100">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div
                  class="h-16 w-16 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center border"
                >
                  <img
                    v-if="company.logo_url"
                    :src="company.logo_url"
                    :alt="company.name"
                    class="h-12 w-12 object-contain"
                  />
                  <span v-else class="text-2xl font-bold text-indigo-600">
                    {{ company.name.charAt(0) }}
                  </span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold text-gray-900 truncate">
                  {{ company.name }}
                </h3>
                <p class="text-sm text-gray-500 truncate">
                  {{ company.industry }}
                </p>
                <div class="flex items-center mt-1">
                  <span class="text-xs text-gray-400">{{
                    company.company_size
                  }}</span>
                  <span class="mx-2 text-gray-300">•</span>
                  <span class="text-xs text-gray-400">{{
                    company.address
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Company Description -->
          <div class="p-6">
            <p class="text-sm text-gray-600 line-clamp-3 mb-4">
              {{ company.description }}
            </p>

            <!-- Trending Technologies -->
            <div class="mb-4">
              <h4
                class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2"
              >
                Trending Technologies
              </h4>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="tech in company.technologies.slice(0, 3)"
                  :key="tech"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                >
                  {{ tech.technology }}
                </span>
                <span
                  v-if="company.technologies.length > 3"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
                >
                  +{{ company.trendingTechnologies.length - 3 }} more
                </span>
                <span
                  class="inline-flex items-center py-.5 text-xs italic font-semibold"
                  v-if="company.technologies.length === 0"
                >
                  No technologies added yet
                </span>
              </div>
            </div>

            <!-- Company Stats -->
            <div
              v-if="company.isHiring"
              class="flex items-center justify-between text-sm text-gray-500"
            >
              <div class="flex items-center">
                <svg
                  class="h-4 w-4 mr-1 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                {{ company.openPositions }} open positions
              </div>
              <span
                v-if="company.isHiring"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 font-medium"
              >
                Hiring
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredCompanies.length === 0"
        class="bg-white rounded-xl shadow-sm p-12 text-center"
      >
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10m4 0h4m-4 0V9"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">
          No companies found
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useComapnyStore } from "../../store/companyStore";
const store = useComapnyStore();
const router = useRouter();

// Hardcoded companies data
const companies = ref([]);

// Filters
const filters = ref({
  search: "",
  industry: "",
  technology: "",
  size: "",
});

// get company size
const companySize = computed(() => {
  return companies.value.map((c) => c.company_size);
});
// Available filters
const industries = computed(() => {
  return [...new Set(companies.value.map((company) => company.industry))];
});
// technologies
const technologies = computed(() => {
  const allTechs = companies.value.flatMap((company) => company.technologies);
  return [...new Set(allTechs)].sort();
});

// technologies 2.0
const allTech = computed(() => {
  let techs = companies.value.flatMap((t) => t.technologies);
  let tech = techs.map((t) => t.technology);
  return [...new Set(tech)];
});

// Filtered companies
const filteredCompanies = computed(() => {
  return companies.value.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      company.description
        .toLowerCase()
        .includes(filters.value.search.toLowerCase()) ||
      company.industry
        .toLowerCase()
        .includes(filters.value.search.toLowerCase());

    const matchesIndustry =
      !filters.value.industry || company.industry === filters.value.industry;
    const matchesTechnology =
      !filters.value.technology ||
      company.technologies
        .flatMap((t) => t.technology)
        .includes(filters.value.technology);

    const matchesSize =
      !filters.value.size || company.company_size === filters.value.size;

    return matchesSearch && matchesIndustry && matchesTechnology && matchesSize;
  });
});

// Methods
const resetFilters = () => {
  filters.value = {
    search: "",
    industry: "",
    technology: "",
    size: "",
  };
};

const viewCompany = (company) => {
  router.push(`/companies/${company.id}`);
};

onMounted(async () => {
  // In a real app, fetch companies from API
  const response = await store.fetchAllCompanies();
  companies.value = response;
});
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>