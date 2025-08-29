<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="md:flex">
        <!-- Left Side - Registration Form -->
        <div class="md:w-1/2 p-8">
          <div class="flex items-center justify-center mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h1 class="ml-3 text-2xl font-bold text-gray-800">JobConnect</h1>
          </div>

          <h2 class="text-2xl font-bold text-gray-800 mb-1">
            Create your account
          </h2>
          <p class="text-gray-600 mb-6">
            Join our community of professionals and employers
          </p>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Username Field -->
            <div>
              <label
                for="username"
                class="text-sm font-medium text-gray-700 mb-1 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Username
              </label>
              <input
                v-model="form.username"
                type="text"
                id="username"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Enter your username"
              />
            </div>

            <!-- Email Field -->
            <div>
              <label
                for="email"
                class="text-sm font-medium text-gray-700 mb-1 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email
              </label>
              <input
                v-model="form.email"
                @focus="handlfocus"
                type="email"
                id="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="your@email.com"
              />
            </div>

            <!-- Password Field -->
            <div>
              <label
                for="password"
                class="text-sm font-medium text-gray-700 mb-1 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Password
              </label>
              <input
                v-model="form.password"
                type="password"
                id="password"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="••••••••"
                minlength="8"
              />
            </div>

            <div v-if="errMsg" class="err">
              <p class="font-medium text-red-400 text-sm">
                {{ errMsg || "An error has occured!" }}
              </p>
            </div>

            <div v-if="okMessage" class="ok">
              <p class="font-medium text-green-400 text-sm">
                {{ okMessage || "Every thing is under controll!" }}
              </p>
            </div>
            <!-- Terms Checkbox -->
            <div class="flex items-center">
              <input
                id="terms"
                type="checkbox"
                required
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label for="terms" class="ml-2 block text-sm text-gray-700">
                I agree to the
                <a href="#" class="text-indigo-600 hover:underline"
                  >Terms of Service</a
                >
                and
                <a href="#" class="text-indigo-600 hover:underline"
                  >Privacy Policy</a
                >
              </label>
            </div>

            <!-- Submit Button -->
            <button
              :disabled="isButtonDisabled"
              type="submit"
              class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition flex items-center justify-center disabled:bg-indigo-400 disabled:cursor-not-allowed"
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
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Register Now
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Already have an account?
              <router-link
                to="/login"
                class="font-medium text-indigo-600 hover:underline"
                >Sign in</router-link
              >
            </p>
          </div>
          <div class="mt-1 text-center">
            <p class="text-sm text-gray-600">
              Account not verified?
              <button
                @click="showVerificationModel = !showVerificationModel"
                class="font-medium text-indigo-600 hover:underline cursor-pointer"
              >
                check account status
              </button>
            </p>
          </div>
        </div>

        <!-- Right Side - Importance of Registration -->
        <div
          class="md:w-1/2 bg-indigo-600 text-white p-8 flex flex-col justify-center"
        >
          <div class="max-w-md mx-auto">
            <div class="flex items-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 class="ml-3 text-2xl font-bold">Why Register With Us?</h2>
            </div>

            <div class="space-y-6">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-indigo-200"
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
                <div class="ml-4">
                  <h3 class="text-lg font-semibold">Access to Top Jobs</h3>
                  <p class="mt-1 text-indigo-100">
                    Get exclusive access to thousands of job listings from top
                    employers in your industry.
                  </p>
                </div>
              </div>

              <div class="flex">
                <div class="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-indigo-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold">Personalized Matches</h3>
                  <p class="mt-1 text-indigo-100">
                    Our algorithm matches you with jobs that fit your skills,
                    experience, and preferences.
                  </p>
                </div>
              </div>

              <div class="flex">
                <div class="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-indigo-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold">Job Alerts</h3>
                  <p class="mt-1 text-indigo-100">
                    Receive email notifications when new jobs matching your
                    criteria are posted.
                  </p>
                </div>
              </div>

              <div class="flex">
                <div class="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-indigo-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold">Secure Profile</h3>
                  <p class="mt-1 text-indigo-100">
                    Your information is protected with industry-standard
                    security measures.
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-10 border-t border-indigo-400 pt-6">
              <p class="text-indigo-200 italic">
                "JobConnect helped me find my dream job in just 2 weeks after
                registration. The process was seamless and the job matches were
                spot on!"
              </p>
              <p class="mt-2 text-indigo-100 font-medium">
                - Irfan Khan, Marketing Director
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showVerificationModel"
      class="fixed inset-0 border-2 bg-gray-200 flex justify-center items-center"
    >
      <verifyAccount @click.self="showVerificationModel = false" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../../api/api";
import verifyAccount from "../../components/verifyAccount.vue";
const okMessage = ref("");
const showVerificationModel = ref(false);
const form = ref({
  username: "",
  email: "",
  password: "",
});

const errMsg = ref("");
const isButtonDisabled = ref(false);
const selfClick = () => {
  console.log("click on the box");
};
const validateEmail = () => {
  const regex = /[a-zA-Z0-9]+[a-zA-Z0-9]+@[a-z]{3,}.com$/;
  if (regex.test(form.value.email)) {
    return true;
  }
  return false;
};
const handlfocus = () => {
  isButtonDisabled.value = false;
  errMsg.value = "";
};
const handleSubmit = async () => {
  // Handle form submission logic here
  const isEmailValid = validateEmail();

  if (!isEmailValid) {
    errMsg.value = "Invalid Email";
    isButtonDisabled.value = true;
    return;
  }
  console.log(isEmailValid);

  try {
    const response = await api.post("/api/auth/register", {
      user_name: form.value.username,
      email: form.value.email,
      password: form.value.password,
    });
    console.log(response);
    okMessage.value = response.data.okMessage;
    errMsg.value = "";
    isButtonDisabled.value = true;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      okMessage.value = "";
      errMsg.value = "Network Disconnected...";
      isButtonDisabled.value = true;
      return;
    }
    if (error.status === 403) {
      okMessage.value = "";
      errMsg.value =
        error?.response?.data?.msg || "Something went wrong due to conflict...";
      isButtonDisabled.value = true;
    }
    if (error.status === 500) {
      okMessage.value = "";
      errMsg.value = error?.response?.data?.err || "internal server error...";
      isButtonDisabled.value = true;
    }
    console.error(error);
  }
};
</script>