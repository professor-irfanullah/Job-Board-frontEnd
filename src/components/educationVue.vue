<template>
  <section class="mt-4 bg-gray-50 rounded-lg shadow-md p-6 mb-6">
    <header class="flex justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-800">Education</h2>
      <button
        v-if="props.isEditing"
        class="flex justify-center items-center cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
        aria-label="Edit"
        @click="editEducation = !editEducation"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
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
        <h1>Edit</h1>
      </button>
    </header>
    <main v-if="props.isEditing" class="education">
      <form @submit.prevent="saveEducation" class="btn" v-if="editEducation">
        <div
          class="mt-2 space-y-2 p-4 border-gray-200 rounded-lg"
          v-for="(edu, idx) in mutatedEdu"
          :key="idx"
        >
          <div classs="grid grid-cols-1 w600:grid-cols-3 ">
            <div class="btn flex flex-wrap items-center justify-between gap-2">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Institution</label
                >
                <input
                  v-model.trim="edu.institution"
                  required
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Harvard University"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Degree</label
                >
                <input
                  v-model.trim="edu.degree"
                  required
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Bachelor of Science"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Field of Study</label
                >
                <input
                  v-model.trim="edu.field_of_study"
                  required
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Computer Science"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Start Date</label
                >
                <input
                  v-model="edu.start_date"
                  required
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >End Date (or expected)</label
                >
                <input
                  v-model="edu.end_date"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div class="flex justify-end">
                <button
                  type="button"
                  @click="removeEducation(edu.education_id, idx)"
                  class="flex items-center text-sm text-red-600 hover:text-red-800 transition-colors"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap gap-3 pt-2 mt-2">
          <button
            type="button"
            @click="
              education.push({
                institution: '',
                degree: '',
                field_of_study: '',
                start_date: '',
                end_date: '',
              })
            "
            class="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-1"
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
            Add Education
          </button>

          <button
            :disabled="isNoEducation === 0"
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-500 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>

          <button
            type="button"
            @click="editEducation = !editEducation"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
        <div class="msg mt-2">
          <p v-if="errMsg" class="text-red-400 animate-pulse">
            {{ errMsg }}
          </p>
          <p v-if="responseMsg" class="text-green-400 animate-pulse">
            {{ responseMsg }}
          </p>
        </div>
      </form>
      <div class="" v-else>
        <div class="" v-if="education.length > 0">
          <div
            v-for="(edu, index) in education"
            :key="index"
            class="flex flex-col w400:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <div class="font-medium text-gray-800">
                {{ edu.degree }} in {{ edu.field_of_study }}
              </div>
              <div class="text-sm text-gray-600">{{ edu.institution }}</div>
            </div>
            <div class="flex items-center space-x-4 mt-1 sm:mt-0">
              <span class="text-sm text-gray-600">
                {{ formatDate(edu.start_date) }} -
                {{
                  formatDate(edu.end_date)
                    ? formatDate(edu.end_date)
                    : "Present"
                }}
              </span>
            </div>
          </div>
        </div>
        <div class="" v-else>
          <p class="text-gray-800 italic">Add your education</p>
        </div>
      </div>
    </main>
    <main v-else class="education">
      <div class="" v-if="education.length > 0">
        <div
          v-for="(edu, index) in education"
          :key="index"
          class="flex border-black flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div>
            <div class="font-medium text-gray-800">
              {{ edu.degree }} in {{ edu.field_of_study }}
            </div>
            <div class="text-sm text-gray-600">{{ edu.institution }}</div>
          </div>
          <div class="flex items-center space-x-4 mt-1 sm:mt-0">
            <span class="text-sm text-gray-600">
              {{ formatDate(edu.start_date) }} -
              {{ edu.end_date ? formatDate(edu.end_date) : "Present" }}
            </span>
          </div>
        </div>
      </div>
      <div class="" v-else>
        <p class="text-gray-800 italic">Tell us about your education</p>
      </div>
    </main>
  </section>
</template>

<script setup>
import axios from "axios";
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  isEditing: {
    type: Boolean,
  },
});

const editEducation = ref(false);
const url = "http://localhost:3000/api/seeker/get/education/record";
const removeEducationUrl = `http://localhost:3000/api/seeker/delete/education/record?education_id=`;
const addEducationUrl = `http://localhost:3000/api/seeker/insert/education/record`;
const education = ref([]);
const errMsg = ref("");
const responseMsg = ref("");
const isNoEducation = computed(() => {
  return education.value.length;
});

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
  //   return date.toLocaleDateString();
};

const removeEducation = async (id, arrIdx) => {
  try {
    const response = await axios.get(removeEducationUrl + id, {
      withCredentials: true,
    });
    errMsg.value = "";
    responseMsg.value = response.data.msg;
    education.value.splice(arrIdx, 1);
  } catch (error) {
    console.error(error);
  } finally {
    responseMsg.value = "";
    errMsg.value = "";
  }
};

const saveEducation = async () => {
  responseMsg.value = "please wait..";

  for (const item of mutatedEdu.value) {
    try {
      const response = await axios.post(
        addEducationUrl,
        {
          institution: item.institution,
          degree: item.degree,
          field_of_study: item.field_of_study,
          start_date: formatDate(item.start_date),
          end_date: formatDate(item.end_date),
        },
        { withCredentials: true }
      );

      errMsg.value = "";
      responseMsg.value = response.data.msg;
    } catch (error) {
      errMsg.value = error.response.data.err || "something went wrong";
    } finally {
      errMsg.value = "";
      responseMsg.value = "";
      await loadEducation();
    }
  }
};

const mutatedEdu = ref(
  computed(() => {
    return education.value.map((edu) => ({
      ...edu,
      start_date: formatDate(edu.start_date),
      end_date: formatDate(edu.end_date),
    }));
  })
);

const loadEducation = async () => {
  try {
    const response = await axios.get(url, { withCredentials: true });
    education.value = response.data.data;
  } catch (error) {
    education.value = [];
    console.error(error);
  }
};

onMounted(() => loadEducation());
</script>