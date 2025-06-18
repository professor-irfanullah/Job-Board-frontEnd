<template>
  <main class="p-4 max-w-[900px] mx-auto">
    <header
      class="header rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-md max-w-[900px] mx-auto p-4"
    >
      <div
        class="flex flex-col gap-2 items-cente flex-wrap justify-around w700:flex-row w700:items-center"
      >
        <section
          class="profile&info flex items-center flex-wrap w600:gap-2 gap-1"
        >
          <div class="imageIcon relative">
            <div
              class="img w-[50px] h-[50px] w200:w-[100px] w200:h-[100px] rounded-full overflow-hidden border-2 w200:border-4"
            >
              <img
                class="w-[50px] h-[50px] w200:w-[100px] w200:h-[100px] flex items-center justify-center"
                :src="userInfo.photo_url"
                alt="profile_img"
              />
            </div>
            <div v-if="isEditing" class="profile">
              <label for="profile">
                <p
                  class="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-800 transition-all transform hover:scale-110 shadow-md"
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
                </p>
                <input
                  @change="handleProfileChange"
                  type="file"
                  class="hidden"
                  id="profile"
                  accept="image/jpg"
                />
              </label>
            </div>
          </div>

          <div class="userInfo">
            <h1 class="text-white font-bold text-xl capitalize">
              {{ store?.user?.user?.name }}
            </h1>
            <template v-if="!isEditing">
              <div v-if="userInfo.headline" class="">
                <p class="text-white text-sm">{{ userInfo.headline }}</p>
              </div>
              <div v-else class="">
                <p class="text-white text-sm">Add your Professional headline</p>
              </div>
              <!--  -->
            </template>
            <template v-else>
              <p class="text-white text-sm">Add your Professional headline</p>
            </template>
          </div>
        </section>
        <div class="btn mt-2 w400:mt-0">
          <button
            @click="isEditing = !isEditing"
            class="px-5 py-2.5 bg-white text-indigo-700 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md flex items-center flex-wrap"
          >
            <span>{{ isEditing ? "Cancel Edit" : "Edit Profile" }}</span>
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
          <div
            v-if="isEditing && profilePictureInput"
            :title="profilePictureInput.name"
            class="btn mt-2"
          >
            <button
              @click="sumbitProfilePhoto"
              class="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition flex items-center shadow-sm cursor-pointer"
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
              <p class="">{{ profilePictureInput.name }}</p>
            </button>
            <div class="errInProfileUpload mt-2">
              <p v-if="errInProfileUpload" class="text-red-400">
                {{ errInProfileUpload }}
              </p>
              <p v-if="successProfileUpload" class="text-green-300">
                {{ successProfileUpload }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section class="details">
      <div class="mb-8 p-4 rounded-md bg-gray-50">
        <div class="flex items-center mb-4 mt-4">
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
          <h2 class="text-xl font-semibold text-gray-800 ml-3">About Me</h2>
        </div>
        <template v-if="!isEditing">
          <div v-if="userInfo.bio">
            <p class="text-gray-600 whitespace-pre-line pl-11">
              {{ userInfo.bio }}
            </p>
          </div>
          <div v-else>
            <p class="text-gray-600 whitespace-pre-line pl-11">
              Tell potential employers about yourself, your skills, and
              experience.
            </p>
          </div>
        </template>
        <template v-else>
          <textarea
            @focus="enableButtonAgain"
            class="w-full p-2 border"
            rows="4"
            v-model.trim="userInfo.bio"
            placeholder="About your self"
          ></textarea>
          <p class="text-xs text-gray-500 mt-1">
            This will be displayed on your public profile.
          </p>
        </template>
      </div>
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
              <p class="text-gray-700 text-wrap overflow-auto">
                {{ store?.user?.user?.email }}
              </p>
            </div>
            <div class="mt-3">
              <label class="block text-sm font-medium text-gray-500 mb-1"
                >Professional Headline</label
              >
              <template v-if="!isEditing">
                <div v-if="userInfo.headline" class="">
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
                      {{ userInfo.headline }}
                    </p>
                  </div>
                </div>
                <div v-else class="">
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
                      {{ "Not specified" }}
                    </p>
                  </div>
                </div>
              </template>
              <template v-else>
                <input
                  v-model.trim="userInfo.headline"
                  type="text"
                  @focus="enableButtonAgain"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="E.g. Senior Full Stack Developer"
                />
                <p class="text-xs text-gray-500 mt-1">
                  This appears below your name in search results.
                </p>
              </template>

              <!-- location -->
            </div>
            <div class="mt-3">
              <label class="block text-sm font-medium text-gray-500 mb-1"
                >Location</label
              >
              <template v-if="!isEditing">
                <div v-if="userInfo.location" class="">
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
                      {{ userInfo.location }}
                    </p>
                  </div>
                </div>
                <div v-else class="">
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
                      {{ "Not specified" }}
                    </p>
                  </div>
                </div>
              </template>
              <template v-else>
                <input
                  v-model.trim="userInfo.location"
                  type="text"
                  @focus="enableButtonAgain"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="E.g. Islamabad, PK"
                />
                <p class="text-xs text-gray-500 mt-1">
                  Helps employers find local candidates.
                </p>
              </template>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div class="mt-3">
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
            <h2 class="text-xl font-semibold text-gray-800 ml-3">Resume</h2>
          </div>

          <div class="pl-11">
            <template v-if="!isEditing">
              <div v-if="userInfo.resume_url" class="flex items-center">
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
                  :href="userInfo.resume_url"
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
                    No resume uploaded. Upload one to increase your visibility.
                  </p>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="space-y-4">
                <div class="flex items-center">
                  <label
                    for="file"
                    class="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition flex items-center shadow-sm cursor-pointer"
                  >
                    <input
                      id="file"
                      type="file"
                      accept="application/pdf"
                      class="hidden"
                      @change="handleFileChange"
                    />
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
                    <p>Choose File</p>
                  </label>
                  <div v-if="resumeInput" class="fileName">
                    <p
                      class="ml-2 text-lg font-semibold text-gray-600 truncate max-w-xs"
                    >
                      {{ resumeInput.name }}
                    </p>
                  </div>
                  <!-- @click="handleFileChange('resume')" -->

                  <span
                    v-if="userInfo.resume_url"
                    class="ml-3 text-sm text-gray-600 truncate max-w-xs"
                    >{{ userInfo.resume_url }}</span
                  >
                </div>
                <div class="text-xs text-gray-500">
                  <p>• Accepted format: PDF only</p>
                  <p>• Maximum file size: 5MB</p>
                  <p>• Your resume will be visible to employers</p>
                </div>
                <div v-if="notSupportedCVMessage" class="notSupportedCVMessage">
                  <p class="text-red-500 font-semibold animate-pulse">
                    {{ notSupportedCVMessage }}...
                  </p>
                </div>
                <div v-if="cvUploadMessage" class="notSupportedCVMessage">
                  <p class="text-green-500 font-semibold animate-pulse">
                    {{ cvUploadMessage }}...
                  </p>
                </div>
                <div v-if="resumeInput" class="btn">
                  <button
                    @click="submitpdf"
                    class="px-4 py-2.5 bg-blue-300 border border-blue-200 text-gray-700 rounded-lg font-medium hover:bg-blue-100 transition flex items-center shadow-sm cursor-pointer"
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
                    <p>Upload CV</p>
                  </button>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="bg bg-gray-50 rounded-md border border-gray-100">
        <div class="social p-6 mt-2">
          <div class="div flex items-center gap-2">
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
            <h1 class="text-xl font-semibold text-gray-800 ml-2">
              Social Links
            </h1>
          </div>
          <div class="linkedin mt-5 pl-11">
            <div class="linkedinSection">
              <label class="block text-sm font-medium text-gray-500 mb-1"
                >LinkedIn</label
              >
              <template v-if="isEditing">
                <div class="flex rounded-md shadow-sm">
                  <span
                    class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                  >
                    linkedin.com/in/
                  </span>
                  <input
                    v-model.trim="userInfo.linkedin_url"
                    type="text"
                    @focus="enableButtonAgain"
                    class="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="your-profile"
                  />
                </div>
              </template>
              <template v-else>
                <div v-if="userInfo.linkedin_url" class="flex items-center">
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
                    :href="'https://linkedin.com/in/' + userInfo.linkedin_url"
                    target="_blank"
                    class="ml-2 text-indigo-600 hover:underline font-medium"
                    >linkedin.com/in/{{ userInfo.linkedin_url }}</a
                  >
                </div>
                <div v-else class="text-gray-500 italic">Not provided</div>
              </template>
            </div>
            <!-- github section -->
            <div class="githubSection mt-5">
              <div class="github">
                <label class="block text-sm font-medium text-gray-500 mb-1"
                  >Github</label
                >
                <template v-if="!isEditing">
                  <div v-if="userInfo.github_url" class="flex items-center">
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
                      :href="'https://github.com/' + userInfo.github_url"
                      target="_blank"
                      class="ml-2 text-indigo-600 hover:underline font-medium"
                      >github.com/{{ userInfo.github_url }}</a
                    >
                  </div>
                  <div v-else class="text-gray-500 italic">Not provided</div>
                </template>
                <template v-else>
                  <div class="flex rounded-md shadow-sm">
                    <span
                      class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                    >
                      github.com/
                    </span>
                    <input
                      v-model.trim="userInfo.github_url"
                      type="text"
                      @focus="enableButtonAgain"
                      class="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      placeholder="your-username"
                    />
                  </div>
                  <div
                    v-if="responseMessage"
                    class="responseMessage pt-4 font-semibold text-green-500 animate-pulse"
                  >
                    <p>{{ responseMessage || "operation successful" }}...</p>
                  </div>
                  <div
                    v-if="errorMessage"
                    class="responseMessage pt-4 font-semibold text-red-500 animate-pulse"
                  >
                    <p>{{ errorMessage || "Error occured" }}...</p>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isEditing" class="mt-10 flex justify-end space-x-4">
        <button
          @click="isEditing = !isEditing"
          class="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
        >
          Cancel Edit
        </button>
        <button
          :disabled="disableBtn"
          @click="submitDetails"
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
    </section>
  </main>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "../store/useUserState";
import axios from "axios";
const store = useAuthStore();

const userInfo = ref({});
const isEditing = ref(false);
const resumeInput = ref(null);
const isSaving = ref(false);
const notSupportedCVMessage = ref("");
const disableBtn = ref(false);
const errorMessage = ref("");
const responseMessage = ref("");
const cvUploadMessage = ref("");
const profilePictureInput = ref("");
const errInProfileUpload = ref("");
const successProfileUpload = ref("");

const getInfo = async () => {
  const response = await store.getUserInformation();
  if (!response) return false;
  userInfo.value = response.data;
};

const validateInputs = () => {
  const information = {
    about: userInfo.value.bio || null,
    headline: userInfo.value.headline || null,
    location: userInfo.value.location || null,
    linkedin_url: userInfo.value.linkedin_url || null,
    github_url: userInfo.value.github_url || null,
  };

  return information;
};
const handleFileChange = (event) => {
  notSupportedCVMessage.value = "";
  console.log("handleFileChanged triggered");
  const file = event.target.files[0];
  if (file && file.type === "application/pdf") {
    resumeInput.value = file;
  } else {
    console.log("no file or not in pdf format");
    notSupportedCVMessage.value = "Only PDF files are supported";
    resumeInput.value = null;
  }
};
const submitpdf = async () => {
  cvUploadMessage.value = "Please wait";
  const formData = new FormData();
  formData.append("file", resumeInput.value);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/seeker/profile/cv",
      formData,
      { withCredentials: true }
    );
    console.log(response);
    cvUploadMessage.value = response.data.msg;
    notSupportedCVMessage.value = "";
    resumeInput.value = null;
    await store.getUserInformation();
  } catch (error) {
    notSupportedCVMessage.value = error.response.data;
    cvUploadMessage.value = "";
  }
};
const enableButtonAgain = () => {
  disableBtn.value = false;
  errorMessage.value = "";
  responseMessage.value = "";
};
const submitDetails = async () => {
  const validInputs = validateInputs();
  const response = await store.postUserProfileInformation(validInputs);
  if (response.msg === "operation successful") {
    responseMessage.value = response.msg;
    errorMessage.value = "";
    await store.getUserInformation();
    disableBtn.value = true;
    return;
  }
  console.log(response);
  errorMessage.value = response?.data?.err || "Something went wrong";
  responseMessage.value = "";
  disableBtn.value = true;
  await store.getUserInformation();
};
const handleProfileChange = (event) => {
  const file = event.target.files[0];
  if (
    file &&
    (file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg")
  ) {
    profilePictureInput.value = file;
    return;
  }
  console.log("not supported");
  profilePictureInput.value = null;
};
const sumbitProfilePhoto = async () => {
  successProfileUpload.value = "Uploading please wait...";
  console.log("triggered", profilePictureInput.value);
  if (!profilePictureInput.value) return;
  const formData = new FormData();
  formData.append("profile", profilePictureInput.value);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/seeker/profile/picture",
      formData,
      { withCredentials: true }
    );
    successProfileUpload.value = response.data.msg;
    errInProfileUpload.value = "";
    getInfo();
    console.log(response);
    profilePictureInput.value = null;
  } catch (err) {
    console.error(err);
    successProfileUpload.value = "";
    errInProfileUpload.value = err.response.data.err;
  }
};
onMounted(() => getInfo());
</script>
