<template >
  <section class="mt-4 bg-gray-50 rounded-lg shadow-md p-6 mb-6">
    <header class="flex justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-800">Skills</h2>
      <button
        v-if="props.isEditing"
        class="flex justify-center items-center cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
        aria-label="Edit"
        @click="editSkills = !editSkills"
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
    <main v-if="props.isEditing" class="skills">
      <form @submit.prevent="saveSkills" class="btn" v-if="editSkills">
        <div
          class="mt-2 space-y-2 p-4 border-gray-200 rounded-lg"
          v-for="(skill, idx) in skills"
          :key="idx"
        >
          <div classs="grid grid-cols-1 w600:grid-cols-3 ">
            <div class="btn flex flex-wrap items-center justify-between gap-2">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Skill Name</label
                >
                <input
                  v-model.trim="skill.skill_name"
                  required
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Vue.js"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Proficiency</label
                >
                <select
                  v-model.trim="skill.proficiency_level"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option disabled value="">Select Proficiency</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Years of Experience</label
                >
                <input
                  v-model.number="skill.years_of_experience"
                  type="number"
                  required
                  min="0"
                  max="50"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Years"
                />
              </div>
              <div class="flex justify-end">
                <button
                  type="button"
                  @click="removeSkill(skill.skill_id, idx)"
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
            @click="
              skills.push({
                skill_name: name,
                proficiency_level: '',
                years_of_experience: 1,
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
            Add Skill
          </button>

          <button
            :disabled="isNoSkills === 0"
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-500 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>

          <button
            @click="editSkills = !editSkills"
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
        <div class="" v-if="skills.length > 0">
          <div
            v-for="(skill, index) in skills"
            :key="index"
            class="flex flex-col w400:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div class="font-medium text-gray-800">{{ skill.skill_name }}</div>
            <div class="flex items-center space-x-4 mt-1 sm:mt-0">
              <span class="text-sm text-gray-600"
                >{{ skill.years_of_experience }} years</span
              >
              <div class="flex items-center">
                <div
                  class="h-2 rounded-full bg-gray-200"
                  :class="{
                    'w-16': skill.proficiency_level === 'beginner',
                    'w-24': skill.proficiency_level === 'intermediate',
                    'w-40': skill.proficiency_level === 'expert',
                  }"
                >
                  <div
                    class="h-2 rounded-full"
                    :class="{
                      'bg-red-400': skill.proficiency_level === 'beginner',
                      'bg-yellow-400':
                        skill.proficiency_level === 'intermediate',
                      'bg-green-400': skill.proficiency_level === 'expert',
                    }"
                  ></div>
                </div>
                <span class="ml-2 text-xs text-gray-500">{{
                  skill.proficiency_level
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="" v-else>
          <p class="text-gray-800 italic">Add your skills</p>
        </div>
      </div>
    </main>
    <main v-else class="skills">
      <div class="" v-if="skills.length > 0">
        <div
          v-for="(skill, index) in skills"
          :key="index"
          class="flex border-black flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div class="font-medium text-gray-800">{{ skill.skill_name }}</div>
          <div class="flex items-center space-x-4 mt-1 sm:mt-0">
            <span class="text-sm text-gray-600"
              >{{ skill.years_of_experience }} years</span
            >
            <div class="flex items-center">
              <div
                class="h-2 rounded-full bg-gray-200"
                :class="{
                  'w-16': skill.proficiency_level === 'beginner',
                  'w-24': skill.proficiency_level === 'intermediate',
                  'w-40': skill.proficiency_level === 'expert',
                }"
              >
                <div
                  class="h-2 rounded-full"
                  :class="{
                    'bg-red-400': skill.proficiency_level === 'beginner',
                    'bg-yellow-400': skill.proficiency_level === 'intermediate',
                    'bg-green-400': skill.proficiency_level === 'expert',
                  }"
                ></div>
              </div>
              <span class="ml-2 text-xs text-gray-500">{{
                skill.proficiency_level.toLocaleUpperCase()
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="" v-else>
        <p class="text-gray-800 italic">Tell us about your skills</p>
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
const editSkills = ref(false);
const url = "http://localhost:3000/api/seeker/get/skill/record";
const removeSkillUrl = `http://localhost:3000/api/seeker/delete/skill/record?skill_id=`;
const addSkillUrl = `http://localhost:3000/api/seeker/insert/skill/record`;
const skills = ref([
  // {
  //   skill_id: 1,
  //   skill_name: "Vue.js",
  //   proficiency_level: "intermediate",
  //   years_of_experience: 2,
  // },
  // {
  //   skill_id: 2,
  //   skill_name: "Tailwind CSS",
  //   proficiency_level: "expert",
  //   years_of_experience: 3,
  // },
  // {
  //   skill_id: 3,
  //   skill_name: "UI/UX Design",
  //   proficiency_level: "beginner",
  //   years_of_experience: 1,
  // },
]);
const errMsg = ref("");
const responseMsg = ref("");
const isNoSkills = computed(() => {
  return skills.value.length;
});

const removeSkill = async (index, arrIdx) => {
  try {
    const response = await axios.get(removeSkillUrl + index, {
      withCredentials: true,
    });
    errMsg.value = "";
    responseMsg.value = response.data.msg;
    skills.value.splice(arrIdx, 1);
  } catch (error) {
    console.error(error);
  } finally {
    responseMsg.value = "";
    errMsg.value = "";
  }
};
const saveSkills = async () => {
  responseMsg.value = "please wait..";
  for (const item of skills.value) {
    try {
      const response = await axios.post(
        addSkillUrl,
        {
          skill_name: item.skill_name,
          proficiency_level: item.proficiency_level,
          years_of_experience: item.years_of_experience,
        },
        { withCredentials: true }
      );
      errMsg.value = "";
      responseMsg.value = response.data.msg;
      editSkills.value = false;
    } catch (error) {
      console.error(error);
      errMsg.value = error.response.data.err || "something went wrong";
    } finally {
      errMsg.value = "";
      responseMsg.value = "";
      await loadSkills();
    }
  }
};
const loadSkills = async () => {
  try {
    const response = await axios.get(url, { withCredentials: true });
    skills.value = response.data.data;
  } catch (error) {
    skills.value = [];
    console.error(error);
  }
};
onMounted(() => loadSkills());
</script>