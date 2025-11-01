<template>
  <main
    @click.self="closeModal"
    class="bg-gray-50 min-h-screen p-4 overflow-y-auto z-10"
  >
    <div class="max-w-2xl mx-auto">
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

      <!-- Header -->
      <div class="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Invite Employee</h1>
        <p class="text-gray-600">Send invitation to join your company</p>
      </div>

      <!-- Invitation Form -->
      <div class="bg-white p-6 rounded-xl shadow-sm">
        <form @submit.prevent="checkUser">
          <!-- Email Input -->
          <div class="space-y-2 mb-6">
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <input
              v-model.trim="email"
              type="email"
              id="email"
              required
              :class="[
                'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                errors.email ? 'border-red-300' : 'border-gray-300',
                isChecking ? 'bg-gray-100' : '',
              ]"
              placeholder="employee@example.com"
              :disabled="isChecking"
              @input="clearErrors"
            />
            <p v-if="errors.email" class="text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <!-- Check User Button -->
          <button
            type="submit"
            :disabled="!email || isChecking"
            class="w-full px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition flex items-center justify-center disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            <svg
              v-if="isChecking"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ isChecking ? "Sending..." : "Invite User" }}
          </button>
        </form>

        <!-- User Found Section -->
        <div
          v-if="userFound"
          class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div
                class="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center"
              >
                <svg
                  class="h-5 w-5 text-blue-600"
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
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-blue-800">User Found</h3>
                <p class="text-sm text-blue-600">
                  {{ userDetails.name }} ({{ userDetails.email }})
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="errors.general"
          class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <div class="flex items-center">
            <svg
              class="h-5 w-5 text-red-400 mr-3"
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
            <div>
              <h3 class="text-sm font-medium text-red-800">Error</h3>
              <p class="text-sm text-red-600 mt-1">{{ errors.general }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Help Text -->
      <div class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 class="text-sm font-medium text-blue-800 mb-2">How it works</h3>
        <ul class="text-sm text-blue-600 space-y-1">
          <li>• Enter the email address of the employee you want to invite</li>
          <li>
            • We'll check if they already have an account with the employee role
          </li>
          <li>• If eligible, we'll send them a verification email</li>
          <li>
            • Once they verify, they will be added to your company automatically
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import api from "../../api/api";
// Adjust path as needed
const props = defineProps({
  emp: {
    type: Object,
    requires: true,
  },
});

// emits
const emits = defineEmits(["close"]);

// emit function
const closeModal = () => {
  emits("close");
};
// Reactive data
const email = ref("");
const isChecking = ref(false);
const userFound = ref(false);
const userNotFound = ref(false);
const alreadyInvited = ref(false);
const invitationSent = ref(false);

// User details
const userDetails = ref({
  name: "",
  email: "",
});

// Error handling
const errors = ref({
  email: "",
  general: "",
});

// Validation
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._+-]+@gmail\.com$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return "";
};

// Clear errors
const clearErrors = () => {
  errors.value.email = "";
  errors.value.general = "";
  userNotFound.value = false;
  alreadyInvited.value = false;
};

// Check if user exists
const checkUser = async () => {
  const emailError = validateEmail(email.value);
  if (emailError) {
    errors.value.email = emailError;
    return;
  }

  isChecking.value = true;
  clearErrors();

  try {
    const response = await api.post(
      "/api/employee/check/user/exists/to/invite",
      {
        email: email.value,
        company_id: props?.emp?.company_id,
      },
      { withCredentials: true }
    );
    userFound.value = true;
    userDetails.value = {
      name: response.data.msg,
      email: ` An Invitation is sent to this email ${email.value}, Once verified he will be added to this company. They will receive an email to join your company`,
    };
    console.log(response.data);

    invitationSent.value = true;
  } catch (error) {
    console.log(error);

    userFound.value = false;
    console.log(error.response.data);
    errors.value.general =
      error.response?.data?.msg ||
      error.response?.data?.err ||
      "Failed to check user. Please try again.";
  } finally {
    isChecking.value = false;
  }
};
</script>