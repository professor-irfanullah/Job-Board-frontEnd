<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <div class="bg-white shadow-xl rounded-xl overflow-hidden">
        <!-- Profile Header with Gradient Background -->
        <div class="bg-gradient-to-r from-indigo-700 to-indigo-600 px-8 py-8">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="flex items-center">
              <div class="relative group">
                <img
                  :src="profile.photo_url || defaultProfileImage"
                  alt="Profile Photo"
                  class="h-24 w-24 rounded-full border-4 border-white/90 object-cover shadow-md"
                />
                <button
                  v-if="isEditing"
                  @click="triggerFileInput('photo')"
                  class="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-800 transition-all transform hover:scale-110 shadow-md"
                  aria-label="Change profile photo"
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
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
                <input
                  type="file"
                  ref="photoInput"
                  @change="handlePhotoUpload"
                  accept="image/*"
                  class="hidden"
                />
              </div>
              <div class="ml-6">
                <h1 class="text-2xl md:text-3xl font-bold text-white">
                  {{ profile.username }}
                </h1>
                <p class="text-indigo-100 mt-1 text-lg">
                  {{ profile.headline || "Your professional headline" }}
                </p>
              </div>
            </div>
            <div class="mt-6 sm:mt-0">
              <button
                @click="toggleEditMode"
                class="px-5 py-2.5 bg-white text-indigo-700 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md flex items-center"
              >
                <span>{{ isEditing ? "Cancel Editing" : "Edit Profile" }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 ml-2"
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

        <!-- Profile Content -->
        <div class="px-8 py-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <!-- Left Column -->
            <div>
              <!-- Bio Section -->
              <div class="mb-8 p-4 rounded-md bg-gray-50">
                <div class="flex items-center mb-4">
                  <div class="bg-indigo-100 p-2 rounded-lg">
                    <svg
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h2 class="text-xl font-semibold text-gray-800 ml-3">
                    About Me
                  </h2>
                </div>
                <template v-if="!isEditing">
                  <p class="text-gray-600 whitespace-pre-line pl-11">
                    {{
                      profile.bio ||
                      "Tell potential employers about yourself, your skills, and experience."
                    }}
                  </p>
                </template>
                <template v-else>
                  <textarea
                    v-model="editableProfile.bio"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition mt-2"
                    placeholder="Describe your professional background, skills, and achievements..."
                    rows="5"
                  ></textarea>
                  <p class="text-xs text-gray-500 mt-1">
                    This will be displayed on your public profile.
                  </p>
                </template>
              </div>

              <!-- Personal Information Section -->
              <div class="bg-gray-50 rounded-xl p-6">
                <div class="flex items-center mb-4">
                  <div class="bg-indigo-100 p-2 rounded-lg">
                    <svg
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h2 class="text-xl font-semibold text-gray-800 ml-3">
                    Personal Information
                  </h2>
                </div>

                <div class="space-y-5 pl-11">
                  <!-- Email (always readonly) -->
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-1"
                      >Email Address</label
                    >
                    <div class="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-400 mr-2"
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
                      <p class="text-gray-700">{{ profile.email }}</p>
                    </div>
                  </div>

                  <!-- Headline -->
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-1"
                      >Professional Headline</label
                    >
                    <template v-if="!isEditing">
                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-gray-400 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                          />
                        </svg>
                        <p class="text-gray-700">
                          {{ profile.headline || "Not specified" }}
                        </p>
                      </div>
                    </template>
                    <template v-else>
                      <input
                        v-model="editableProfile.headline"
                        type="text"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="E.g. Senior Full Stack Developer"
                      />
                      <p class="text-xs text-gray-500 mt-1">
                        This appears below your name in search results.
                      </p>
                    </template>
                  </div>

                  <!-- Location -->
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-1"
                      >Location</label
                    >
                    <template v-if="!isEditing">
                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-gray-400 mr-2"
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
                        <p class="text-gray-700">
                          {{ profile.location || "Not specified" }}
                        </p>
                      </div>
                    </template>
                    <template v-else>
                      <input
                        v-model="editableProfile.location"
                        type="text"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="E.g. San Francisco, CA"
                      />
                      <p class="text-xs text-gray-500 mt-1">
                        Helps employers find local candidates.
                      </p>
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div>
              <!-- Resume Section -->
              <div class="bg-gray-50 rounded-xl p-6 mb-8">
                <div class="flex items-center mb-4">
                  <div class="bg-indigo-100 p-2 rounded-lg">
                    <svg
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h2 class="text-xl font-semibold text-gray-800 ml-3">
                    Resume
                  </h2>
                </div>

                <div class="pl-11">
                  <template v-if="!isEditing">
                    <div v-if="profile.resume_url" class="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <a
                        :href="profile.resume_url"
                        target="_blank"
                        class="ml-2 text-indigo-600 hover:underline font-medium"
                        >View Current Resume</a
                      >
                    </div>
                    <div
                      v-else
                      class="bg-yellow-50 border border-yellow-100 rounded-lg p-4"
                    >
                      <div class="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-yellow-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <p class="ml-2 text-yellow-700">
                          No resume uploaded. Upload one to increase your
                          visibility.
                        </p>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="space-y-4">
                      <div class="flex items-center">
                        <input
                          type="file"
                          ref="resumeInput"
                          @change="handleResumeUpload"
                          accept=".pdf,.doc,.docx"
                          class="hidden"
                        />
                        <button
                          @click="triggerFileInput('resume')"
                          class="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition flex items-center shadow-sm"
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
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          Choose File
                        </button>
                        <span
                          v-if="resumeFile"
                          class="ml-3 text-sm text-gray-600 truncate max-w-xs"
                          >{{ resumeFile.name }}</span
                        >
                      </div>
                      <div class="text-xs text-gray-500">
                        <p>• Accepted formats: PDF, DOC, DOCX</p>
                        <p>• Maximum file size: 5MB</p>
                        <p>• Your resume will be visible to employers</p>
                      </div>
                    </div>
                  </template>
                </div>
              </div>

              <!-- Social Links Section -->
              <div class="bg-gray-50 rounded-xl p-6">
                <div class="flex items-center mb-4">
                  <div class="bg-indigo-100 p-2 rounded-lg">
                    <svg
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h2 class="text-xl font-semibold text-gray-800 ml-3">
                    Social Profiles
                  </h2>
                </div>

                <div class="space-y-5 pl-11">
                  <!-- LinkedIn -->
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-1"
                      >LinkedIn</label
                    >
                    <template v-if="!isEditing">
                      <div
                        v-if="profile.linkedin_url"
                        class="flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                          />
                        </svg>
                        <a
                          :href="
                            'https://linkedin.com/in/' + profile.linkedin_url
                          "
                          target="_blank"
                          class="ml-2 text-indigo-600 hover:underline font-medium"
                          >linkedin.com/in/{{ profile.linkedin_url }}</a
                        >
                      </div>
                      <div v-else class="text-gray-500 italic">
                        Not provided
                      </div>
                    </template>
                    <template v-else>
                      <div class="flex rounded-md shadow-sm">
                        <span
                          class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                        >
                          linkedin.com/in/
                        </span>
                        <input
                          v-model="editableProfile.linkedin_url"
                          type="text"
                          class="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          placeholder="your-profile"
                        />
                      </div>
                    </template>
                  </div>

                  <!-- GitHub -->
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-1"
                      >GitHub</label
                    >
                    <template v-if="!isEditing">
                      <div v-if="profile.github_url" class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                          />
                        </svg>
                        <a
                          :href="'https://github.com/' + profile.github_url"
                          target="_blank"
                          class="ml-2 text-indigo-600 hover:underline font-medium"
                          >github.com/{{ profile.github_url }}</a
                        >
                      </div>
                      <div v-else class="text-gray-500 italic">
                        Not provided
                      </div>
                    </template>
                    <template v-else>
                      <div class="flex rounded-md shadow-sm">
                        <span
                          class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                        >
                          github.com/
                        </span>
                        <input
                          v-model="editableProfile.github_url"
                          type="text"
                          class="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          placeholder="your-username"
                        />
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Save Button (visible only in edit mode) -->
          <div v-if="isEditing" class="mt-10 flex justify-end space-x-4">
            <button
              @click="toggleEditMode"
              class="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Discard Changes
            </button>
            <button
              @click="saveProfile"
              :disabled="isSaving"
              class="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
            >
              <svg
                v-if="isSaving"
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
              <span>{{ isSaving ? "Saving..." : "Save Profile" }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useAuthStore } from "../store/useUserState";
const store = useAuthStore();
const defaultProfileImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWh4JQiguAxq1T3C0NPL_e4KgaRWS-a5_EgQ&s";

// Profile data (would normally come from API)
const profile = reactive({
  username: store?.user?.user?.name || "undefined",
  email: store?.user?.user?.email || "undefined",
  bio:
    store?.userInfo?.data?.bio ||
    "" /*"Senior Full Stack Developer with 8+ years of experience building scalable web applications. Specialized in JavaScript frameworks (Vue.js, React) and cloud architecture. Passionate about creating intuitive user experiences and mentoring junior developers." */,
  headline:
    store?.userInfo?.data?.headline ||
    "" /*"Senior Full Stack Developer | JavaScript Specialist"*/,
  location: store?.userInfo?.data?.locatoin || "" /*"Barikot, Swat"*/,
  photo_url: store?.userInfo?.data?.photo_url || "",
  resume_url: store?.userInfo?.data?.resume_url || "",
  linkedin_url: store?.userInfo?.data?.linkedin_url || "",
  github_url: store?.userInfo?.data?.github_url || "",
});

const editableProfile = ref({ ...profile });
const isEditing = ref(false);
const isSaving = ref(false);
const photoInput = ref(null);
const resumeInput = ref(null);
const photoFile = ref(null);
const resumeFile = ref(null);

const toggleEditMode = () => {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) {
    // Reset changes if canceling
    editableProfile.value = { ...profile };
    photoFile.value = null;
    resumeFile.value = null;
  }
};

const triggerFileInput = (type) => {
  if (type === "photo") {
    photoInput.value.click();
  } else {
    resumeInput.value.click();
  }
};

const handlePhotoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Validate file type
    if (!file.type.match("image.*")) {
      alert("Please select an image file (JPEG, PNG)");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be less than 2MB");
      return;
    }

    photoFile.value = file;
    // Create preview URL
    editableProfile.value.photo_url = URL.createObjectURL(file);
  }
};

const handleResumeUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a PDF or Word document");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Resume must be less than 5MB");
      return;
    }

    resumeFile.value = file;
  }
};

const saveProfile = async () => {
  isSaving.value = true;

  try {
    // Here you would typically upload files and update profile via API
    if (photoFile.value) {
      // Upload photo and get URL
      // const photoUrl = await uploadFile(photoFile.value)
      // editableProfile.value.photo_url = photoUrl
    }

    if (resumeFile.value) {
      // Upload resume and get URL
      // const resumeUrl = await uploadFile(resumeFile.value)
      // editableProfile.value.resume_url = resumeUrl
    }

    // Update profile data
    Object.assign(profile, editableProfile.value);

    // Reset edit mode
    isEditing.value = false;
    photoFile.value = null;
    resumeFile.value = null;

    console.log("Profile updated:", profile);
  } catch (error) {
    console.error("Error saving profile:", error);
  } finally {
    isSaving.value = false;
  }
};

const getuserInfo = async () => {
  await store.getUserInformation();
  console.log(store.userInfo);
};
onMounted(() => getuserInfo());
</script>