<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="md:flex">
        <!-- Left Side - Login Form -->
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

          <h2 class="text-2xl font-bold text-gray-800 mb-1">Welcome back</h2>
          <p class="text-gray-600 mb-6">Sign in to access your account</p>

          <form @submit.prevent="handleSubmit" class="space-y-4">
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
                @focus="handlfocus"
                v-model="form.email"
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
              />
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label for="remember" class="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div class="text-sm">
                <a href="#" class="font-medium text-indigo-600 hover:underline"
                  >Forgot password?</a
                >
              </div>
            </div>
            <div v-if="errMsg" class="err">
              <p
                class="font-medium text-sm text-red-400 capitalize animate-pulse"
              >
                {{ errMsg || "something went wrong!" }}
              </p>
            </div>
            <div v-if="okMessage" class="err">
              <p
                class="font-medium text-sm text-green-400 capitalize animate-pulse"
              >
                {{ okMessage || "Every thing looks good!" }}
              </p>
            </div>
            <!-- Submit Button -->
            <button
              :disabled="isButtonDisabled"
              type="submit"
              class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition flex items-center justify-center disabled:bg-indigo-300 disabled:cursor-not-allowed"
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
              Sign In
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Don't have an account?
              <a href="#" class="font-medium text-indigo-600 hover:underline"
                >Register now</a
              >
            </p>
          </div>
        </div>

        <!-- Right Side - Benefits -->
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
              <h2 class="ml-3 text-2xl font-bold">Benefits of Your Account</h2>
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
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold">Personalized Dashboard</h3>
                  <p class="mt-1 text-indigo-100">
                    Access your saved jobs, applications, and recommendations
                    all in one place.
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
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold">Quick Apply</h3>
                  <p class="mt-1 text-indigo-100">
                    Apply to jobs with your pre-filled profile information in
                    just one click.
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
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold">Application Tracking</h3>
                  <p class="mt-1 text-indigo-100">
                    Track the status of all your job applications in real-time.
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-10 border-t border-indigo-400 pt-6">
              <p class="text-indigo-200 italic">
                "I landed three interviews in my first week after signing in and
                updating my profile. The job matches are incredibly accurate!"
              </p>
              <p class="mt-2 text-indigo-100 font-medium">
                - M Hanzala, Software Engineer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/useUserState";

const store = useAuthStore();
const router = useRouter();
const railwayUrl =
  "https://authentication-production-18e1.up.railway.app/api/auth/login";
const errMsg = ref("");
const okMessage = ref("");
const isButtonDisabled = ref(false);
const form = ref({
  email: "",
  password: "",
});
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
  okMessage.value = "";
};
const handleSubmit = async () => {
  const isEmailValid = validateEmail();
  if (!isEmailValid) {
    errMsg.value = "Invalid Email!";
    isButtonDisabled.value = true;
    okMessage.value = "";
    return;
  }

  const response = await store.login(form.value.email, form.value.password);
  if (
    response.err ||
    response === "Invalid credentials" ||
    response === "User not found!"
  ) {
    errMsg.value = response.err || response;
    okMessage.value = "";
    isButtonDisabled.value = true;
    return;
  } else {
    isButtonDisabled.value = true;
    okMessage.value = `Please wait while we log you in...`;
    errMsg.value = "";
    await store.getUserInformation();
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  }
};
</script>