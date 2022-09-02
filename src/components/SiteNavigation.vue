<template>
  <header>
    <nav>
      <RouterLink :to="{ name: 'home' }">
        <div>
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">WeitherApp</p>
        </div>
      </RouterLink>
      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        ></i>
      </div>
    </nav>
  </header>
</template>

<script setup></script>

<style lang="scss">
header {
  @apply sticky top-0 bg-weather-primary shadow-lg;
}

nav {
  @apply container flex flex-col sm:flex-row items-center gap-4 text-white py-6;

  a div {
    @apply flex items-center gap-3;
  }
}
</style>
