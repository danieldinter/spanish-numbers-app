<script setup>
defineProps({
  message: {
    type: String,
    default: "Das hast du sehr gut gemacht",
  },
  title: {
    type: String,
    default: "Error!",
  },
});
</script>

<template>
  <div
    class="animate-bounce p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-300 dark:bg-green-950 dark:text-green-400 z-10 fixed top-0 mx-auto mt-20"
    role="alert"
  >
    <span class="font-bold">{{ title }}</span> {{ message }}
  </div>
</template>
