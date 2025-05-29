<template>
  <div
    class="min-h-screen flex flex-col w500:flex-row items-center justify-center p-4 w100:p-8 max-w-7xl mx-auto"
  >
    <!-- Content Section -->
    <div class="w-full w500:w-1/2 space-y-4 w300:space-y-6 animate-fade-in">
      <div
        class="text-6xl w300:text-7xl w500:text-8xl font-extrabold text-purple-600 leading-none"
      >
        404
      </div>
      <h1 class="text-3xl w300:text-4xl w500:text-5xl font-bold text-gray-800">
        Oops! Page Not Found
      </h1>
      <p class="text-base w300:text-lg text-gray-600 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div class="space-y-3 w300:space-y-4 pt-3 w300:pt-4">
        <router-link
          to="/"
          class="inline-flex items-center px-4 w300:px-6 py-2 w300:py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          <span>Return Home</span>
          <svg
            class="w-4 w300:w-5 h-4 w300:h-5 ml-1 w300:ml-2 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </router-link>

        <div class="relative max-w-xs">
          <input
            type="text"
            placeholder="Or search for something..."
            class="w-full pl-3 w300:pl-4 pr-8 w300:pr-10 py-2 w300:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />
          <button
            class="absolute right-1 w300:right-2 top-1/2 transform -translate-y-1/2 p-1 text-purple-600 hover:text-purple-700"
          >
            <svg
              class="w-5 w300:w-6 h-5 w300:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Illustration Section -->
    <div
      class="w-full w500:w-1/2 mt-8 w300:mt-12 w500:mt-0 w500:pl-8 w450:pl-12"
    >
      <div class="relative max-w-md mx-auto">
        <div
          class="absolute inset-0 bg-purple-100 rounded-full opacity-10 blur-xl animate-pulse z-40"
        ></div>
        <svg
          class="relative w-full h-auto"
          viewBox="0 0 600 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#f2f2f2"
            d="M300 200h300v200H300z"
            transform="rotate(-180 450 300)"
          />
          <circle cx="300" cy="200" r="150" fill="#f8f8f8" />
          <path
            fill="#3f3d56"
            d="M300 80a120 120 0 10120 120 120.136 120.136 0 00-120-120zm0 220a100 100 0 11100-100 100.113 100.113 0 01-100 100z"
          />
          <path
            fill="#6c63ff"
            d="M300 140a80 80 0 1080 80 80.091 80.091 0 00-80-80zm0 140a60 60 0 1160-60 60.068 60.068 0 01-60 60z"
          />
          <circle cx="300" cy="200" r="30" fill="#3f3d56" />
          <path
            fill="#3f3d56"
            d="M300 180a20 20 0 1020 20 20.023 20.023 0 00-20-20zm0 30a10 10 0 1110-10 10.011 10.011 0 01-10 10z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>



<style>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}
</style>