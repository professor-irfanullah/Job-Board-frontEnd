<template>
  <section>
    <div class="technologies-section mt-8 space-y-6">
      <!-- Header Section -->
      <div
        class="header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div class="heading">
          <h1 class="text-2xl font-bold text-gray-900">Technologies</h1>
          <p class="text-gray-600 text-sm mt-2">
            Manage your company's technology stack and expertise
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3">
          <div class="searchWithIcon relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-400 absolute left-3 top-3"
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
            <input
              v-model.trim="searchTerm"
              type="text"
              class="pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="Search technologies..."
            />
          </div>
          <button
            v-if="company.role === 'HR' && company.is_verified"
            @click="showAddTechModal = true"
            class="px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            :disabled="!company.is_verified"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
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
            Add Technology
          </button>
        </div>
      </div>

      <!-- Technologies Grid -->
      <transition name="fade-slide" mode="out-in">
        <div v-if="filteredTechnologies.length" class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-800">
              Current Stack
              <span class="text-sm font-normal text-gray-500 ml-2">
                ({{ filteredTechnologies.length }} technology{{
                  filteredTechnologies.length !== 1 ? "s" : ""
                }})
              </span>
            </h3>
          </div>
          <transition-group
            name="staggered-fade"
            tag="div"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <div
              v-for="(tech, index) in filteredTechnologies"
              :key="tech.tech_id"
              :data-index="index"
              class="bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-200 hover:shadow-md transition-all duration-300 group"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div
                    class="size-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm"
                  >
                    <span class="text-lg font-bold text-white">
                      {{ getTechInitial(tech.technology) }}
                    </span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <h3 class="text-base font-semibold text-gray-900 truncate">
                      {{ tech.technology }}
                    </h3>
                    <p class="text-xs text-gray-500 font-medium">TECHNOLOGY</p>
                  </div>
                </div>

                <!-- Remove Button -->
                <button
                  v-if="company.role === 'HR' && company.is_verified"
                  @click="removeTechnology(tech.tech_id)"
                  class="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Remove Technology"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </transition-group>
        </div>
      </transition>

      <!-- Empty State -->
      <transition name="fade-scale">
        <div
          v-if="filteredTechnologies.length === 0"
          class="bg-white rounded-2xl border border-gray-200 p-12 text-center"
        >
          <div class="max-w-md mx-auto">
            <div
              class="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border border-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              {{
                searchTerm ? "No technologies found" : "No technologies added"
              }}
            </h3>
            <p class="text-gray-600 leading-relaxed mb-8 text-sm">
              {{
                searchTerm
                  ? "No technologies match your search criteria. Try different keywords."
                  : "Start building your technology stack by adding your company's core technologies and frameworks."
              }}
            </p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                v-if="searchTerm"
                type="button"
                @click="searchTerm = ''"
                class="px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Clear Search
              </button>
              <button
                v-if="
                  company.role === 'HR' && company.is_verified && !searchTerm
                "
                @click="showAddTechModal = true"
                class="px-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add First Technology
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Add Technology Modal -->
    <section>
      <transition name="modal-fade">
        <no-technology
          v-if="showAddTechModal"
          class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          @click.self="showAddTechModal = false"
        >
          <div
            class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform transition-all duration-300"
          >
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-gray-900">
                Add New Technology
              </h3>
              <button
                @click="showAddTechModal = false"
                class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form @submit.prevent="addCustomTechnology">
              <div class="space-y-6">
                <div>
                  <label
                    for="techName"
                    class="block text-sm font-medium text-gray-700 mb-3"
                  >
                    Technology Name
                    <span class="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    id="techName"
                    v-model.trim="newTechName"
                    type="text"
                    class="w-full p-3.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter technology name (e.g., React, Node.js, Python)"
                    required
                    autofocus
                  />
                </div>

                <div class="flex space-x-3 pt-2">
                  <button
                    type="button"
                    @click="showAddTechModal = false"
                    class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    :disabled="!newTechName.trim()"
                    class="flex-1 px-4 py-3 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Add Technology
                  </button>
                </div>
              </div>
            </form>
          </div>
        </no-technology>
      </transition>
    </section>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import noTechnology from "../../components/noEmployees.vue";

const props = defineProps({
  company: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:technologies"]);

const searchTerm = ref("");
const showAddTechModal = ref(false);
const newTechName = ref("");

// Trending technologies data

// Computed properties
const filteredTechnologies = computed(() => {
  if (!searchTerm.value) {
    return props?.company?.technologies || [];
  }

  return (props?.company?.technologies || []).filter((tech) =>
    tech.technology.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

// Methods
const getTechInitial = (techName) => {
  return techName.charAt(0).toUpperCase();
};

const addCustomTechnology = () => {
  if (!newTechName.value.trim()) return;

  const newTech = {
    tech_id: Date.now(),
    technology: newTechName.value.trim(),
  };

  const updatedTechs = [...(props.company.technologies || []), newTech];
  emit("update:technologies", updatedTechs);

  // Reset and close modal
  newTechName.value = "";
  showAddTechModal.value = false;
};

const removeTechnology = (techId) => {
  if (!props.company.is_verified || props.company.role !== "HR") return;

  const updatedTechs = (props.company.technologies || []).filter(
    (tech) => tech.tech_id !== techId
  );
  emit("update:technologies", updatedTechs);
};
console.log(props.company);
</script>

<style scoped>
/* Enhanced transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* Staggered animation for grid items */
.staggered-fade-move {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.staggered-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.staggered-fade-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.95);
}

.staggered-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
}

.staggered-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Custom scrollbar for modal */
.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>