<template>
  <main class="bg-gray-50 min-h-screen p-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header with Verification Status -->
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
      >
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
              Company Profile
            </h1>
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
          </div>
          <p class="text-gray-600 mt-1">
            Manage your company details and team members
          </p>

          <!-- Verification Message -->
          <div
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
                <span v-if="userRole === 'HR'"
                  >You can still add employees, but they won't be able to access
                  all features until verification is complete.</span
                >
              </span>
            </div>
          </div>
        </div>

        <button
          v-if="userRole === 'HR'"
          @click="showAddEmployeeModal = true"
          class="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition flex items-center"
          :disabled="!company.is_verified && employees.length > 0"
          :class="{
            'opacity-50 cursor-not-allowed':
              !company.is_verified && employees.length > 0,
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

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Company Details -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Company Information Card -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-800">
                Company Information
              </h2>

              <!-- Verification Badge for Super Admin -->
              <div
                v-if="userRole === 'super_admin'"
                class="flex items-center space-x-2"
              >
                <button
                  v-if="!company.is_verified"
                  @click="verifyCompany"
                  class="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
                >
                  Verify Company
                </button>
                <button
                  v-if="company.is_verified"
                  @click="unverifyCompany"
                  class="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition"
                >
                  Revoke Verification
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <p class="text-gray-900">{{ company.size }} employees</p>
              </div>

              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-2">Founded</h3>
                <p class="text-gray-900">{{ company.founded }}</p>
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
                <p class="text-gray-900 leading-relaxed">{{ company.about }}</p>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-gray-100">
              <button
                @click="showEditCompanyModal = true"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition"
                :disabled="!company.is_verified && userRole !== 'super_admin'"
                :class="{
                  'opacity-50 cursor-not-allowed':
                    !company.is_verified && userRole !== 'super_admin',
                }"
              >
                Edit Company Info
              </button>
            </div>
          </div>

          <!-- Verification History (Super Admin Only) -->
          <div
            v-if="userRole === 'super_admin'"
            class="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 class="text-xl font-semibold text-gray-800 mb-4">
              Verification History
            </h2>

            <div v-if="verificationHistory.length > 0" class="space-y-3">
              <div
                v-for="(history, index) in verificationHistory"
                :key="index"
                class="border-l-4 pl-4 py-2"
                :class="
                  history.status === 'verified'
                    ? 'border-green-400 bg-green-50'
                    : 'border-red-400 bg-red-50'
                "
              >
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium">
                    {{
                      history.status === "verified"
                        ? "Verified"
                        : "Verification Revoked"
                    }}
                  </span>
                  <span class="text-xs text-gray-500">{{
                    formatDate(history.timestamp)
                  }}</span>
                </div>
                <p class="text-xs text-gray-600 mt-1">
                  By: {{ history.action_by }}
                </p>
                <p v-if="history.notes" class="text-xs text-gray-600 mt-1">
                  Notes: {{ history.notes }}
                </p>
              </div>
            </div>

            <div v-else class="text-center py-4 text-gray-500">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p class="mt-2 text-sm">No verification history available</p>
            </div>
          </div>

          <!-- Company Stats Card -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-6">
              Company Statistics
            </h2>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center p-4 bg-blue-50 rounded-lg">
                <div class="text-2xl font-bold text-blue-600">
                  {{ employees.length }}
                </div>
                <div class="text-sm text-gray-600">Total Employees</div>
              </div>

              <div class="text-center p-4 bg-green-50 rounded-lg">
                <div class="text-2xl font-bold text-green-600">
                  {{ departments.length }}
                </div>
                <div class="text-sm text-gray-600">Departments</div>
              </div>

              <div class="text-center p-4 bg-purple-50 rounded-lg">
                <div class="text-2xl font-bold text-purple-600">
                  {{ openPositions }}
                </div>
                <div class="text-sm text-gray-600">Open Positions</div>
              </div>

              <div class="text-center p-4 bg-orange-50 rounded-lg">
                <div class="text-2xl font-bold text-orange-600">
                  {{ newHiresThisYear }}
                </div>
                <div class="text-sm text-gray-600">New Hires (YTD)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Quick Actions -->
        <div class="space-y-6">
          <!-- Company Logo Card -->
          <div class="bg-white rounded-xl shadow-sm p-6 text-center">
            <div
              class="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center relative"
            >
              <span class="text-4xl font-bold text-indigo-600">{{
                company.name.charAt(0)
              }}</span>

              <!-- Verification Badge -->
              <div
                v-if="company.is_verified"
                class="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
              >
                <svg
                  class="h-4 w-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h3 class="text-lg font-semibold text-gray-800">
              {{ company.name }}
            </h3>
            <p class="text-gray-600 text-sm">{{ company.industry }}</p>

            <div class="mt-3">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="
                  company.is_verified
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                "
              >
                {{ company.is_verified ? "Verified" : "Pending Verification" }}
              </span>
            </div>
          </div>

          <!-- Quick Actions Card -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">
              Quick Actions
            </h3>

            <div class="space-y-2">
              <button
                @click="showAddEmployeeModal = true"
                class="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition"
                :disabled="!company.is_verified && employees.length > 0"
                :class="{
                  'opacity-50 cursor-not-allowed':
                    !company.is_verified && employees.length > 0,
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-green-600"
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

              <button
                @click="exportEmployeeData"
                class="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition"
                :disabled="!company.is_verified"
                :class="{
                  'opacity-50 cursor-not-allowed': !company.is_verified,
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Export Employee Data
              </button>

              <button
                @click="viewCompanyDocuments"
                class="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition"
                :disabled="!company.is_verified"
                :class="{
                  'opacity-50 cursor-not-allowed': !company.is_verified,
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-purple-600"
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
                Company Documents
              </button>

              <!-- Super Admin Actions -->
              <div
                v-if="userRole === 'super_admin'"
                class="pt-2 border-t border-gray-100 mt-2"
              >
                <button
                  @click="showVerificationNotesModal = true"
                  class="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-yellow-600"
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
                  Add Verification Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Employees Section -->
      <div class="mt-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-800">Team Members</h2>

          <div class="flex items-center space-x-4">
            <div class="relative">
              <input
                v-model="employeeSearch"
                type="text"
                placeholder="Search employees..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                :disabled="!company.is_verified"
                :class="{
                  'opacity-50 cursor-not-allowed': !company.is_verified,
                }"
              />
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
            </div>

            <select
              v-model="departmentFilter"
              class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              :disabled="!company.is_verified"
              :class="{ 'opacity-50 cursor-not-allowed': !company.is_verified }"
            >
              <option value="">All Departments</option>
              <option v-for="dept in departments" :key="dept" :value="dept">
                {{ dept }}
              </option>
            </select>
          </div>
        </div>

        <!-- Verification Alert for Employees -->
        <div
          v-if="!company.is_verified && employees.length > 0"
          class="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6"
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
              Employees added before verification will have limited access until
              the company is verified by the super admin.
            </span>
          </div>
        </div>

        <!-- Employees Grid -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <div
            v-for="employee in filteredEmployees"
            :key="employee.id"
            class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div class="text-center">
              <div
                class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center"
              >
                <span class="text-xl font-bold text-indigo-600">{{
                  employee.name.charAt(0)
                }}</span>
              </div>

              <h3 class="text-lg font-semibold text-gray-800">
                {{ employee.name }}
              </h3>
              <p class="text-sm text-gray-600">{{ employee.position }}</p>
              <p class="text-xs text-gray-500">{{ employee.department }}</p>

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
                  :disabled="!company.is_verified"
                  :class="{
                    'opacity-50 cursor-not-allowed': !company.is_verified,
                  }"
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
                  v-if="userRole === 'HR'"
                  @click="editEmployee(employee)"
                  class="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition"
                  title="Edit"
                  :disabled="!company.is_verified"
                  :class="{
                    'opacity-50 cursor-not-allowed': !company.is_verified,
                  }"
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
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredEmployees.length === 0"
          class="bg-white rounded-xl shadow-sm p-12 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mx-auto h-12 w-12 text-gray-400"
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
          <h3 class="mt-2 text-sm font-medium text-gray-900">
            No employees found
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      </div>
    </div>

    <!-- Add Employee Modal -->
    <div
      v-if="showAddEmployeeModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div
        class="relative top-20 mx-auto p-4 border w-full max-w-md shadow-lg rounded-md bg-white"
      >
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            Add New Employee
          </h3>

          <!-- Verification Warning -->
          <div
            v-if="!company.is_verified"
            class="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md"
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
                Company not verified. Employee will have limited access until
                verification is complete.
              </span>
            </div>
          </div>

          <form @submit.prevent="addNewEmployee">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Full Name *</label
                >
                <input
                  v-model="newEmployee.name"
                  type="text"
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Email *</label
                >
                <input
                  v-model="newEmployee.email"
                  type="email"
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700"
                    >Position *</label
                  >
                  <input
                    v-model="newEmployee.position"
                    type="text"
                    required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700"
                    >Department *</label
                  >
                  <select
                    v-model="newEmployee.department"
                    required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select Department</option>
                    <option
                      v-for="dept in departments"
                      :key="dept"
                      :value="dept"
                    >
                      {{ dept }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700"
                    >Role *</label
                  >
                  <select
                    v-model="newEmployee.role"
                    required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select Role</option>
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="HR">HR</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700"
                    >Status</label
                  >
                  <select
                    v-model="newEmployee.status"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Onboarding">Onboarding</option>
                    <option value="Leave">On Leave</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                @click="showAddEmployeeModal = false"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Verification Notes Modal (Super Admin) -->
    <div
      v-if="showVerificationNotesModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div
        class="relative top-20 mx-auto p-4 border w-full max-w-md shadow-lg rounded-md bg-white"
      >
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            Add Verification Notes
          </h3>

          <form @submit.prevent="addVerificationNotes">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Notes</label
                >
                <textarea
                  v-model="verificationNotes"
                  rows="4"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Add notes about the verification status..."
                ></textarea>
              </div>
            </div>

            <div class="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                @click="showVerificationNotesModal = false"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Save Notes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Company Modal -->
    <div
      v-if="showEditCompanyModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div
        class="relative top-20 mx-auto p-4 border w-full max-w-2xl shadow-lg rounded-md bg-white"
      >
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            Edit Company Information
          </h3>

          <form @submit.prevent="updateCompanyInfo">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Company Name *</label
                >
                <input
                  v-model="company.name"
                  type="text"
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Industry *</label
                >
                <input
                  v-model="company.industry"
                  type="text"
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Company Size</label
                >
                <input
                  v-model="company.size"
                  type="number"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Founded Year</label
                >
                <input
                  v-model="company.founded"
                  type="number"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700"
                  >Address</label
                >
                <textarea
                  v-model="company.address"
                  rows="2"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700"
                  >About</label
                >
                <textarea
                  v-model="company.about"
                  rows="4"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
            </div>

            <div class="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                @click="showEditCompanyModal = false"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// User role (would typically come from auth store)
const userRole = ref("HR"); // Can be 'HR', 'super_admin', 'Employee', 'Manager', etc.

// Company data with verification status
const company = ref({
  name: "TechCorp Innovations",
  industry: "Technology & Software Development",
  size: 150,
  founded: 2015,
  address: "123 Tech Street, San Francisco, CA 94103",
  about:
    "We are a leading technology company focused on creating innovative software solutions that transform businesses and improve lives. Our team of experts is dedicated to excellence and continuous innovation.",
  is_verified: false,
  verified_at: null,
});

// Verification history
const verificationHistory = ref([]);

// Employees data
const employees = ref([
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@techcorp.com",
    position: "Senior Developer",
    department: "Engineering",
    role: "Employee",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@techcorp.com",
    position: "HR Manager",
    department: "Human Resources",
    role: "HR",
    status: "Active",
  },
]);

// Departments
const departments = computed(() => {
  return [...new Set(employees.value.map((emp) => emp.department))];
});

// Search and filter
const employeeSearch = ref("");
const departmentFilter = ref("");

// Filtered employees
const filteredEmployees = computed(() => {
  return employees.value.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(employeeSearch.value.toLowerCase()) ||
      emp.email.toLowerCase().includes(employeeSearch.value.toLowerCase()) ||
      emp.position.toLowerCase().includes(employeeSearch.value.toLowerCase());
    const matchesDepartment =
      !departmentFilter.value || emp.department === departmentFilter.value;
    return matchesSearch && matchesDepartment;
  });
});

// Stats
const openPositions = ref(8);
const newHiresThisYear = ref(12);

// Modals
const showAddEmployeeModal = ref(false);
const showEditCompanyModal = ref(false);
const showVerificationNotesModal = ref(false);

// New employee form
const newEmployee = ref({
  name: "",
  email: "",
  position: "",
  department: "",
  role: "Employee",
  status: "Active",
});

// Verification notes
const verificationNotes = ref("");

// Computed properties
const verificationStatusClass = computed(() => {
  return company.value.is_verified
    ? "bg-green-100 text-green-800"
    : "bg-yellow-100 text-yellow-800";
});

// Functions
const addNewEmployee = () => {
  const newEmp = {
    id: employees.value.length + 1,
    ...newEmployee.value,
  };
  employees.value.push(newEmp);
  showAddEmployeeModal.value = false;
  resetNewEmployeeForm();
  alert("Employee added successfully!");
};

const resetNewEmployeeForm = () => {
  newEmployee.value = {
    name: "",
    email: "",
    position: "",
    department: "",
    role: "Employee",
    status: "Active",
  };
};

const updateCompanyInfo = () => {
  showEditCompanyModal.value = false;
  alert("Company information updated successfully!");
};

const verifyCompany = () => {
  company.value.is_verified = true;
  company.value.verified_at = new Date().toISOString();

  // Add to verification history
  verificationHistory.value.unshift({
    status: "verified",
    timestamp: new Date().toISOString(),
    action_by: "Super Admin",
    notes: "Company verified successfully",
  });

  alert("Company verified successfully!");
};

const unverifyCompany = () => {
  company.value.is_verified = false;
  company.value.verified_at = null;

  // Add to verification history
  verificationHistory.value.unshift({
    status: "unverified",
    timestamp: new Date().toISOString(),
    action_by: "Super Admin",
    notes: "Verification revoked",
  });

  alert("Company verification revoked!");
};

const addVerificationNotes = () => {
  if (verificationNotes.value.trim()) {
    verificationHistory.value.unshift({
      status: "note",
      timestamp: new Date().toISOString(),
      action_by: "Super Admin",
      notes: verificationNotes.value,
    });

    showVerificationNotesModal.value = false;
    verificationNotes.value = "";
    alert("Notes added successfully!");
  }
};

const viewEmployee = (employee) => {
  alert(`Viewing profile of ${employee.name}`);
};

const editEmployee = (employee) => {
  alert(`Editing ${employee.name}'s profile`);
};

const exportEmployeeData = () => {
  alert("Exporting employee data...");
};

const viewCompanyDocuments = () => {
  alert("Opening company documents...");
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Initialize
onMounted(() => {
  // In a real app, fetch company and employee data from API
});
</script>