<template>
  <main class="bg-gray-50 min-h-screen p-4 relative">
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
              Your company's profile is pending verification by the super admin.
              You will be able to access company features once verification is
              complete.
            </span>
          </div>
        </main>
        <div class="btn mt-2">
          <button
            v-if="company.role === 'HR'"
            @click="handleNewEmployeeModal"
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
            <transition name="list" mode="out-in">
              <div
                v-if="isEditing === false"
                class="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div>
                  <h3 class="text-sm font-medium text-gray-500 mb-2">
                    Company Name
                  </h3>
                  <p class="text-gray-900">{{ company.name }}</p>
                </div>

                <div>
                  <h3 class="text-sm font-medium text-gray-500 mb-2">
                    Industry
                  </h3>
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
                  <h3 class="text-sm font-medium text-gray-500 mb-2">
                    Founded
                  </h3>
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
                        company.is_verified
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      "
                    >
                      {{
                        company.is_verified
                          ? "Verified"
                          : "Pending Verification"
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
                      company.is_verified
                        ? formatDate(company.verified_at) ||
                          "Verification date is missing"
                        : "Not yet verified"
                    }}
                  </p>
                </div>

                <div class="md:col-span-2">
                  <h3 class="text-sm font-medium text-gray-500 mb-2">
                    Address
                  </h3>
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
                  <label
                    for="name"
                    class="text-sm font-medium text-gray-500 mb-2"
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
                  <h3 class="text-sm font-medium text-gray-500 mb-2">
                    Founded
                  </h3>
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
            </transition>
            <div class="mt-6 pt-4 border-t border-gray-100">
              <button
                @click="isEditing = !isEditing"
                v-if="!isEditing"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition disabled:bg-indigo-500 disabled:cursor-not-allowed"
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
          <div class="statistics bg-white rounded-xl shadow-sm p-6 mt-2">
            <div class="headings">
              <h1 class="text-xl font-semibold">Company Statistics</h1>
            </div>
            <!-- cards sections -->
            <div
              class="cards grid grid-cols-1 w400:grid-cols-2 w700:grid-cols-3 mt-4 gap-4"
            >
              <div
                class="card1 p-4 flex flex-col items-center rounded-md bg-blue-50"
              >
                <h1 class="head text-2xl font-bold text-blue-600">
                  {{ company?.employees?.length || 0 }}
                </h1>
                <div class="text capitalize font-normal text-sm">
                  Total Employees
                </div>
              </div>
              <div
                class="card2 p-4 flex flex-col items-center rounded-md bg-green-50"
              >
                <h1 class="head text-2xl font-bold text-green-600">
                  {{ roles.length }}
                </h1>
                <div class="text capitalize font-normal text-sm">
                  Departments
                </div>
              </div>
              <div
                class="card3 p-4 flex flex-col items-center rounded-md bg-purple-50"
              >
                <h1 class="head text-2xl font-bold text-purple-600">0</h1>
                <div class="text capitalize font-normal text-sm">
                  open positions
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- company logo part -->
        <div
          class="company-logo bg-white rounded-xl shadow-sm p-6 mt-2 flex justify-center items-center flex-col gap-4 max-h-fit"
        >
          <!-- class="img shadow-md overflow-hidde size-32 bg-indigo-50 rounded-full p-2" -->
          <div class="company-logo-here">
            <img
              v-if="company.logo_url"
              class="object-center size-32 border rounded-full border-indigo-400 overflow-hidden"
              :src="company.logo_url"
              :alt="company.name"
            />
            <!-- class="flex justify-center items-center w-full h-full text-blue-600 bg-indigo" -->
            <div
              v-else
              class="border size-32 rounded-full flex justify-center items-center text-blue-600 bg-indigo-100"
            >
              <p class="text-4xl font-bold">
                {{ company?.name?.charAt(0) }}
              </p>
            </div>
            <!-- {{  }} -->
          </div>
          <div class="name flex items-center flex-col gap-1">
            <h1 class="font-semibold text-xl">{{ company.name }}</h1>
            <p class="text-sm capitalize">{{ company.industry }}</p>
          </div>
          <div
            class="status px-2 py-0.5 text-xs rounded-full capitalize font-semibold text-gray-600"
            :class="
              company.is_verified
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            "
          >
            {{ company.is_verified ? "verified" : "pending verification" }}
          </div>
        </div>
      </div>
      <trending-technologies
        :company="company"
        @update:technologies="(newTechs) => (company.technologies = newTechs)"
      />
      <div class="teamMembers mt-7 space-y-4">
        <div class="header flex justify-between items-center">
          <div class="heading">
            <h1 class="text-xl text-gray-700 font-semibold">Team Members</h1>
          </div>
          <div class="searchsort flex jc space-x-4">
            <div class="searchWithIcon relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
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
                v-model.trim="search.name"
                type="text"
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search employees"
              />
            </div>
            <select
              v-model="search.role"
              class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              id=""
            >
              <option :value="null" :disabled="search.role === 'Sort by'">
                {{ search.role !== null ? "Reset Filters" : "Sort by" }}
              </option>
              <option v-for="(role, index) in roles" :key="index" :value="role">
                {{ role }}
              </option>
            </select>
          </div>
        </div>
        <transition name="fade-slide" mode="in-out">
          <transition-group
            name="fade-slide"
            tag="div"
            v-if="filterEmployee?.length"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <div
              v-for="employee in filterEmployee"
              :key="employee.company_employee_id"
              class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow relative"
            >
              <!-- Professional "This is you" Badge for HR -->
              <div
                v-if="employee.email === actEmail"
                class="absolute top-3 right-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold py-1.5 px-3 rounded-full shadow-lg z-10 flex items-center space-x-1.5"
              >
                <svg
                  class="w-3.5 h-3.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="whitespace-nowrap">You</span>
              </div>

              <div class="text-center">
                <div
                  class="size-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center"
                >
                  <span class="text-xl font-bold text-indigo-600">{{
                    employee.name.charAt(0)
                  }}</span>
                </div>

                <h3 class="text-lg font-semibold text-gray-800">
                  {{ employee.name }}
                </h3>
                <p class="text-sm text-gray-600">{{ employee.email }}</p>
                <p class="text-xs text-gray-500">{{ employee.role }}</p>

                <div class="mt-4 flex justify-center space-x-2">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {{ employee.role }}
                  </span>
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {{ employee.status }}
                  </span>
                </div>

                <div class="mt-4 flex justify-center space-x-2">
                  <button
                    @click="viewEmployee(employee)"
                    class="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition"
                    title="View Profile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
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
                    :disabled="employee.email !== actEmail"
                    @click="goTo('/employee-profile')"
                    class="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition disabled:cursor-not-allowed"
                    title="Edit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
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
                </div>
              </div>
            </div>
          </transition-group>
        </transition>

        <transition name="fade-slide">
          <no-Employees v-if="filterEmployee?.length === 0">
            <div
              class="mt-6 bg-white rounded-2xl shadow-xs border border-gray-100 p-12 text-center"
            >
              <div class="max-w-sm mx-auto">
                <div
                  class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-10 w-10 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">
                  No team members found
                </h3>
                <p class="text-gray-600 leading-relaxed mb-6">
                  We couldn't find any employees matching your current search
                  criteria. Try adjusting your filters or invite new team
                  members to get started.
                </p>
                <div class="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    @click="
                      search.name = '';
                      search.role = null;
                    "
                    class="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Reset Filters
                  </button>
                  <button
                    v-if="company.role === 'HR' && company.is_verified"
                    @click="handleNewEmployeeModal"
                    class="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Invite Team Member
                  </button>
                </div>
              </div>
            </div>
          </no-Employees>
        </transition>
      </div>
    </section>
    <section></section>
    <transition name="fade-scale">
      <profile-card
        v-if="showEmpProfile"
        class="fixed inset-0 overflow-auto"
        @close="showEmpProfile = false"
        :employee="passObj"
      />
    </transition>
    <transition name="fade-scale">
      <invite-employee
        :emp="props?.company"
        class="fixed inset-0 overflow-y-auto"
        @close="showAddEmployeeCard = false"
        v-if="showAddEmployeeCard"
      />
    </transition>
  </main>
</template>
<style scoped>
/* Fade + slide up */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Fade + scale */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

/* Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* List (for v-for) */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useComapnyStore } from "../../store/companyStore";
import profileCard from "./profileCard.vue";
import inviteEmployee from "./inviteEmployee.vue";
import noEmployees from "../../components/noEmployees.vue";
import trendingTechnologies from "./trendingTechnologies.vue";
import { useAuthStore } from "../../store/useUserState";
import { useRouter } from "vue-router";

const store = useComapnyStore();
const userStore = useAuthStore();
const router = useRouter();
const actEmail = userStore?.user?.user?.email;
const props = defineProps({
  company: {
    type: Object,
    required: true,
  },
});
const showAddEmployeeCard = ref(false);
const showEmpProfile = ref(false);
const isEditing = ref(false);
const search = ref({
  name: null,
  role: null,
});
const passObj = ref(null);
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
const roles = ref(
  computed(() => {
    const setOfRoles = new Set(
      props?.company?.employees?.map((emp) => emp?.role)
    );
    const roles = new Array(...setOfRoles);
    return roles;
  })
);
const filterEmployee = ref(
  computed(() => {
    let result = [];
    result = props?.company?.employees;
    if (search.value.name !== null) {
      result = result.filter((emp) =>
        emp.name.toLowerCase().includes(search.value.name.toLowerCase())
      );
    }
    if (search.value.role !== null) {
      result = result.filter((r) => r.role.includes(search.value.role));
    }

    return result;
  })
);
// view employee functionality
const viewEmployee = (emp) => {
  showEmpProfile.value = true;
  passObj.value = emp;
};
// handle add new employee modal
const handleNewEmployeeModal = () => {
  showAddEmployeeCard.value = true;
};
const goTo = (path) => {
  router.push(path);
};
const formatDate = (dateString) => {
  const date = new Date(dateString);
  // const result = date.toISOString().split("T")[0];
  const result = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return result;
};
onMounted(async () => {
  await userStore?.userAuthStatus();
});
</script>
