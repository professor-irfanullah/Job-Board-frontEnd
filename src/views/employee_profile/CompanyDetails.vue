<template>
  <main class="bg-gray-50 min-h-screen p-4">
    <section class="max-w-7xl mx-auto">
      <header>
        <div class="headings space-y-1 w350:flex w350:gap-2 w350:space-y-0">
          <h1 class="text-xl font-bold w500:text-2xl w600:text-3xl">
            Company Profile
          </h1>
          <p>
            <span
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
              :class="verificationStatusClass"
            >
              <svg
                v-if="company.is_verified"
                class="h-4 w-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {{ company.is_verified ? "Verified" : "Pending Verification" }}
            </span>
          </p>
        </div>
        <p class="text-gray-500 mt-2">
          Manage your company details and team members
        </p>
      </header>
      <main class="w400:flex items-center gap-2">
        <main
          v-if="!company.is_verified"
          class="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md"
        >
          <div class="flex items-center">
            <svg
              class="h-5 w-5 text-yellow-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span class="text-sm text-yellow-700">
              Your company profile is pending verification by the super admin.
              <span v-if="company.role === 'HR'"
                >You can still add employees, but they won't be able to access
                all features until verification is complete.</span
              >
            </span>
          </div>
        </main>
        <div class="btn mt-2">
          <button
            v-if="company.role === 'HR'"
            class="md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition flex items-center"
            :disabled="!company.is_verified"
            :class="{
              'opacity-50 cursor-not-allowed': !company.is_verified,
            }"
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
            Add New Employee
          </button>
        </div>
      </main>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Company Details -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Company Information Card -->
          <div class="bg-white rounded-xl shadow-sm p-6 mt-2">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-800">
                Company Information
              </h2>

              <!-- Verification Badge for Super Admin -->
            </div>

            <div
              v-if="isEditing === false && company.role === 'HR'"
              class="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-2">
                  Company Name
                </h3>
                <p class="text-gray-900">{{ company.name }}</p>
              </div>

              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-2">Industry</h3>
                <p class="text-gray-900">{{ company.industry }}</p>
              </div>

              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-2">
                  Company Size
                </h3>
                <p class="text-gray-900">
                  {{ company.company_size }}
                </p>
              </div>

              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-2">Founded</h3>
                <p class="text-gray-900">
                  {{ company.founded_year || "Not specified" }}
                </p>
              </div>

              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-2">
                  Verification Status
                </h3>
                <p class="text-gray-900">
                  <span
                    :class="
                      company.is_verified ? 'text-green-600' : 'text-yellow-600'
                    "
                  >
                    {{
                      company.is_verified ? "Verified" : "Pending Verification"
                    }}
                  </span>
                </p>
              </div>

              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-2">
                  Verification Date
                </h3>
                <p class="text-gray-900">
                  {{
                    company.verified_at
                      ? formatDate(company.verified_at)
                      : "Not verified yet"
                  }}
                </p>
              </div>

              <div class="md:col-span-2">
                <h3 class="text-sm font-medium text-gray-500 mb-2">Address</h3>
                <p class="text-gray-900">{{ company.address }}</p>
              </div>

              <div class="md:col-span-2">
                <h3 class="text-sm font-medium text-gray-500 mb-2">About</h3>
                <p class="text-gray-900 leading-relaxed">
                  {{ company.description }}
                </p>
              </div>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="text-sm font-medium text-gray-500 mb-2"
                  >Company Name</label
                >

                <input
                  class="text-gray-900 border block w-full p-2 rounded-md outline-blue-400"
                  type="text"
                  id="name"
                  placeholder="Company name"
                  v-model.trim="company.name"
                />
              </div>

              <form @submit.prevent="">
                <label
                  for="industry"
                  class="text-sm font-medium text-gray-500 mb-2"
                  >Industry</label
                >
                <input
                  id="industry"
                  type="text"
                  class="text-gray-900 border block w-full p-2 rounded-md outline-blue-500"
                  placeholder="Industry"
                  v-model.trim="company.industry"
                />
              </form>

              <div>
                <label for="size">Company Size</label>
                <select
                  class="text-gray-900 border block w-full p-2 rounded-md outline-blue-500"
                  id="size"
                  v-model="company.company_size"
                >
                  <option value="" disabled>Select Company Size</option>
                  <option value="10-20 Employees">10-20 Employees</option>
                  <option value="30-50 Employees">30-50 Employees</option>
                  <option value="100-200 Employees">100-200 Employees</option>
                </select>
              </div>

              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-2">Founded</h3>
                <p class="text-gray-900">
                  {{ company.founded_year || "Not specified" }}
                </p>
              </div>

              <div class="md:col-span-2">
                <label
                  for="address"
                  class="text-sm font-medium text-gray-500 mb-2"
                  >Address</label
                >
                <input
                  id="address"
                  type="text"
                  class="text-gray-900 border block w-full p-2 rounded-md outline-blue-500"
                  placeholder="Address"
                  v-model.trim="company.address"
                />
              </div>

              <div class="md:col-span-2">
                <label
                  for="address"
                  class="text-sm font-medium text-gray-500 mb-2"
                  >About</label
                >
                <textarea
                  id="about"
                  type="text"
                  class="text-gray-900 border block w-full p-2 rounded-md outline-blue-500"
                  placeholder="Industry"
                  v-model.trim="company.description"
                >
                </textarea>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-gray-100">
              <button
                @click="isEditing = !isEditing"
                v-if="!isEditing"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition"
                :disabled="company.role !== 'HR'"
              >
                {{ "Edit Company Info" }}
              </button>
              <button
                v-else
                @click="updateCompany"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition"
                :disabled="company.role !== 'HR'"
                :class="{
                  'opacity-50 cursor-not-allowed': company.role !== 'HR',
                }"
              >
                {{ "Save Changes" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useComapnyStore } from "../../store/companyStore";

const store = useComapnyStore();
const props = defineProps({
  company: {
    type: Object,
    required: true,
  },
});
const isEditing = ref(false);
const verificationStatusClass = computed(() => {
  return props.company.is_verified
    ? "bg-green-100 text-green-800"
    : "bg-yellow-100 text-yellow-800";
});
const updateCompany = async () => {
  isEditing.value = !isEditing.value;
  try {
    await store?.updateCompanyProfile(props?.company);
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  console.log(props);
});
</script>