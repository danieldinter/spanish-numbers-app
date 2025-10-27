<script setup>
import { useToast } from "../composables/useToast.js";

const { toasts } = useToast();
</script>

<template>
  <div class="toast-container">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="[
        'toast',
        toast.type === 'success' ? 'toast-success' : 'toast-error',
      ]"
    >
      <span class="font-bold">{{ toast.title }}</span
      >&nbsp;{{ toast.message }}
    </div>
  </div>
</template>

<style scoped></style>
