<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white shadow-xl rounded-xl overflow-hidden">
        <!-- Settings Header -->
        <div class="bg-gradient-to-r from-indigo-700 to-indigo-600 px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl md:text-3xl font-bold text-white">
                Account Settings
              </h1>
              <p class="text-indigo-100 mt-1">
                Manage your account preferences and security
              </p>
            </div>
            <div class="flex space-x-2">
              <button
                @click="showDeleteModal = true"
                class="px-4 py-2 text-red-100 bg-white/10 rounded-md hover:bg-white/20 transition"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        <!-- Settings Navigation -->
        <div class="border-b border-gray-200">
          <nav class="flex overflow-x-auto">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2',
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent hover:text-gray-700 hover:border-gray-300',
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <!-- Settings Content -->
        <div class="px-8 py-8">
          <!-- Profile Settings Tab -->
          <transition name="list">
            <div v-if="activeTab === 'profile'" class="space-y-8">
              <div class="bg-gray-50 rounded-xl p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">
                  Basic Information
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Name</label
                    >
                    <input
                      v-model="profile.name"
                      type="text"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                  <!-- <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Last Name</label
                    >
                    <input
                      v-model="profile.lastName"
                      type="text"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div> -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Email</label
                    >
                    <input
                      v-model="profile.email"
                      type="email"
                      readonly
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg transition read-only:bg-gray-50 read-only:cursor-not-allowed read-only:outline-indigo-500"
                    />
                  </div>
                  <!-- <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Phone Number</label
                    >
                    <input
                      v-model="profile.phone"
                      type="tel"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div> -->
                </div>
              </div>

              <div class="bg-gray-50 rounded-xl p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">
                  Profile Visibility
                </h2>
                <div class="space-y-4">
                  <div class="flex items-center">
                    <input
                      id="public-profile"
                      v-model="profile.visibility"
                      type="radio"
                      value="public"
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label
                      for="public-profile"
                      class="ml-3 block text-sm font-medium text-gray-700"
                    >
                      <span class="font-semibold">Public Profile</span>
                      <p class="text-gray-500">
                        Your profile can be seen by anyone, including employers
                        and recruiters
                      </p>
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="private-profile"
                      v-model="profile.visibility"
                      type="radio"
                      value="private"
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label
                      for="private-profile"
                      class="ml-3 block text-sm font-medium text-gray-700"
                    >
                      <span class="font-semibold">Private Profile</span>
                      <p class="text-gray-500">
                        Only you can see your profile information
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </transition>
          <!-- Security Tab -->
          <transition name="list">
            <div v-if="activeTab === 'security'" class="space-y-8">
              <div class="bg-gray-50 rounded-xl p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">
                  Change Password
                </h2>
                <form @submit.prevent="changePassword" class="space-y-4">
                  <div>
                    <label
                      for="current"
                      class="block text-sm font-medium text-gray-700 mb-1"
                      >Current Password</label
                    >
                    <input
                      id="current"
                      required
                      v-model.trim="password.current"
                      type="password"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                  <div>
                    <label
                      for="new"
                      class="block text-sm font-medium text-gray-700 mb-1"
                      >New Password</label
                    >
                    <input
                      id="new"
                      required
                      v-model.trim="password.newPas"
                      type="password"
                      minlength="8"
                      min="8"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                    <p class="text-xs text-gray-500 mt-1">
                      Must be at least 8 characters
                    </p>
                  </div>
                  <div>
                    <label
                      for="confirm"
                      class="block text-sm font-medium text-gray-700 mb-1"
                      >Confirm New Password</label
                    >
                    <input
                      id="confirm"
                      required
                      v-model="password.confirm"
                      min="8"
                      type="password"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                  <div class="Msgs px-4">
                    <p
                      v-if="errMsg"
                      class="text-sm font-medium text-red-400 capitalize animate-pulse"
                    >
                      {{ errMsg }}
                    </p>
                    <p
                      v-if="responseMsg"
                      class="text-sm font-medium text-green-400 capitalize animate-pulse"
                    >
                      {{ responseMsg }}
                    </p>
                  </div>
                  <div class="pt-2">
                    <button
                      type="submit"
                      class="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>

              <div class="bg-gray-50 rounded-xl p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">
                  Two-Factor Authentication
                </h2>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-gray-700">
                      Status:
                      <span
                        :class="
                          profile.twoFactorEnabled
                            ? 'text-green-600'
                            : 'text-gray-500'
                        "
                      >
                        {{ profile.twoFactorEnabled ? "Enabled" : "Disabled" }}
                      </span>
                    </p>
                    <p class="text-sm text-gray-500 mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button
                    @click="toggleTwoFactor"
                    disabled
                    class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition disabled:bg-gray-50 disabled:cursor-not-allowed"
                  >
                    {{ profile.twoFactorEnabled ? "Disable" : "Enable" }} 2FA
                  </button>
                </div>
              </div>

              <div class="bg-gray-50 rounded-xl p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">
                  Active Sessions
                </h2>
                <div class="space-y-4">
                  <div
                    v-for="session in activeSessions"
                    :key="session.id"
                    class="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <p class="font-medium text-gray-700">
                        {{ session.device }} • {{ session.browser }}
                      </p>
                      <p class="text-sm text-gray-500">
                        {{ session.location }} • Last active
                        {{ session.lastActive }}
                      </p>
                    </div>
                    <button
                      v-if="!session.current"
                      @click="revokeSession(session.id)"
                      class="text-sm text-red-600 hover:text-red-800"
                    >
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>
          <!-- Notifications Tab -->
          <transition name="list">
            <div v-if="activeTab === 'notifications'" class="space-y-8">
              <div class="bg-gray-50 rounded-xl p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">
                  Email Notifications
                </h2>
                <div class="space-y-4">
                  <div class="flex items-start">
                    <input
                      id="job-alerts"
                      v-model="notifications.jobAlerts"
                      type="checkbox"
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label
                      for="job-alerts"
                      class="ml-3 block text-sm font-medium text-gray-700"
                    >
                      <span class="font-semibold">Job Alerts</span>
                      <p class="text-gray-500">
                        Receive email notifications about new job postings that
                        match your profile
                      </p>
                    </label>
                  </div>
                  <div class="flex items-start">
                    <input
                      id="application-updates"
                      v-model="notifications.applicationUpdates"
                      type="checkbox"
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label
                      for="application-updates"
                      class="ml-3 block text-sm font-medium text-gray-700"
                    >
                      <span class="font-semibold">Application Updates</span>
                      <p class="text-gray-500">
                        Get notified when employers view or update your
                        application status
                      </p>
                    </label>
                  </div>
                  <div class="flex items-start">
                    <input
                      id="profile-views"
                      v-model="notifications.profileViews"
                      type="checkbox"
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label
                      for="profile-views"
                      class="ml-3 block text-sm font-medium text-gray-700"
                    >
                      <span class="font-semibold">Profile Views</span>
                      <p class="text-gray-500">
                        Receive notifications when employers view your profile
                      </p>
                    </label>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 rounded-xl p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">
                  Push Notifications
                </h2>
                <div class="space-y-4">
                  <div class="flex items-start">
                    <input
                      id="push-job-alerts"
                      v-model="notifications.pushJobAlerts"
                      type="checkbox"
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label
                      for="push-job-alerts"
                      class="ml-3 block text-sm font-medium text-gray-700"
                    >
                      <span class="font-semibold">Job Alerts</span>
                      <p class="text-gray-500">
                        Receive push notifications about new job postings
                      </p>
                    </label>
                  </div>
                  <div class="flex items-start">
                    <input
                      id="push-messages"
                      v-model="notifications.pushMessages"
                      type="checkbox"
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label
                      for="push-messages"
                      class="ml-3 block text-sm font-medium text-gray-700"
                    >
                      <span class="font-semibold">Messages</span>
                      <p class="text-gray-500">
                        Get notified when you receive new messages from
                        employers
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </transition>
          <!-- Privacy Tab -->
          <transition name="list">
            <div v-if="activeTab === 'privacy'" class="space-y-8">
              <div class="bg-gray-50 rounded-xl p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">
                  Data Privacy
                </h2>
                <div class="space-y-4">
                  <div class="flex items-start">
                    <input
                      id="data-sharing"
                      v-model="privacy.dataSharing"
                      type="checkbox"
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label
                      for="data-sharing"
                      class="ml-3 block text-sm font-medium text-gray-700"
                    >
                      <span class="font-semibold">Allow Data Sharing</span>
                      <p class="text-gray-500">
                        Share anonymized data to help improve our services
                      </p>
                    </label>
                  </div>
                  <div class="flex items-start">
                    <input
                      id="personalized-ads"
                      v-model="privacy.personalizedAds"
                      type="checkbox"
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label
                      for="personalized-ads"
                      class="ml-3 block text-sm font-medium text-gray-700"
                    >
                      <span class="font-semibold">Personalized Ads</span>
                      <p class="text-gray-500">
                        See job recommendations based on your profile and
                        activity
                      </p>
                    </label>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 rounded-xl p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">
                  Data Management
                </h2>
                <div class="space-y-4">
                  <button
                    @click="exportData"
                    class="w-full text-left px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-between"
                  >
                    <div>
                      <p class="font-medium text-gray-700">Export Your Data</p>
                      <p class="text-sm text-gray-500">
                        Download a copy of all your personal data
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </button>
                  <button
                    @click="showDeleteModal = true"
                    class="w-full text-left px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-between text-red-600"
                  >
                    <div>
                      <p class="font-medium">Delete Account</p>
                      <p class="text-sm text-red-500">
                        Permanently remove your account and all data
                      </p>
                    </div>
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </transition>
          <!-- Save Button -->
          <div class="mt-10 flex justify-end">
            <button
              @click="saveSettings"
              :disabled="isSaving"
              class="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
            >
              <svg
                v-if="isSaving"
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
              <span>{{ isSaving ? "Saving..." : "Save Changes" }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Account Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div class="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mx-auto text-red-500"
            fill="none"
            viewBox="0 0 22 22"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 class="text-lg font-bold text-gray-800 mt-4">
            Delete Your Account?
          </h3>
          <p class="text-gray-600 mt-2">
            This action cannot be undone. All your data will be permanently
            removed from our systems.
          </p>
          <div class="mt-6 flex justify-center space-x-4">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              @click="deleteAccount"
              class="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "../store/useUserState";
import axios from "axios";

const changePasswordUrl = "http://localhost:3000/api/auth/change/password";
const updateNameAndVisibilityUrl =
  "http://localhost:3000/api/seeker/update/profile/name/visibility";
const store = useAuthStore();
const activeTab = ref("profile");
const showDeleteModal = ref(false);
const isSaving = ref(false);
const errMsg = ref("");
const responseMsg = ref("");

const tabs = [
  { id: "profile", name: "Profile Settings" },
  { id: "security", name: "Security" },
  { id: "notifications", name: "Notifications" },
  { id: "privacy", name: "Privacy" },
];

const profile = ref({
  name: "Alex",
  //   lastName: "Johnson",
  email: "alex.johnson@example.com",
  //   phone: "+1 (555) 123-4567",
  visibility: "public",
  //   twoFactorEnabled: false,
});

const password = ref({
  current: null,
  newPas: null,
  confirm: null,
});

const activeSessions = ref([
  {
    id: 1,
    device: "MacBook Pro",
    browser: "Chrome on macOS",
    location: "San Francisco, CA",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: 2,
    device: "iPhone 13",
    browser: "Safari on iOS",
    location: "New York, NY",
    lastActive: "1 day ago",
    current: false,
  },
]);

const notifications = ref({
  jobAlerts: true,
  applicationUpdates: true,
  profileViews: true,
  pushJobAlerts: true,
  pushMessages: true,
});

const privacy = ref({
  dataSharing: false,
  personalizedAds: true,
});

const validatePassword = () => {
  if (
    password.value.current != null &&
    password.value.newPas != null &&
    password.value.confirm === password.value.newPas
  ) {
    errMsg.value = "";
    return true;
  } else {
    errMsg.value = "New Password must match the confirm password";
    responseMsg.value = "";
    return false;
  }
};

const changePassword = async () => {
  const isValidPas = validatePassword();
  if (isValidPas) {
    errMsg.value = "";
    responseMsg.value = "***";
    try {
      const response = await axios.post(changePasswordUrl, password.value, {
        withCredentials: true,
      });
      const { msg } = response.data;
      responseMsg.value = msg;
      errMsg.value = "";
      password.value.confirm = null;
    } catch (error) {
      responseMsg.value = "";
      const { err } = error.response.data;
      errMsg.value = err;
    }
  }
};
const toggleTwoFactor = () => {
  profile.value.twoFactorEnabled = !profile.value.twoFactorEnabled;
  console.log(
    "Two-factor auth:",
    profile.value.twoFactorEnabled ? "enabled" : "disabled"
  );
};

const revokeSession = (sessionId) => {
  activeSessions.value = activeSessions.value.filter(
    (session) => session.id !== sessionId
  );
  console.log("Revoked session:", sessionId);
};

const exportData = () => {
  console.log("Exporting user data");
  // Implement data export logic
};

const deleteAccount = () => {
  console.log("Deleting account");
  showDeleteModal.value = false;
  // Implement account deletion logic
};

const changeProfileAndVisibility = async () => {
  if (profile.value.name.trim()) {
    try {
      const response = await axios.post(
        updateNameAndVisibilityUrl,
        { profile: profile.value },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
    return true;
  }
  return false;
};
const saveSettings = async () => {
  isSaving.value = true;
  await changeProfileAndVisibility();
  await getInfo();
  await store.getUserInformation();
  setTimeout(async () => {
    isSaving.value = false;

    console.log("Settings saved:", {
      notifications: notifications.value,
      privacy: privacy.value,
    });
  }, 1000);
};
const getInfo = async () => {
  const response = await store.getUserInformation();
  profile.value.email = response.data.email;
  profile.value.name = response.data.name;
  profile.value.visibility = response.data.is_public;
  //   profile.value = response.data;
  return response;
};
onMounted(async () => getInfo());
</script>
<style scoped>
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
  transition: all 0.4s ease;
}
</style> 