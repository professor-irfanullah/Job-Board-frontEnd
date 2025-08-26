<template>
  <div class="verify-container">
    <form @submit.prevent="handleSubmit" class="form-card">
      <h2 class="title">Check Your Account Status</h2>

      <label for="email" class="label">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        placeholder="you@example.com"
        class="input"
        :class="{ 'input-error': emailError }"
      />
      <p v-if="emailError" class="error-message">{{ emailError }}</p>

      <button type="submit" class="submit-button" :disabled="loading">
        {{ loading ? "Verifying..." : "Verify" }}
      </button>

      <!-- ✅ Server feedback -->
      <p
        v-if="serverMessage"
        :class="{
          'success-message': success,
          'error-message': !success,
        }"
      >
        {{ serverMessage }}
      </p>
      <!-- 📨 Instructional message -->
      <p v-if="serverMessage === 'Email is not verified'" class="info-message">
        We will send an email to this address to verify your identity.
        <button
          :disabled="nodemailerError != null || nodemailerResponse != null"
          @click.prevent="sendEmail"
          class="text-blue-400 font-semibold cursor-pointer hover:text-blue-500 transition hover:underline disabled:text-blue-300 disabled:cursor-not-allowed"
        >
          verify?
        </button>
      </p>
      <div class="nodemailer">
        <p class="text-red-400">{{ nodemailerError }}</p>
        <p class="text-green-400">{{ nodemailerResponse }}</p>
      </div>
    </form>
  </div>
</template>


<script setup>
import { ref } from "vue";
import api from "../api/api";

// Email state
const user = ref(null);
const email = ref("");
const emailError = ref("");
const loading = ref(false);
const serverMessage = ref("");
const success = ref(false);
const nodemailerResponse = ref(null);
const nodemailerError = ref(null);

const validateEmail = (value) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value);
};

const handleSubmit = async () => {
  emailError.value = "";
  serverMessage.value = "";

  if (!validateEmail(email.value)) {
    emailError.value = "Please enter a valid email address.";
    return;
  }

  loading.value = true;
  try {
    const response = await api.post("/api/auth/verify/user", {
      email: email.value,
    });
    success.value = true;
    serverMessage.value = response.data?.msg || "Verification email sent.";
  } catch (error) {
    console.log(error);
    success.value = false;
    if (error.response && error.response.data && error.response.data.err) {
      serverMessage.value = error.response.data.err;
      if (error.response.data.err === "Email is not verified") {
        user.value = error?.response?.data?.email;
      }
    } else {
      serverMessage.value = "An unexpected error occurred.";
    }
  } finally {
    loading.value = false;
    nodemailerError.value = null;
    nodemailerResponse.value = null;
  }
};
const sendEmail = async () => {
  nodemailerResponse.value = "Please wait...";
  try {
    const response = await api.get(`/api/auth/email/user?email=${user.value}`);
    console.log(response);
    nodemailerError.value = null;
    nodemailerResponse.value = response.data.msg;
  } catch (error) {
    if (error.code === "ERR_BAD_RESPONSE") {
      nodemailerResponse.value = null;
      nodemailerError.value = "Looks like Network Disconnected";
      return;
    }
    console.log(error);
    nodemailerResponse.value = null;
    nodemailerError.value = "Something went wrong";
  }
};
</script>

<style scoped>
.verify-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.form-card {
  background: white;
  padding: 2rem 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
}

.title {
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
  color: #333;
}

.label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

.input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: border 0.3s;
}

.input-error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.success-message {
  color: #28a745;
  font-size: 0.95rem;
  margin-top: 1rem;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}

.submit-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
.info-message {
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #6c757d;
  text-align: center;
}
</style>
