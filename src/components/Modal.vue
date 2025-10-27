<script setup>
defineProps({
  show: Boolean,
  title: String,
});

defineEmits(["close"]);
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 dark:bg-black/75 flex items-center justify-center z-50"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-3/4 max-h-[80%] overflow-y-auto p-4"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-black dark:text-white">
          {{ title }}
        </h2>
        <button
          @click="$emit('close')"
          class="text-white bg-gray-400 dark:bg-gray-700 hover:bg-indigo-600 px-2 rounded-full text-xl"
        >
          ✕
        </button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
