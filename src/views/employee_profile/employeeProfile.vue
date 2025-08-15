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
                class="w-[50px] h-[50px] w200:w-[100px] w200:h-[100px] flex items-center justify-center bg-white"
                alt="Company Logo"
                :src="
                  companyInfo?.company_logo_url ||
                  'https://via.placeholder.com/150?text=Company+Logo'
                "
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
                  @change="handleLogoChange"
                  type="file"
                  class="hidden"
                  id="profile"
                  accept="image/jpg,image/png,image/jpeg"
                />
              </label>
            </div>
          </div>

          <div class="userInfo">
            <h1 class="text-white font-bold text-xl capitalize">
              {{ companyInfo?.company_name || "Company Name" }}
            </h1>
            <template v-if="!isEditing">
              <div v-if="companyInfo?.tagline" class="">
                <p class="text-white text-sm">{{ companyInfo?.tagline }}</p>
              </div>
              <div v-else class="">
                <p class="text-white text-sm">Add your company name</p>
              </div>
            </template>
            <template v-else>
              <input
                v-model.trim="companyInfo.company_name"
                type="text"
                required
                @focus="enableButtonAgain"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Company name"
              />
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
            v-if="isEditing && logoInput"
            :title="companyInfo?.company_logo_url"
            class="btn mt-2"
          >
            <button
              @click="submitLogo"
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
              <p class="">{{ logoInput.name }}</p>
            </button>
            <div class="errInLogoUpload mt-2">
              <p v-if="errInLogoUpload" class="text-red-400">
                {{ errInLogoUpload }}
              </p>
              <p v-if="successLogoUpload" class="text-green-300">
                {{ successLogoUpload }}
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-800 ml-3">
            About Company
          </h2>
        </div>
        <template v-if="!isEditing">
          <div v-if="companyInfo?.company_description">
            <p class="text-gray-600 whitespace-pre-line pl-11">
              {{ companyInfo?.company_description }}
            </p>
          </div>
          <div v-else>
            <p class="text-gray-600 whitespace-pre-line pl-11">
              Tell job seekers about your company, culture, and values.
            </p>
          </div>
        </template>
        <template v-else>
          <textarea
            @focus="enableButtonAgain"
            class="w-full p-2 border"
            rows="4"
            v-model.trim="companyInfo.company_description"
            placeholder="About your company"
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
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-800 ml-3">
            Company Information
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
                {{ store?.profileInfo?.email }}
              </p>
            </div>
            <div class="mt-3">
              <label class="block text-sm font-medium text-gray-500 mb-1"
                >Website</label
              >
              <template v-if="!isEditing">
                <div v-if="companyInfo?.website_url" class="">
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
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    <a
                      :href="companyInfo?.website_url"
                      target="_blank"
                      class="text-indigo-600 hover:underline"
                      >{{ companyInfo?.website_url }}</a
                    >
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
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
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
                  v-model.trim="companyInfo.website_url"
                  type="url"
                  @focus="enableButtonAgain"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="https://yourcompany.com"
                />
              </template>
            </div>
            <div class="mt-3">
              <label class="block text-sm font-medium text-gray-500 mb-1"
                >Industry</label
              >
              <template v-if="!isEditing">
                <div v-if="companyInfo?.industry" class="">
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
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <p class="text-gray-700">
                      {{ companyInfo?.industry }}
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
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
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
                  v-model.trim="companyInfo.industry"
                  type="text"
                  @focus="enableButtonAgain"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="E.g. Information Technology"
                />
              </template>
            </div>
            <div class="mt-3">
              <label class="block text-sm font-medium text-gray-500 mb-1"
                >Company Size</label
              >
              <template v-if="!isEditing">
                <div v-if="companyInfo?.company_size" class="">
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <p class="text-gray-700">
                      {{ companyInfo?.company_size }}
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <p class="text-gray-700">
                      {{ "Not specified" }}
                    </p>
                  </div>
                </div>
              </template>
              <template v-else>
                <select
                  v-model="companyInfo.company_size"
                  @focus="enableButtonAgain"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                >
                  <option value="">Select company size</option>
                  <option value="1-10 employees">1-10 employees</option>
                  <option value="11-50 employees">11-50 employees</option>
                  <option value="51-200 employees">51-200 employees</option>
                  <option value="201-500 employees">201-500 employees</option>
                  <option value="501-1000 employees">501-1000 employees</option>
                  <option value="1001+ employees">1001+ employees</option>
                </select>
              </template>
            </div>
            <div class="mt-3">
              <label class="block text-sm font-medium text-gray-500 mb-1"
                >Founded Year</label
              >
              <template v-if="!isEditing">
                <div v-if="companyInfo?.founded_year" class="">
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p class="text-gray-700">
                      {{ companyInfo?.founded_year }}
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
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
                  v-model.trim="companyInfo.founded_year"
                  type="number"
                  min="1900"
                  :max="new Date().getFullYear()"
                  @focus="enableButtonAgain"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="E.g. 2010"
                />
              </template>
            </div>
            <div class="mt-3">
              <label class="block text-sm font-medium text-gray-500 mb-1"
                >Headquarters Location</label
              >
              <template v-if="!isEditing">
                <div v-if="companyInfo?.headquarters_location" class="">
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
                      {{ companyInfo.headquarters_location }}
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
                  v-model.trim="companyInfo.headquarters_location"
                  type="text"
                  @focus="enableButtonAgain"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="E.g. San Francisco, CA"
                />
              </template>
            </div>
            <p
              class="text-red-500 animate-pulse text-sm mt-2 font-medium capitalize"
              v-if="errorMessage"
            >
              {{ errorMessage }}
            </p>
            <p
              v-if="responseMessage"
              class="text-green-500 animate-pulse text-sm mt-2 font-medium capitalize"
            >
              {{ responseMessage }}
            </p>
          </div>
        </div>
      </div>

      <!-- <div class="bg bg-gray-50 rounded-md border border-gray-100">
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
                    linkedin.com/company/
                  </span>
                  <input
                    v-model.trim="companyInfo.linkedin_url"
                    type="text"
                    @focus="enableButtonAgain"
                    class="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="your-company"
                  />
                </div>
              </template>
              <template v-else>
                <div v-if="companyInfo.linkedin_url" class="flex items-center">
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
                      'https://linkedin.com/company/' + companyInfo.linkedin_url
                    "
                    target="_blank"
                    class="ml-2 text-indigo-600 hover:underline font-medium"
                    >linkedin.com/company/{{ companyInfo.linkedin_url }}</a
                  >
                </div>
                <div v-else class="text-gray-500 italic">Not provided</div>
              </template>
            </div>
          </div>
        </div>
      </div> -->

      <div v-if="isEditing" class="mt-10 flex justify-end space-x-4">
        <button
          @click="isEditing = !isEditing"
          class="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
        >
          Cancel Edit
        </button>
        <button
          :disabled="disableBtn"
          @click="postProfile"
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
import { computed, onMounted, ref } from "vue";
import { useEmployeeStore } from "../../store/useEmployeeStore";
import axios from "axios";

const store = useEmployeeStore();
const companyInfo = ref({});

const isEditing = ref(false);
const logoInput = ref(null);
const isSaving = ref(false);
const disableBtn = ref(false);
const errorMessage = ref("");
const responseMessage = ref("");
const errInLogoUpload = ref("");
const successLogoUpload = ref("");

const getCompanyInfo = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/employer/profile",
      {
        withCredentials: true,
      }
    );
    companyInfo.value = response.data.company || {};
  } catch (error) {
    console.error("Error fetching company info:", error);
  }
};

const validateInputs = () => {
  return {
    name: companyInfo.value.company_name || null,
    description: companyInfo.value.company_description || null,
    website_url: companyInfo.value.website_url || null,
    industry: companyInfo.value.industry || null,
    size: companyInfo.value.company_size || null,
    founded_year: companyInfo.value.founded_year || null,
    headquarters: companyInfo.value.headquarters_location || null,
  };
};

const handleLogoChange = (event) => {
  errInLogoUpload.value = "";
  const file = event.target.files[0];
  if (
    file &&
    (file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg")
  ) {
    logoInput.value = file;
  } else {
    errInLogoUpload.value = "Only PNG, JPG, or JPEG files are supported";
    logoInput.value = null;
  }
};

const submitLogo = async () => {
  successLogoUpload.value = "Uploading please wait...";
  if (!logoInput.value) return;

  const formData = new FormData();
  formData.append("logo", logoInput.value);

  try {
    const response = await axios.post(
      "http://localhost:3000/api/employer/profile/logo",
      formData,
      { withCredentials: true }
    );
    successLogoUpload.value = response.data.msg;
    errInLogoUpload.value = "";
    getCompanyInfo();
    logoInput.value = null;
  } catch (err) {
    console.error(err);
    successLogoUpload.value = "";
    errInLogoUpload.value = err.response?.data?.err || "Error uploading logo";
  }
};

const enableButtonAgain = () => {
  disableBtn.value = false;
  errorMessage.value = "";
  responseMessage.value = "";
};

const submitDetails = async () => {
  isSaving.value = true;
  const validInputs = validateInputs();

  try {
    const response = await axios.put(
      "http://localhost:3000/api/employer/profile",
      validInputs,
      { withCredentials: true }
    );

    responseMessage.value = response.data.msg || "Profile updated successfully";
    errorMessage.value = "";
    disableBtn.value = true;
    isEditing.value = false;
    getCompanyInfo();
  } catch (error) {
    errorMessage.value = error.response?.data?.err || "Something went wrong";
    responseMessage.value = "";
    disableBtn.value = true;
  } finally {
    isSaving.value = false;
  }
};

const postProfile = async () => {
  const inputs = validateInputs();

  if (inputs.name === null) {
    disableBtn.value = true;
    errorMessage.value = "Company Name is required...";
    return;
  }
  disableBtn.value = true;
  errorMessage.value = "";
  try {
    const response = await store.insertEmployeeProfile(inputs);
    responseMessage.value = response.msg;
  } catch (error) {
    console.log(error);
  } finally {
    await store.fetchEmployeeProfile();
  }
};

onMounted(async () => {
  await store.fetchEmployeeProfile();
  companyInfo.value = store?.profileInfo;
  console.log(store?.profileInfo);
});
</script>