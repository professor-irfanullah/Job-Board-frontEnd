<template>
  <section
    class="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6"
  >
    <header class="flex justify-between items-center mb-4">
      <div class="flex items-center">
        <div class="bg-indigo-100 p-2 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-800 ml-2">Education</h2>
      </div>
      <button
        v-if="props.isEditing"
        class="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
        aria-label="Edit"
        @click="editEducation = !editEducation"
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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        <span>Edit</span>
      </button>
    </header>

    <main v-if="props.isEditing" class="education">
      <form @submit.prevent="saveEducation" v-if="editEducation">
        <transition-group name="list">
          <div
            class="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
            v-for="(edu, idx) in education"
            :key="idx"
          >
            <div class="grid grid-cols-1 gap-4 w600:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Institution</label
                >
                <input
                  v-model.trim="edu.institution"
                  required
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Harvard University"
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Bachelor of Science"
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Computer Science"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Start Date</label
                  >
                  <input
                    v-model="edu.start_date"
                    required
                    type="date"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >End Date</label
                  >
                  <input
                    v-model="edu.end_date"
                    type="date"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>
            <div class="flex justify-end pt-2">
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
        </transition-group>

        <div class="flex flex-wrap gap-3 pt-4">
          <button
            type="button"
            @click="addNewEducation"
            class="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors text-sm font-medium"
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
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            Save Changes
          </button>

          <button
            type="button"
            @click="editEducation = !editEducation"
            class="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md transition-colors text-sm font-medium"
          >
            Cancel
          </button>
        </div>

        <div class="mt-3">
          <p v-if="errMsg" class="text-red-500 text-sm">
            {{ errMsg }}
          </p>
          <p v-if="responseMsg" class="text-green-600 text-sm">
            {{ responseMsg }}
          </p>
        </div>
      </form>

      <div v-else>
        <div v-if="education.length > 0" class="space-y-3">
          <div
            v-for="(edu, index) in education"
            :key="index"
            class="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 class="font-medium text-gray-900">
                  {{ edu.degree }} in {{ edu.field_of_study }}
                </h3>
                <p class="text-sm text-gray-600 mt-1">
                  {{ edu.institution }}
                </p>
              </div>
              <div class="mt-2 sm:mt-0">
                <span class="text-sm text-gray-500">
                  {{ edu.start_date }} -
                  {{ edu.end_date ? edu.end_date : "Present" }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-6">
          <p class="text-gray-500">No education added yet</p>
        </div>
      </div>
    </main>

    <main v-else class="education">
      <div v-if="education.length > 0" class="space-y-3">
        <div
          v-for="(edu, index) in education"
          :key="index"
          class="p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 class="font-medium text-gray-900">
                {{ edu.degree }} in {{ edu.field_of_study }}
              </h3>
              <p class="text-sm text-gray-600 mt-1">{{ edu.institution }}</p>
            </div>
            <div class="mt-2 sm:mt-0">
              <span class="text-sm text-gray-500">
                {{ edu.start_date }} -
                {{ edu.end_date ? edu.end_date : "Present" }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-6">
        <p class="text-gray-500">No education information added</p>
      </div>
    </main>
  </section>
</template>

<script setup>
// Your existing script remains exactly the same
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import api from "../api/api";

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
const date = new Date();

const isNoEducation = computed(() => {
  return education.value.length;
});

const addNewEducation = () => {
  education.value.push({
    institution: "",
    degree: "",
    field_of_study: "",
    start_date: "",
    end_date: "",
  });
};

const removeEducation = async (id, arrIdx) => {
  try {
    if (id) {
      const response = await api.get(
        `/api/seeker/delete/education/record?education_id=${id}`,
        {
          withCredentials: true,
        }
      );
      errMsg.value = "";
      responseMsg.value = response.data.msg;
      education.value.splice(id, 1);
      await loadEducation();
      return;
    } else {
      education.value.splice(arrIdx, 1);
    }
  } catch (error) {
    console.error(error);
  } finally {
    responseMsg.value = "";
    errMsg.value = "";
  }
};

const saveEducation = async () => {
  responseMsg.value = "Saving changes...";

  for (const item of education.value) {
    try {
      const response = await api.post(
        "/api/seeker/insert/education/record",
        {
          institution: item.institution,
          degree: item.degree,
          field_of_study: item.field_of_study,
          start_date: item.start_date,
          end_date: item.end_date,
        },
        { withCredentials: true }
      );

      errMsg.value = "";
      responseMsg.value = response.data.msg;
    } catch (error) {
      errMsg.value = error.response.data.err || "Something went wrong";
    } finally {
      errMsg.value = "";
      responseMsg.value = "";
      await loadEducation();
    }
  }
};

const loadEducation = async () => {
  try {
    const response = await api.get("/api/seeker/get/education/record", {
      withCredentials: true,
    });
    const arr = response.data.data;
    education.value = arr.map((record) => ({
      education_id: record.education_id,
      institution: record.institution,
      degree: record.degree,
      field_of_study: record.field_of_study,
      start_date: date.toISOString(record.start_date).split("T")[0],
      end_date: date.toISOString(record.end_date).split("T")[0],
    }));
  } catch (error) {
    education.value = [];
    console.error(error);
  }
};

onMounted(() => loadEducation());
</script>
<style scoped>
/* List transition animations */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.list-leave_from,
.list_enter_to {
  transition: transform 0.4s ease;
}
</style>