<template>
  <main class="bg-gray-50 min-h-screen p-4">
    <div class="max-w-7xl mx-auto">
      <!-- Back Button -->
      <div class="mb-6">
        <button
          type="button"
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
          Back to Applicants
        </button>
      </div>

      <!-- Applicant Header -->
      <div class="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div class="flex flex-col md:flex-row md:items-center gap-6">
          <!-- Applicant photo_url -->
          <div class="flex-shrink-0">
            <div
              class="h-20 w-20 rounded-full overflow-hidden border-2 border-white shadow-md"
            >
              <img
                v-if="props.applicant.photo_url"
                :src="props.applicant.photo_url"
                :alt="props.applicant.name"
                class="h-full w-full object-cover"
              />
              <div
                v-else
                class="h-full w-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold"
              >
                {{ applicant.name.charAt(0).toUpperCase() }}
              </div>
            </div>
          </div>

          <!-- Applicant Info -->
          <div class="flex-1">
            <div
              class="flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h1 class="text-2xl font-bold text-gray-900">
                  {{ applicant.name }}
                </h1>
                <p class="text-gray-600">{{ applicant.email }}</p>
                <div class="mt-2 flex flex-wrap gap-2">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {{ applicant.experience || "0" }} years experience
                  </span>
                  <span
                    v-if="applicant.phone"
                    class="inline-flex items-center text-sm text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {{ applicant.phone }}
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center text-sm text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Not Provided
                  </span>
                </div>
              </div>
              <div class="mt-4 md:mt-0">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize"
                  :class="statusClass(applicant.application_status)"
                >
                  {{ formatStatus(applicant.application_status.toLowerCase()) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Application Details -->
          <div class="bg-white p-6 rounded-xl shadow-sm">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">
              Application Details
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 class="text-sm font-medium text-gray-500">Applied For</h3>
                <p class="mt-1 text-sm text-gray-900 font-medium">
                  {{ applicant.title }}
                </p>
              </div>

              <div>
                <h3 class="text-sm font-medium text-gray-500">Applied On</h3>
                <p class="mt-1 text-sm text-gray-900">
                  {{
                    new Date(applicant.applied_at).toISOString().split("T")[0]
                  }}
                </p>
              </div>

              <div>
                <h3 class="text-sm font-medium text-gray-500">Resume</h3>
                <a
                  v-if="applicant.resume_url"
                  :href="applicant.resume_url"
                  target="_blank"
                  class="mt-1 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-1"
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
                  View Resume
                </a>
                <a class="mt-1 flex items-center text-sm" v-else>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-1"
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
                  Not Provided
                </a>
              </div>

              <div>
                <h3 class="text-sm font-medium text-gray-500">Cover Letter</h3>
                <p class="mt-1 text-sm text-gray-900">
                  {{ applicant.cover_letter }}
                </p>
              </div>
            </div>
          </div>

          <!-- About -->
          <div class="bg-white p-6 rounded-xl shadow-sm" v-if="applicant.bio">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">About</h2>
            <p class="text-gray-700 whitespace-pre-line">
              {{ applicant.bio }}
            </p>
          </div>

          <!-- Skills Section -->
          <div
            class="bg-white p-6 rounded-xl shadow-sm"
            v-if="applicant.skills?.length"
          >
            <h2 class="text-lg font-semibold text-gray-800 mb-6">
              Skills & Expertise
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="(skill, index) in applicant.skills"
                :key="index"
                class="bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <!-- Skill Header -->
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-md font-semibold text-gray-900">
                    {{ skill.skill_name }}
                  </h3>
                  <span
                    class="text-xs font-medium px-2 py-1 rounded-full bg-indigo-100 text-indigo-800"
                  >
                    {{ skill.years_of_experiences }}
                    {{ skill.years_of_experiences === 1 ? "year" : "years" }}
                  </span>
                </div>

                <!-- Proficiency Level -->
                <div class="mb-3">
                  <div
                    class="flex items-center justify-between text-xs text-gray-600 mb-1"
                  >
                    <span>Proficiency</span>
                    <span class="font-medium">{{
                      skill.proficiency_level
                    }}</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-600 transition-all duration-300"
                      :style="{
                        width: getProficiencyWidth(skill.proficiency_level),
                      }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Summary (if multiple skills) -->
            <div
              v-if="applicant.skills.length > 3"
              class="mt-6 pt-4 border-t border-gray-100"
            >
              <div
                class="flex items-center justify-between text-sm text-gray-600"
              >
                <span>Total skills: {{ applicant.skills.length }}</span>
                <span class="font-medium">
                  {{ totalYears }} total years of experience
                </span>
              </div>
            </div>
          </div>

          <!-- Education -->
          <div
            class="bg-white p-6 rounded-xl shadow-sm"
            v-if="applicant.education?.length"
          >
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Education</h2>
            <div class="space-y-4">
              <div
                v-for="(edu, index) in applicant.education"
                :key="index"
                class="border-l-2 border-indigo-200 pl-4"
              >
                <h3 class="text-md font-medium text-gray-900">
                  {{ edu.degree }}
                </h3>
                <p class="text-sm text-gray-600">{{ edu.institution }}</p>
                <p class="text-xs text-gray-500">
                  {{ formatDate(edu.start_date) }} -
                  {{ edu.end_date ? formatDate(edu.end_date) : "Present" }}
                </p>
                <p v-if="edu.field_of_study" class="text-sm text-gray-700">
                  {{ edu.field_of_study }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Status Update -->
          <div class="bg-white p-6 rounded-xl shadow-sm">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">
              Update Status
            </h2>
            <select
              v-model="applicant.application_status"
              @change="updateStatus"
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              :class="statusClass(applicant.application_status)"
            >
              <option value="IN_PROGRESS" class="bg-blue-100 text-blue-800">
                New
              </option>
              <option value="reviewed" class="bg-purple-100 text-purple-800">
                Reviewed
              </option>
              <option value="interview" class="bg-yellow-100 text-yellow-800">
                Interview
              </option>
              <option value="hired" class="bg-green-100 text-green-800">
                Hired
              </option>
              <option value="REJECTED" class="bg-red-100 text-red-800">
                Rejected
              </option>
            </select>

            <div class="mt-4" v-if="applicant.status === 'interview'">
              <label
                for="interviewDate"
                class="block text-sm font-medium text-gray-700"
                >Interview Date</label
              >
              <input
                type="datetime-local"
                id="interviewDate"
                v-model="interviewDate"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                @click="scheduleInterview"
                class="mt-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
              >
                Schedule Interview
              </button>
            </div>
          </div>

          <!-- Actions -->
          <div class="bg-white p-6 rounded-xl shadow-sm">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Actions</h2>
            <div class="space-y-2">
              <button
                @click="downloadApplication"
                class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Application
              </button>
              <button
                @click="emailApplicant"
                class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email Applicant
              </button>
              <button
                @click="confirmDelete"
                class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 text-red-600 hover:bg-red-50"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  class="h-6 w-6 text-red-600"
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
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Delete application
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to delete this application? This
                    action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="deleteApplicant"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Delete
            </button>
            <button
              @click="showDeleteModal = false"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  applicant: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["close"]);

const closeModal = () => emits("close");
// const applicant = ref({
//   id: 1,
//   job_id: 1,
//   name: "Alex Johnson",
//   email: "alex.johnson@example.com",
//   phone: "(555) 123-4567",
//   photo_url: "https://randomuser.me/api/portraits/men/32.jpg",
//   about:
//     "Experienced frontend developer with 5+ years of experience building responsive web applications using Vue.js and React. Passionate about creating intuitive user interfaces and optimizing performance.",
//   experience: 5,
//   applied_at: "2023-06-15T10:30:00Z",
//   status: "reviewed",
//   resume_url: "#",
//   cover_letter:
//     "I'm excited to apply for the Senior Frontend Developer position at your company...",
//   experiences: [
//     {
//       position: "Frontend Developer",
//       company: "TechCorp Inc.",
//       start_date: "2020-01-15",
//       end_date: "2023-05-30",
//       description:
//         "Developed and maintained multiple Vue.js applications. Led the migration from Angular to Vue.js for the main product.",
//     },
//     {
//       position: "Junior Web Developer",
//       company: "Digital Solutions",
//       start_date: "2018-06-01",
//       end_date: "2019-12-20",
//       description:
//         "Built responsive websites using HTML, CSS, and JavaScript. Collaborated with designers to implement UI/UX improvements.",
//     },
//   ],
//   education: [
//     {
//       degree: "Bachelor of Science in Computer Science",
//       institution: "State University",
//       field_of_study: "Software Engineering",
//       start_date: "2014-09-01",
//       end_date: "2018-05-30",
//     },
//   ],
// });

const notes = ref("");
const interviewDate = ref("");
const showDeleteModal = ref(false);

// Sample jobs data - in a real app, this would come from your API or store
const jobs = [
  {
    job_id: 1,
    title: "Senior Frontend Developer",
    employment_type: "full-time",
    is_remote: true,
  },
];

const getJobTitle = (jobId) => {
  const job = jobs.find((j) => j.job_id === jobId);
  return job ? job.title : "Unknown Position";
};

const getJobType = (jobId) => {
  const job = jobs.find((j) => j.job_id === jobId);
  if (!job) return "";

  const types = {
    "full-time": "Full-time",
    "part-time": "Part-time",
    contract: "Contract",
    internship: "Internship",
  };

  const type = types[job.employment_type] || job.employment_type;
  return job.is_remote ? `${type} • Remote` : type;
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
const getProficiencyWidth = (level) => {
  const widths = {
    beginner: "25%",
    intermediate: "50%",
    advanced: "75%",
    expert: "100%",
  };
  return widths[level] || "50%";
};
const formatStatus = (status) => {
  const statuses = {
    new: "IN_PROGRESS",
    reviewed: "REJECTED",
    interview: "Interview",
    hired: "Hired",
    rejected: "REJECTED",
  };
  return statuses[status] || status;
};

const statusClass = (status) => {
  const classes = {
    IN_PROGRESS: "bg-blue-100 text-blue-800",
    reviewed: "bg-purple-100 text-purple-800",
    interview: "bg-yellow-100 text-yellow-800",
    hired: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return classes[status] || "bg-gray-100 text-gray-800";
};

const updateStatus = () => {
  // In a real app, you would make an API call here
  console.log(`Status updated to ${props.applicant.application_status}`);
};

const scheduleInterview = () => {
  // In a real app, you would make an API call here
  console.log(`Interview scheduled for ${interviewDate.value}`);
  alert(
    `Interview scheduled for ${new Date(interviewDate.value).toLocaleString()}`
  );
};

const downloadApplication = () => {
  // In a real app, this would generate/download a PDF
  console.log("Downloading application");
  alert("Application download started");
};

const emailApplicant = () => {
  // In a real app, this would open an email composer
  console.log("Emailing applicant");
  window.open(`mailto:${props?.applicant.email}`, "_blank");
};

const confirmDelete = () => {
  showDeleteModal.value = true;
};

const deleteApplicant = () => {
  // In a real app, you would make an API call here
  console.log("Applicant deleted");
  showDeleteModal.value = false;
  router.push("/employer/applicants");
};

// In a real app, you would fetch the applicant data based on route params
onMounted(() => {
  // const applicantId = route.params.id;
  // fetchApplicant(applicantId);
  console.log(props.applicant);
});
</script>