<template>
  <main
    class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4"
  >
    <div
      class="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden p-6"
    >
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Upload Your CV</h1>
        <p class="text-gray-600">Please upload your resume in PDF format</p>
      </div>

      <form @submit.prevent="submitPDF" class="space-y-4">
        <div class="flex items-center justify-center w-full">
          <label
            class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 16"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500">PDF only (MAX. 5MB)</p>
            </div>
            <input
              type="file"
              accept="application/pdf"
              @change="handleFileChange"
              class="hidden"
            />
          </label>
        </div>

        <div
          v-if="pdfFile"
          class="p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <svg
                class="w-6 h-6 text-red-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 18a.969.969 0 0 0 .933 1h12.134A.97.97 0 0 0 15 18M1 7V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2v5M6 1v4a1 1 0 0 1-1 1H1m0 9v-5h1.5a1.5 1.5 0 0 1 0 3H1m12-3v-5h1.375a1.625 1.625 0 0 1 0 3.25H13Zm-9-3v-5h1.5a1.5 1.5 0 0 1 0 3H4Z"
                />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ pdfFile.name }}
              </p>
              <p class="text-sm text-gray-500">
                {{ (pdfFile.size / 1024).toFixed(2) }} KB
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          :disabled="!pdfFile"
          class="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Upload CV
        </button>
      </form>
    </div>
  </main>
</template>
<script setup>
import axios from "axios";
import { ref } from "vue";

const pdfFile = ref(null);
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type === "application/pdf") {
    pdfFile.value = file;
  } else {
    pdfFile.value = null;
    alert("please select a valid PDF file.");
  }
};
const submitPDF = async () => {
  if (!pdfFile.value) return;

  const formData = new FormData();
  formData.append("file", pdfFile.value);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/seeker/profile/cv",
      formData,
      { withCredentials: true }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
</script>