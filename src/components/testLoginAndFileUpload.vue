<template>
  <main>
    <!-- Your existing auth forms -->
    <form @submit.prevent="loginUser">
      <input type="email" placeholder="Enter email" required v-model="email" />
      <input
        type="password"
        placeholder="Enter password"
        required
        v-model="password"
      />
      <button type="submit">Login</button>
    </form>

    <!-- File upload section -->
    <div class="upload-section">
      <h2>Upload Your File</h2>
      <form @submit.prevent="uploadFile" class="simple-upload">
        <input
          type="file"
          @change="handleFileChange"
          accept="image/png , image/jpg , image/jpeg"
        />
        <button type="submit" :disabled="!file">
          {{ isUploading ? "Uploading..." : "Upload" }}
        </button>
      </form>

      <div v-if="message" class="message" :class="{ error: isError }">
        {{ message }}
        <a v-if="fileUrl" :href="fileUrl" target="_blank">View File</a>
      </div>
    </div>
  </main>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

// production_url
const url = "https://job-board-frontend-production.up.railway.app/";
// Auth refs
const email = ref();
const password = ref();
const isAuthenticated = ref(false);

// File upload refs
const fileInput = ref(null);
const file = ref(null);
const uploadProgress = ref(0);
const uploadResult = ref(null);
const isUploading = ref(false);
const message = ref("");
const isError = ref(false);
const fileUrl = ref("");

const handleFileChange = (event) => {
  // file.value = fileInput.value.files[0];
  const profile = event.target.files[0];
  if (
    profile &&
    (profile.type === "image/jpg" ||
      profile.type === "image/jpeg" ||
      profile.type === "image/png")
  ) {
    isError.value = false;
    message.value = "";
    file.value = profile;
  } else {
    file.value = null;
    isError.value = true;
    message.value = "only png , jpg and jpeg types are supported!";
  }
};

const loginUser = async () => {
  try {
    // const url = "http://localhost:3000/api/auth/login",
    const response = await axios.post(
      url,
      {
        email: email.value,
        password: password.value,
      },
      { withCredentials: true }
    );
    isAuthenticated.value = true;
    console.log("Login successful", response);
  } catch (err) {
    console.error("Login failed", err);
  }
};

const protectedRoute = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/protected",
      {},
      { withCredentials: true }
    );
    console.log("Protected route response", response);
  } catch (error) {
    console.error("Protected route failed", error);
  }
};

const uploadFile = async () => {
  if (!file.value) return;

  isUploading.value = true;
  message.value = "";
  isError.value = false;
  fileUrl.value = "";
  const formData = new FormData();

  formData.append("profile", file.value);

  // "http://localhost:3000/api/seeker/profile/picture",
  try {
    const response = await axios.post(url, formData, {
      withCredentials: true,
    });
    console.log(response);

    fileUrl.value = response.data.url;
    message.value = response.data.msg || "Upload successful!";
    file.value = "";
  } catch (error) {
    console.log(error);

    isError.value = true;
    message.value = error.response?.data?.err || "Upload failed";
  } finally {
    isUploading.value = false;
  }
};
</script>

<style scoped>
.upload-section {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.simple-upload {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.simple-upload input[type="file"] {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.message {
  margin-top: 10px;
  padding: 10px;
  background: #f0f8ff;
  border-radius: 4px;
}

.message.error {
  background: #ffebee;
  color: #f44336;
}

.message a {
  display: block;
  margin-top: 5px;
  color: #42b983;
}
</style>