<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <!-- Header with title and edit toggle -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-800">Skills</h2>
      <button
        v-if="isEditing"
        @click="startEditing"
        class="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
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
        Edit
      </button>
    </div>

    <!-- View Mode -->
    <div v-if="!isEditing" class="space-y-4">
      <div v-if="skills.length > 0" class="space-y-3">
        <div
          v-for="(skill, index) in skills"
          :key="index"
          class="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div class="font-medium text-gray-800">{{ skill.name }}</div>
          <div class="flex items-center space-x-4 mt-1 sm:mt-0">
            <span class="text-sm text-gray-600">{{ skill.years }} years</span>
            <div class="flex items-center">
              <div
                class="h-2 rounded-full bg-gray-200"
                :class="{
                  'w-16': skill.proficiency === 'Beginner',
                  'w-24': skill.proficiency === 'Intermediate',
                  'w-32': skill.proficiency === 'Advanced',
                  'w-40': skill.proficiency === 'Expert',
                }"
              >
                <div
                  class="h-2 rounded-full"
                  :class="{
                    'bg-red-400': skill.proficiency === 'Beginner',
                    'bg-yellow-400': skill.proficiency === 'Intermediate',
                    'bg-blue-400': skill.proficiency === 'Advanced',
                    'bg-green-400': skill.proficiency === 'Expert',
                  }"
                ></div>
              </div>
              <span class="ml-2 text-xs text-gray-500">{{
                skill.proficiency
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-gray-500 italic">No skills added yet</p>
    </div>

    <!-- Edit Mode -->
    <div v-if="isEditing" class="space-y-4">
      <div
        v-for="(skill, index) in editingSkills"
        :key="index"
        class="space-y-2 p-4 border border-gray-200 rounded-lg"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Skill Name</label
            >
            <input
              v-model="editingSkills[index].name"
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
              v-model="editingSkills[index].proficiency"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Years of Experience</label
            >
            <input
              v-model.number="editingSkills[index].years"
              type="number"
              min="0"
              max="50"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Years"
            />
          </div>
        </div>

        <div class="flex justify-end">
          <button
            @click="removeSkill(index)"
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

      <div class="flex flex-wrap gap-3 pt-2">
        <button
          @click="addNewSkill"
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
          @click="saveSkills"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>

        <button
          @click="cancelEditing"
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  skills: {
    type: Array,
    default: () => [
      { name: "Vue.js", proficiency: "Intermediate", years: 2 },
      { name: "Tailwind CSS", proficiency: "Advanced", years: 3 },
      { name: "UI/UX Design", proficiency: "Beginner", years: 1 },
    ],
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
});

const editingSkills = ref([]);

// Initialize editing skills when component mounts or props change
watch(
  () => props.skills,
  (newSkills) => {
    editingSkills.value = newSkills.map((skill) => ({ ...skill }));
  },
  { immediate: true }
);

const addNewSkill = () => {
  editingSkills.value.push({
    name: "",
    proficiency: "Beginner",
    years: 0,
  });
};

const removeSkill = (index) => {
  editingSkills.value.splice(index, 1);
};

// No emits needed since we're working with props directly
</script>