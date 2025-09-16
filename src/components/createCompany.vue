<template>
  <main @click.self="closeModal" class="bg-gray-50 min-h-screen">
    <div class="container mx-auto p-4 max-w-4xl">
      <!-- Back Button -->
      <div class="mb-4">
        <button
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
          Back to Companies
        </button>
      </div>

      <!-- Form Header -->
      <div class="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">
          {{
            isEditing ? "Edit Company Profile" : "Create New Company Profile"
          }}
        </h1>
        <p class="text-sm text-gray-600">
          Fill in the details below to
          {{ isEditing ? "update" : "create" }} your company profile
        </p>
      </div>

      <!-- Company Form -->
      <div class="bg-white p-6 rounded-xl shadow-sm space-y-6">
        <form @submit.prevent="submitForm">
          <!-- Company Name -->
          <div class="space-y-2">
            <label for="name" class="block text-sm font-medium text-gray-700">
              Company Name *
            </label>
            <input
              v-model.trim="form.name"
              type="text"
              id="name"
              required
              :class="[
                'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                errors.name ? 'border-red-300' : 'border-gray-300',
              ]"
              placeholder="e.g. TechCorp Innovations"
              @blur="validateField('name')"
            />
            <p v-if="errors.name" class="text-sm text-red-600">
              {{ errors.name }}
            </p>
          </div>

          <!-- Description -->
          <div class="space-y-2">
            <label
              for="description"
              class="block text-sm font-medium text-gray-700"
            >
              Description *
            </label>
            <textarea
              v-model.trim="form.description"
              id="description"
              rows="4"
              required
              :class="[
                'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                errors.description ? 'border-red-300' : 'border-gray-300',
              ]"
              placeholder="Describe your company, its mission, and values..."
              @blur="validateField('description')"
            ></textarea>
            <p v-if="errors.description" class="text-sm text-red-600">
              {{ errors.description }}
            </p>
          </div>

          <!-- Website URL -->
          <div class="space-y-2">
            <label
              for="website_url"
              class="block text-sm font-medium text-gray-700"
            >
              Website URL *
            </label>
            <input
              v-model.trim="form.website_url"
              type="url"
              id="website_url"
              required
              :class="[
                'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                errors.website_url ? 'border-red-300' : 'border-gray-300',
              ]"
              placeholder="https://yourcompany.com"
              @blur="validateField('website_url')"
            />
            <p v-if="errors.website_url" class="text-sm text-red-600">
              {{ errors.website_url }}
            </p>
          </div>

          <!-- Logo URL -->
          <div class="space-y-2">
            <label
              for="logo_url"
              class="block text-sm font-medium text-gray-700"
            >
              Logo URL *
            </label>
            <input
              v-model.trim="form.logo_url"
              type="url"
              id="logo_url"
              required
              :class="[
                'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                errors.logo_url ? 'border-red-300' : 'border-gray-300',
              ]"
              placeholder="https://yourcompany.com/logo.png"
              @blur="validateField('logo_url')"
            />
            <p v-if="errors.logo_url" class="text-sm text-red-600">
              {{ errors.logo_url }}
            </p>

            <!-- Logo Preview -->
            <div v-if="form.logo_url && !errors.logo_url" class="mt-3">
              <p class="text-sm text-gray-600 mb-2">Logo Preview:</p>
              <div
                class="w-20 h-20 border border-gray-300 rounded-lg overflow-hidden bg-gray-100"
              >
                <img
                  :src="form.logo_url"
                  alt="Company logo preview"
                  class="w-full h-full object-contain"
                  @error="handleImageError"
                />
              </div>
            </div>
          </div>

          <!-- Status Messages -->
          <div class="statusMessages">
            <h1
              v-if="errMessage"
              class="text-red-400 font-medium mt-2 animate-pulse"
            >
              {{ errMessage }}
            </h1>
            <h1
              v-if="responseMessage"
              class="text-green-400 font-medium mt-2 animate-pulse"
            >
              {{ responseMessage }}
            </h1>
          </div>

          <!-- Form Actions -->
          <div class="flex flex-col sm:flex-row gap-3 border-t pt-6">
            <button
              type="submit"
              class="px-6 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition flex items-center justify-center disabled:bg-indigo-400 disabled:cursor-not-allowed"
              :disabled="hasErrors || isSubmitting"
            >
              <svg
                v-if="isSubmitting"
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
              {{
                isSubmitting
                  ? "Processing..."
                  : isEditing
                  ? "Update Company"
                  : "Create Company"
              }}
            </button>
            <button
              type="button"
              @click="closeModal"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "../api/api";
import { useComapnyStore } from "../store/companyStore";

const emit = defineEmits(["close"]);
const store = useComapnyStore();
const props = defineProps({
  companyData: {
    type: Object,
    default: null,
  },
});

const isEditing = computed(() => !!props.companyData);

// Form data
const form = ref({
  name: "",
  description: "",
  website_url: "",
  logo_url: "",
});

// Validation errors
const errors = ref({
  name: "",
  description: "",
  website_url: "",
  logo_url: "",
});

// Status messages
const errMessage = ref("");
const responseMessage = ref("");
const isSubmitting = ref(false);

// Check if form has errors
const hasErrors = computed(() => {
  return (
    Object.values(errors.value).some((error) => error !== "") ||
    !form.value.name ||
    !form.value.description ||
    !form.value.website_url ||
    !form.value.logo_url
  );
});

// Validation rules
const validationRules = {
  name: (value) => {
    if (!value) return "Company name is required";
    if (value.length < 2) return "Company name must be at least 2 characters";
    if (value.length > 100)
      return "Company name must be less than 100 characters";
    return "";
  },
  description: (value) => {
    if (!value) return "Description is required";
    if (value.length < 10) return "Description must be at least 10 characters";
    if (value.length > 1000)
      return "Description must be less than 1000 characters";
    return "";
  },
  website_url: (value) => {
    if (!value) return "Website URL is required";
    try {
      const url = new URL(value);
      if (!["http:", "https:"].includes(url.protocol)) {
        return "Website URL must start with http:// or https://";
      }
    } catch {
      return "Please enter a valid URL";
    }
    return "";
  },
  logo_url: (value) => {
    if (!value) return ""; // Logo is optional
    try {
      new URL(value);
    } catch {
      return "Please enter a valid URL";
    }
    return "";
  },
};

// Validate individual field
const validateField = (fieldName) => {
  const value = form.value[fieldName];
  errors.value[fieldName] = validationRules[fieldName](value);
};

// Validate all fields
const validateForm = () => {
  Object.keys(validationRules).forEach((field) => {
    validateField(field);
  });
  return !hasErrors.value;
};

// Handle image loading errors
const handleImageError = (event) => {
  errors.value.logo_url = "Failed to load image from this URL";
  event.target.style.display = "none";
};

// Submit form
const submitForm = async () => {
  validateForm();

  if (hasErrors.value) {
    errMessage.value = "Please fix the errors before submitting";
    return;
  }

  isSubmitting.value = true;
  errMessage.value = "";
  responseMessage.value = "Please wait...";

  try {
    const response = await store.addCompany(form.value);
    console.log(response);
    responseMessage.value = isEditing.value
      ? response.msg
      : "Operation Successful";
    setTimeout(() => {
      closeModal();
    }, 1500);
    await store.fetchCompanyProfile();
  } catch (error) {
    console.log(error);
    errMessage.value =
      error.response?.data?.err || "Something went wrong. Please try again.";
    responseMessage.value = "";
  } finally {
    isSubmitting.value = false;
  }
};

// Close modal
const closeModal = () => {
  emit("close");
};

// Initialize form with existing data if editing
onMounted(() => {
  if (props.companyData) {
    form.value = { ...props.companyData };
  }
});
</script>