<script setup>
defineProps({
  message: String,
  title: {
    type: String,
    default: "Error!",
  },
});
</script>

<template>
  <div
    class="animate-bounce p-4 text-sm text-red-800 rounded-lg bg-red-300 dark:bg-red-950 dark:text-red-400 z-10 fixed top-0 mx-auto mt-20"
    role="alert"
  >
    <span class="font-bold">{{ title }}</span> {{ message }}
  </div>
</template>
