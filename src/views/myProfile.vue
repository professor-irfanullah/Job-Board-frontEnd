<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <!-- Profile Header -->
        <div
          class="bg-indigo-700 px-6 py-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between"
        >
          <div class="flex items-center">
            <div class="relative">
              <img
                :src="
                  profile.photo_url ||
                  'https://res.cloudinary.com/dbvxz2y0g/image/upload/v1747718277/profile_images/zexgapiwqiej6eoasgfa.jpg'
                "
                alt="Profile Photo"
                class="h-20 w-20 rounded-full border-4 border-white object-cover"
              />
              <button
                v-if="isEditing"
                @click="triggerFileInput('photo')"
                class="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-800 transition"
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
              <h1 class="text-2xl font-bold text-white">
                {{ profile.username }}
              </h1>
              <p class="text-indigo-200">
                {{ profile.headline || "No headline yet" }}
              </p>
            </div>
          </div>
          <div class="mt-4 sm:mt-0">
            <button
              @click="toggleEditMode"
              class="px-4 py-2 bg-white text-indigo-700 rounded-md font-medium hover:bg-gray-100 transition"
            >
              {{ isEditing ? "Cancel" : "Edit Profile" }}
            </button>
          </div>
        </div>

        <!-- Profile Content -->
        <div class="px-6 py-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Left Column -->
            <div>
              <!-- Bio -->
              <div class="mb-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-2">About</h2>
                <template v-if="!isEditing">
                  <p class="text-gray-600 whitespace-pre-line">
                    {{ profile.bio || "No bio yet" }}
                  </p>
                </template>
                <template v-else>
                  <textarea
                    v-model="editableProfile.bio"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Tell us about yourself..."
                    rows="4"
                  ></textarea>
                </template>
              </div>

              <!-- Personal Info -->
              <div class="mb-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-2">
                  Personal Information
                </h2>
                <div class="space-y-4">
                  <!-- Email (always readonly) -->
                  <div>
                    <label class="block text-sm font-medium text-gray-500"
                      >Email</label
                    >
                    <p class="mt-1 text-gray-600">{{ profile.email }}</p>
                  </div>

                  <!-- Headline -->
                  <div>
                    <label class="block text-sm font-medium text-gray-500"
                      >Headline</label
                    >
                    <template v-if="!isEditing">
                      <p class="mt-1 text-gray-600">
                        {{ profile.headline || "Not specified" }}
                      </p>
                    </template>
                    <template v-else>
                      <input
                        v-model="editableProfile.headline"
                        type="text"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="E.g. Full Stack Developer"
                      />
                    </template>
                  </div>

                  <!-- Location -->
                  <div>
                    <label class="block text-sm font-medium text-gray-500"
                      >Location</label
                    >
                    <template v-if="!isEditing">
                      <p class="mt-1 text-gray-600">
                        {{ profile.location || "Not specified" }}
                      </p>
                    </template>
                    <template v-else>
                      <input
                        v-model="editableProfile.location"
                        type="text"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="E.g. San Francisco, CA"
                      />
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div>
              <!-- Resume -->
              <div class="mb-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-2">Resume</h2>
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
                      class="ml-2 text-indigo-600 hover:underline"
                      >View Resume</a
                    >
                  </div>
                  <p v-else class="text-gray-600">No resume uploaded</p>
                </template>
                <template v-else>
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
                      class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition"
                    >
                      Upload New Resume
                    </button>
                    <span
                      v-if="resumeFile"
                      class="ml-3 text-sm text-gray-600"
                      >{{ resumeFile.name }}</span
                    >
                  </div>
                  <p class="mt-2 text-xs text-gray-500">
                    Accepted formats: PDF, DOC, DOCX
                  </p>
                </template>
              </div>

              <!-- Social Links -->
              <div class="mb-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-2">
                  Social Links
                </h2>
                <div class="space-y-4">
                  <!-- LinkedIn -->
                  <div>
                    <label class="block text-sm font-medium text-gray-500"
                      >LinkedIn</label
                    >
                    <template v-if="!isEditing">
                      <div
                        v-if="profile.linkedin_url"
                        class="flex items-center"
                      >
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <a
                          :href="profile.linkedin_url"
                          target="_blank"
                          class="ml-2 text-indigo-600 hover:underline"
                          >View Profile</a
                        >
                      </div>
                      <p v-else class="text-gray-600">Not provided</p>
                    </template>
                    <template v-else>
                      <div class="flex rounded-md shadow-sm">
                        <span
                          class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500"
                        >
                          linkedin.com/in/
                        </span>
                        <input
                          v-model="editableProfile.linkedin_url"
                          type="text"
                          class="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="your-profile"
                        />
                      </div>
                    </template>
                  </div>

                  <!-- GitHub -->
                  <div>
                    <label class="block text-sm font-medium text-gray-500"
                      >GitHub</label
                    >
                    <template v-if="!isEditing">
                      <div v-if="profile.github_url" class="flex items-center">
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
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                          />
                        </svg>
                        <a
                          :href="profile.github_url"
                          target="_blank"
                          class="ml-2 text-indigo-600 hover:underline"
                          >View Profile</a
                        >
                      </div>
                      <p v-else class="text-gray-600">Not provided</p>
                    </template>
                    <template v-else>
                      <div class="flex rounded-md shadow-sm">
                        <span
                          class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500"
                        >
                          github.com/
                        </span>
                        <input
                          v-model="editableProfile.github_url"
                          type="text"
                          class="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
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
          <div v-if="isEditing" class="mt-8 flex justify-end">
            <button
              @click="saveProfile"
              :disabled="isSaving"
              class="px-6 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isSaving">Save Changes</span>
              <span v-else class="flex items-center">
                <svg
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
                Saving...
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

// Profile data (would normally come from API)
const profile = reactive({
  username: "Professor Irfan",
  email: "irfanprofessor60@gmail.com",
  bio: "Passionate full-stack developer with 5+ years of experience building web applications. Specialized in Vue.js and Node.js.",
  headline: "Senior Full Stack Developer",
  location: "Islamabad, PK",
  photo_url: "",
  resume_url: "",
  linkedin_url: "johndoe",
  github_url: "https://github.com/professor-irfanullah/Job-Board-frontEnd.git",
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
    photoFile.value = file;
    // Create preview URL
    editableProfile.value.photo_url = URL.createObjectURL(file);
  }
};

const handleResumeUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    resumeFile.value = file;
  }
};

const saveProfile = async () => {
  isSaving.value = true;

  try {
    // Here you would normally upload files and update profile via API
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
</script>