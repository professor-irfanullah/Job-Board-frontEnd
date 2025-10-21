<template>
  <main class="bg-gray-50 min-h-screen p-4">
    <div class="max-w-6xl mx-auto">
      <!-- Back Button -->
      <div class="mb-6">
        <button
          @click="closeModal"
          class="text-indigo-600 hover:underline flex items-center text-sm"
        >
          <svg
            class="h-5 w-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Employees
        </button>
      </div>
      <!-- Employee Header -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div class="flex flex-col md:flex-row md:items-center gap-6">
          <!-- Employee Avatar -->
          <div class="flex-shrink-0">
            <div
              class="h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-lg"
            >
              <div
                class="h-full w-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold"
              >
                {{ props?.employee?.name?.charAt(0)?.toUpperCase() || "U" }}
              </div>
            </div>
          </div>

          <!-- Employee Basic Info -->
          <div class="flex-1">
            <div
              class="flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
                  {{ props?.employee?.name }}
                </h1>
                <p class="text-gray-600 text-lg">
                  {{ props?.employee?.email }}
                </p>

                <div class="mt-3 flex flex-wrap gap-2">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                    :class="statusClass"
                  >
                    {{ formatStatus(props?.employee?.status) }}
                  </span>
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {{ formatRole(props?.employee?.role) }}
                  </span>
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 capitalize"
                  >
                    {{ props?.employee?.user_role }}
                  </span>
                </div>
              </div>

              <div class="mt-4 md:mt-0 text-right">
                <p class="text-sm text-gray-500">Employee ID</p>
                <p class="text-lg font-mono font-medium text-gray-900">
                  {{ props?.employee.company_employee_id }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Personal & Professional Info -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Bio Section -->
          <div
            v-if="props?.employee?.bio"
            class="bg-white rounded-xl shadow-sm p-6"
          >
            <h2
              class="text-lg font-semibold text-gray-800 mb-4 flex items-center"
            >
              <svg
                class="h-5 w-5 mr-2 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Professional Bio
            </h2>
            <p class="text-gray-700 leading-relaxed whitespace-pre-line">
              {{ props?.employee?.bio }}
            </p>
          </div>

          <!-- About Section -->
          <div
            v-if="props?.employee?.about"
            class="bg-white rounded-xl shadow-sm p-6"
          >
            <h2
              class="text-lg font-semibold text-gray-800 mb-4 flex items-center"
            >
              <svg
                class="h-5 w-5 mr-2 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              About
            </h2>
            <p class="text-gray-700 leading-relaxed whitespace-pre-line">
              {{ props?.employee?.about }}
            </p>
          </div>

          <!-- Contact Information -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h2
              class="text-lg font-semibold text-gray-800 mb-4 flex items-center"
            >
              <svg
                class="h-5 w-5 mr-2 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contact Information
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-gray-500"
                  >Email Address</label
                >
                <p class="text-gray-900 font-medium">
                  {{ props?.employee?.email }}
                </p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-500">User ID</label>
                <p class="text-gray-900 font-mono">
                  {{ props?.employee?.user_id }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Employment Details -->
        <div class="space-y-6">
          <!-- Employment Status -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h2
              class="text-lg font-semibold text-gray-800 mb-4 flex items-center"
            >
              <svg
                class="h-5 w-5 mr-2 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Employment Details
            </h2>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">Employee ID</span>
                <span class="font-mono text-sm font-medium text-gray-900">{{
                  props?.employee.company_employee_id
                }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">Status</span>
                <span
                  :class="statusClass"
                  class="px-2 py-1 rounded-full text-xs font-medium"
                >
                  {{ formatStatus(props?.employee?.status) }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">Company Role</span>
                <span class="text-sm font-medium text-gray-900">{{
                  formatRole(props?.employee?.role)
                }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">System Role</span>
                <span class="text-sm font-medium text-gray-900 capitalize">{{
                  props?.employee?.user_role
                }}</span>
              </div>
            </div>
          </div>

          <!-- System Information -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h2
              class="text-lg font-semibold text-gray-800 mb-4 flex items-center"
            >
              <svg
                class="h-5 w-5 mr-2 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              System Information
            </h2>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">User ID</span>
                <span class="font-mono text-sm text-gray-900">{{
                  props?.employee?.user_id
                }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">Created By</span>
                <span class="text-sm text-gray-900">{{
                  props?.employee?.created_by_user || "System"
                }}</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Actions</h2>
            <div class="space-y-2">
              <button
                @click="sendMessage"
                class="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                <svg
                  class="h-4 w-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                Send Message
              </button>
              <button
                @click="editEmployee"
                class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
              >
                <svg
                  class="h-4 w-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// props
const props = defineProps({
  employee: {
    type: Object,
    required: true,
  },
});
// emits
const emit = defineEmits(["close"]);
// emit function
const closeModal = () => {
  emit("close");
};
const route = useRoute();
const router = useRouter();

// Employee data - in a real app, this would come from an API
const employee = ref({
  company_employee_id: "EMP-001",
  user_id: "USR-036",
  status: "active",
  role: "hr",
  name: "Sarah Johnson",
  email: "sarah.johnson@company.com",
  user_role: "HR Manager",
  created_by_user: "Admin User",
  bio: "Experienced HR professional with 8+ years in talent acquisition and employee development. Passionate about creating inclusive workplace cultures and driving organizational growth through strategic HR initiatives.",
  about:
    "I specialize in talent management, employee engagement, and organizational development. My focus is on building strong teams and fostering professional growth.",
  profile_photo:
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
});

// Computed properties
const statusClass = computed(() => {
  const classes = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    suspended: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
  };
  return classes[employee.value.status] || "bg-gray-100 text-gray-800";
});

// Methods
const formatStatus = (status) => {
  const statusMap = {
    active: "Active",
    inactive: "Inactive",
    suspended: "Suspended",
    pending: "Pending",
  };
  return statusMap[status] || status;
};

const formatRole = (role) => {
  const roleMap = {
    hr: "HR",
    manager: "Manager",
    employee: "Employee",
    admin: "Administrator",
  };
  return roleMap[role] || role;
};

const goBack = () => {
  router.back();
};

const sendMessage = () => {
  alert(`Opening message composer for ${employee.value.name}`);
  // In a real app, this would open a messaging interface
};

const editEmployee = () => {
  alert(`Opening edit form for ${employee.value.name}`);
  // In a real app, this would navigate to edit page or open modal
};

// In a real app, you would fetch employee data based on route params
onMounted(() => {
  // const employeeId = route.params.id;
  // fetchEmployee(employeeId);
});
</script>