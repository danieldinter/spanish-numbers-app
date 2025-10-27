import { ref } from "vue";

const toasts = ref([]);

export function useToast() {
  function addToast(type = "success", title, message) {
    const id = Date.now();
    toasts.value.push({ id, type, title, message });

    // Remove the toast after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }

  function removeToast(id) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  }

  return { toasts, addToast, removeToast };
}
