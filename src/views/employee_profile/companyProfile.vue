<template>
  <main class="bg-gray-50 min-h-screen p-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
      >
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
            Company Profiles
          </h1>
          <p class="text-gray-600 mt-1">Manage your company details</p>
        </div>
        <button
          @click="showAddNewCompanyModal = true"
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
          Add New Company
        </button>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div
          class="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0"
        >
          <div class="flex-1">
            <label for="search" class="sr-only">Search companies</label>
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
                placeholder="Search companies..."
                type="search"
              />
            </div>
          </div>
          <div class="w-full md:w-48">
            <select
              v-model="filters.verification"
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">All Statuses</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
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

      <!-- Companies List -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <!-- Table Header -->
        <div
          class="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          <div class="col-span-3">Company</div>
          <div class="col-span-3">Description</div>
          <div class="col-span-2">Website</div>
          <div class="col-span-2">Status</div>
          <div class="col-span-2">Actions</div>
        </div>

        <!-- Companies -->

        <div
          v-if="filteredCompanies.length > 0"
          class="divide-y divide-gray-200"
        >
          <div
            v-for="company in paginatedCompanies"
            :key="company.company_id"
            class="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 hover:bg-gray-50 transition"
          >
            <!-- Company Column -->
            <div class="md:col-span-3">
              <div class="flex items-center">
                <div
                  class="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center md:mr-4"
                >
                  <img
                    v-if="company.logo_url"
                    :src="company.logo_url"
                    :alt="company.name"
                    class="h-8 w-8 object-contain"
                  />
                  <svg
                    v-else
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10m4 0h4m-4 0V9"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="text-base font-medium text-gray-800">
                    {{ company.name }}
                  </h3>
                  <p class="text-sm text-gray-500 truncate">
                    {{ company.role }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Description Column -->
            <div class="md:col-span-3 flex items-center text-sm text-gray-500">
              {{ truncate(company.description, 20) }}
            </div>

            <!-- Website Column -->
            <div class="md:col-span-2 flex items-center">
              <a
                :href="company.website_url"
                target="_blank"
                class="text-indigo-600 hover:text-indigo-900 text-sm flex items-center"
              >
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
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                Visit Website
              </a>
            </div>

            <!-- Status Column -->
            <div class="md:col-span-2 flex items-center">
              <span
                class="px-2 py-1 text-xs rounded-full"
                :class="
                  company.is_verified
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                "
              >
                {{ company.is_verified ? "Verified" : "Not Verified" }}
              </span>
            </div>

            <!-- Actions Column -->
            <div class="md:col-span-2 flex items-center justify-end space-x-2">
              <button
                @click="CompanyDetailModalHandler(company, 'view')"
                class="text-indigo-600 hover:text-indigo-900"
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
              </button>
              <button
                @click="CompanyDetailModalHandler(company, 'edit')"
                class="text-gray-600 hover:text-gray-900"
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
              </button>
              <button
                :disabled="company.role != 'HR'"
                @click="confirmDelete(company)"
                class="text-red-600 hover:text-red-900 disabled:cursor-not-allowed disabled:text-red-400"
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
        <no-companies v-else />

        <!-- Empty State -->

        <!-- Pagination -->
        <div
          v-if="filteredCompanies.length > 0"
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
                  Math.min(currentPage * itemsPerPage, filteredCompanies.length)
                }}</span>
                of
                <span class="font-medium">{{ filteredCompanies.length }}</span>
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
    <delete-company
      v-if="showDeleteModal"
      :selectedCompany="selectedCompany"
      @close="handleDeleteModal"
    />

    <!-- Company Detail Modal -->
    <div
      v-if="showCompanyDetailModal"
      class="fixed z-10 inset-0 overflow-y-auto"
    >
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
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <img
                  v-if="selectedCompany?.logo_url"
                  :src="selectedCompany.logo_url"
                  :alt="selectedCompany.name"
                  class="h-6 w-6 object-contain"
                />
                <svg
                  v-else
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10m4 0h4m-4 0V9"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  {{ selectedCompany?.name }}
                </h3>
                <div class="mt-2 space-y-2">
                  <p class="text-sm text-gray-500">
                    {{ selectedCompany?.description }}
                  </p>
                  <p class="text-sm">
                    <span class="font-medium">Website:</span>
                    <a
                      :href="selectedCompany?.website_url"
                      target="_blank"
                      class="text-indigo-600 hover:text-indigo-900 ml-1"
                    >
                      {{ selectedCompany?.website_url }}
                    </a>
                  </p>
                  <p class="text-sm">
                    <span class="font-medium">Status:</span>
                    <span
                      :class="
                        selectedCompany?.is_verified
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      "
                      class="ml-1"
                    >
                      {{
                        selectedCompany?.is_verified
                          ? "Verified"
                          : "Pending Verification"
                      }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="showCompanyDetailModal = false"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- add company -->
    <create-company
      @close="handleCloseModalWithCallingComapany"
      v-if="showAddNewCompanyModal"
      class="fixed inset-0 overflow-auto"
    />
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useComapnyStore } from "../../store/companyStore";
import NoCompanies from "../../components/No-companies.vue";
import createCompany from "../../components/createCompany.vue";
import { useRouter } from "vue-router";
import deleteCompany from "../../components/deleteCompany.vue";
const companyStore = useComapnyStore();
const router = useRouter();

// Filters
const filters = ref({
  search: "",
  verification: "",
});

const companies = ref([]);
// Filtered companies
const filteredCompanies = computed(() => {
  return companies.value.filter((company) => {
    const matchesSearch =
      company?.name
        ?.toLowerCase()
        .includes(filters.value.search.toLowerCase()) ||
      company?.description
        ?.toLowerCase()
        .includes(filters.value.search.toLowerCase());
    const matchesVerification = filters.value.verification
      ? filters.value.verification === "verified"
        ? company.is_verified
        : !company.is_verified
      : true;

    return matchesSearch && matchesVerification;
  });
});

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalPages = computed(() => {
  return Math.ceil(filteredCompanies.value.length / itemsPerPage.value);
});
const paginatedCompanies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCompanies.value.slice(start, end);
});

// Modals
const showDeleteModal = ref(false);
const showAddNewCompanyModal = ref(false);
const showCompanyDetailModal = ref(false);
const selectedCompany = ref(null);

// Methods
const truncate = (text, length) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};

const resetFilters = () => {
  filters.value = {
    search: "",
    verification: "",
  };
  currentPage.value = 1;
};
const handleDeleteModal = async () => {
  showDeleteModal.value = false;
  companies.value = companyStore?.companyProfile;
};
const handleCloseModalWithCallingComapany = async () => {
  showAddNewCompanyModal.value = false;
  try {
    await companyStore.fetchCompanyProfile();
    companies.value = companyStore?.companyProfile;
  } catch (error) {
    console.log(error);
  }
};
const CompanyDetailModalHandler = (company, mode) => {
  selectedCompany.value = company;
  const companyId = selectedCompany.value.company_id;
  router.push({ name: "company", params: { id: companyId } });
};

const confirmDelete = (company) => {
  selectedCompany.value = company;
  showDeleteModal.value = true;
};

onMounted(async () => {
  await companyStore?.fetchCompanyProfile();
  companies.value = companyStore?.companyProfile;
});
</script>