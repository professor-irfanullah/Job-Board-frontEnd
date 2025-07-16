<template>
  <section
    class="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6"
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
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-800 ml-2">Skills</h2>
      </div>
      <button
        v-if="props.isEditing"
        class="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
        aria-label="Edit"
        @click="editSkills = !editSkills"
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

    <main v-if="props.isEditing" class="skills">
      <form @submit.prevent="saveSkills" v-if="editSkills">
        <transition-group name="list">
          <div class="mt-4 space-y-4" v-for="(skill, idx) in skills" :key="idx">
            <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div class="grid grid-cols-1 gap-4 w600:grid-cols-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Skill Name</label
                  >
                  <input
                    v-model.trim="skill.skill_name"
                    required
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Years"
                  />
                </div>
              </div>
              <div class="flex justify-end pt-3">
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
        </transition-group>

        <div class="flex flex-wrap gap-3 pt-4">
          <button
            type="button"
            @click="
              skills.push({
                skill_name: '',
                proficiency_level: '',
                years_of_experience: 1,
              })
            "
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
            Add Skill
          </button>

          <button
            :disabled="isNoSkills === 0"
            type="submit"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            Save Changes
          </button>

          <button
            type="button"
            @click="editSkills = !editSkills"
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
        <div v-if="skills.length > 0" class="space-y-3">
          <div
            v-for="(skill, index) in skills"
            :key="index"
            class="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div class="font-medium text-gray-900">
                {{ skill.skill_name }}
              </div>
              <div class="flex items-center space-x-4 mt-2 sm:mt-0">
                <span class="text-sm text-gray-600"
                  >{{ skill.years_of_experience }} years</span
                >
                <div class="flex items-center">
                  <div
                    class="h-2 rounded-full bg-gray-200"
                    :class="{
                      'w-16': skill.proficiency_level === 'beginner',
                      'w-24': skill.proficiency_level === 'intermediate',
                      'w-32': skill.proficiency_level === 'expert',
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
                  <span
                    class="ml-2 text-xs font-medium text-gray-500 uppercase"
                    >{{ skill.proficiency_level }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-6">
          <p class="text-gray-500">No skills added yet</p>
        </div>
      </div>
    </main>

    <main v-else class="skills">
      <div v-if="skills.length > 0" class="space-y-3">
        <div
          v-for="(skill, index) in skills"
          :key="index"
          class="p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="font-medium text-gray-900">{{ skill.skill_name }}</div>
            <div class="flex items-center space-x-4 mt-2 sm:mt-0">
              <span class="text-sm text-gray-600"
                >{{ skill.years_of_experience }} years</span
              >
              <div class="flex items-center">
                <div
                  class="h-2 rounded-full bg-gray-200"
                  :class="{
                    'w-16': skill.proficiency_level === 'beginner',
                    'w-24': skill.proficiency_level === 'intermediate',
                    'w-32': skill.proficiency_level === 'expert',
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
                <span
                  class="ml-2 text-xs font-medium text-gray-500 uppercase"
                  >{{ skill.proficiency_level }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-6">
        <p class="text-gray-500">No skills information available</p>
      </div>
    </main>
  </section>
</template><script setup>
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
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
const router = useRouter();
const isNoSkills = computed(() => {
  return skills.value.length;
});

const removeSkill = async (index, arrIdx) => {
  try {
    if (index) {
      const response = await axios.get(removeSkillUrl + index, {
        withCredentials: true,
      });
      errMsg.value = "";
      responseMsg.value = response.data.msg;
      skills.value.splice(index, 1);
      await loadSkills();
      return;
    } else {
      skills.value.splice(arrIdx, 1);
    }
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
    if ((error.status = 403)) {
      console.error(error);
      return router.push("/home");
    }
  }
};
onMounted(() => loadSkills());
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