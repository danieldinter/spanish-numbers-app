<script setup>
import { ref } from "vue";
import { numberToSpanish } from "./numberToSpanish.js";
import AlertError from "./components/AlertError.vue";
import AlertSuccess from "./components/AlertSuccess.vue";

const currentNumber = ref(generateRandomNumber());
const userInput = ref("");
const feedback = ref("");
const feedbackTitle = ref("");
const feedbackMessage = ref("");
var numberSetting = ref("upToThousand");

const numberSettings = [
  {
    id: 1,
    name: "units",
    label: "0-10",
  },
  {
    id: 2,
    name: "teens",
    label: "11-20",
  },
  {
    id: 3,
    name: "twenties",
    label: "20-30",
  },
  {
    id: 4,
    name: "upToHundred",
    label: "0-100",
  },
  {
    id: 5,
    name: "upToThousand",
    label: "0-1000",
  },
];

function generateRandomNumber(numberSetting = "upToThousand") {
  switch (numberSetting) {
    case "units":
      return Math.floor(Math.random() * 11);
    case "teens":
      return Math.floor(Math.random() * 10) + 11;
    case "twenties":
      return Math.floor(Math.random() * 11) + 20;
    case "upToHundred":
      return Math.floor(Math.random() * 101);
    case "upToThousand":
    default:
      break;
  }
  return Math.floor(Math.random() * 1001);
}

function generateAndSetNewNumber() {
  console.log("Generating new number for setting:", numberSetting.value);
  currentNumber.value = generateRandomNumber(numberSetting.value);
}

function onChangeNumberSetting() {
  generateAndSetNewNumber();
}

function checkAnswer() {
  const correct = numberToSpanish(currentNumber.value).toLowerCase().trim();
  const input = userInput.value.toLowerCase().trim();

  if (input === correct) {
    feedback.value = true;
    feedbackTitle.value = "¡Exacto!";
    feedbackMessage.value = "¡Buen trabajo! 👏";
  } else {
    feedback.value = false;
    feedbackTitle.value = "¡Incorrecto!";
    feedbackMessage.value = `Correcta es: ${correct}`;
  }

  // Reset feedback after 5 seconds
  setTimeout(() => {
    feedback.value = null;
  }, 5000);

  // Generate a new number and reset input
  generateAndSetNewNumber();
  userInput.value = "";
}
</script>

<template>
  <div class="w-full flex flex-col gap-y-10 items-center justify-center p-4">
    <h1 class="text-4xl font-bold text-black dark:text-white">
      Practicar los números en español
    </h1>

    <div
      class="w-full p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <p class="font-normal text-gray-700 dark:text-gray-400 mb-4">Modo:</p>
      <ul class="flex flex-wrap items-center justify-center gap-4">
        <template v-for="(numSet, i) in numberSettings">
          <li class="flex flex-row items-center justify-center gap-2">
            <input
              type="radio"
              :id="'numberSetting' + numSet.id"
              name="numberSetting"
              :value="numSet.name"
              v-model="numberSetting"
              v-on:change="onChangeNumberSetting"
              :checked="numSet.name == numberSetting"
            />

            <label :for="'numberSetting' + numSet.id">{{ numSet.label }}</label>
          </li>
        </template>
      </ul>
    </div>

    <div
      class="w-full p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <p class="font-normal text-gray-700 dark:text-gray-400 mb-4">
        Qué número es este?
      </p>
      <h2
        class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ currentNumber }}
      </h2>
    </div>

    <div
      class="w-full p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <p class="font-normal text-gray-700 dark:text-gray-400 mb-4">
        Escribe el número con letras:
      </p>

      <div class="flex flex-row w-full">
        <input
          v-model="userInput"
          type="text"
          placeholder="p. ej. treinta y cuatro"
          class="text-sm md:text-2xl w-3/5 p-2 border border-r-0 border-indigo-600 rounded-l-lg bg-none text-gray-900 dark:text-white tracking-tight focus:outline-none"
          @keyup.enter="checkAnswer"
          autofocus
        />
        <button
          @click="checkAnswer"
          class="text-sm md:text-xl w-2/5 p-2 border border-indigo-600 rounded-r-lg bg-indigo-800 text-white hover:bg-indigo-600"
        >
          <span class="font-bold">Verificar</span>
          <span class="align-basline opacity-40 text-sm invisible md:visible"
            >(&#x23CE;)</span
          >
        </button>
      </div>
    </div>

    <AlertSuccess
      v-if="feedback === true"
      :title="feedbackTitle"
      :message="feedbackMessage"
    />

    <AlertError
      v-if="feedback === false"
      :title="feedbackTitle"
      :message="feedbackMessage"
    />
  </div>
</template>

<style scoped></style>
