<script setup>
import { ref, computed } from "vue";
import { numberToSpanish } from "./numberToSpanish.js";
import { generateRandomNumber } from "./generateRandomNumber.js";
import { useToast } from "./composables/useToast";
import { useI18n } from "vue-i18n";
import Modal from "./components/Modal.vue";
import FireIcon from "./components/FireIcon.vue";
import Toast from "./components/Toast.vue";
import buildInfo from "../build-info.json";

var numberSetting = ref("upToThousand");
const isReverseMode = ref(false);
const showModal = ref(false);
const showHint = ref(false);

const numberList = ref(generateNumberList());
const currentNumber = ref(generateRandomNumber());
const userInput = ref("");
const correctAnswer = ref("");
const { addToast } = useToast();
const { t } = useI18n();

const buildNumber = buildInfo.buildNumber;
const buildTimestamp = new Date(buildInfo.timestamp).toLocaleString();

const localeNames = {
  en: "English",
  es: "Español",
  de: "Deutsch",
};

const numberSettings = [
  {
    id: 1,
    name: "units",
    label: "0-9",
  },
  {
    id: 2,
    name: "teens",
    label: "10-19",
  },
  {
    id: 3,
    name: "twenties",
    label: "20-29",
  },
  {
    id: 4,
    name: "tens",
    label: "0-99",
  },
  {
    id: 5,
    name: "hundreds",
    label: "0-999",
  },
];

function getQuestionPlaceholder() {
  return isReverseMode.value ? t("placeholderDigits") : t("placeholderWords");
}

function generateNumberList() {
  const numbers = [];
  for (let i = 0; i <= 999; i++) {
    numbers.push({ value: i, name: numberToSpanish(i) });
  }
  return numbers;
}

function generateAndSetNewNumber() {
  console.log("Generating new number for setting:", numberSetting.value);
  currentNumber.value = generateRandomNumber(numberSetting.value);
}

function onChangeNumberSetting() {
  generateAndSetNewNumber();
}

function checkAnswer() {
  if (isReverseMode.value) {
    // isReverseMode = true means user sees the Spanish word and has to type the numeral
    correctAnswer.value = currentNumber.value.toString();
  } else {
    // isReverseMode = false (default) means user sees the  numeral and has to type the Spanish word
    correctAnswer.value = numberToSpanish(currentNumber.value)
      .toLowerCase()
      .trim();
  }
  const input = userInput.value.toLowerCase().trim();

  const isCorrect = input === correctAnswer.value;

  // Save the result to localStorage
  saveResult(currentNumber.value, isCorrect);

  // Update the streak
  const currentStreak = updateStreak(isCorrect);

  if (isCorrect) {
    addToast("success", t("feedbackTitleSuccess"), t("feedbackMessageSuccess"));
  } else {
    addToast(
      "error",
      t("feedbackTitleError"),
      t("feedbackMessageError", { correctAnswer: correctAnswer.value })
    );
  }

  // Generate a new number and reset input
  generateAndSetNewNumber();
  userInput.value = "";
}

const hint = computed(() => {
  if (isReverseMode.value) return ""; // No hint in reverse mode

  const words = numberToSpanish(currentNumber.value).split(" ");
  return words.map((word) => word[0] + "_".repeat(word.length - 1)).join(" ");
});

function toggleHint() {
  showHint.value = !showHint.value;
}

function saveResult(number, isCorrect) {
  const results = JSON.parse(localStorage.getItem("results")) || [];
  results.push({
    number,
    correct: isCorrect,
    timestamp: new Date().toISOString(),
  });
  localStorage.setItem("results", JSON.stringify(results));
}

const streak = ref(JSON.parse(localStorage.getItem("streak")) || 0);

function updateStreak(isCorrect) {
  let currentStreak = JSON.parse(localStorage.getItem("streak")) || 0;
  currentStreak = isCorrect ? currentStreak + 1 : 0;
  localStorage.setItem("streak", JSON.stringify(currentStreak));
  streak.value = currentStreak; // Update the reactive variable
  return currentStreak;
}
</script>

<template>
  <div class="w-full flex flex-col gap-y-10 items-center justify-center p-4">
    <h1 class="text-2xl md:text-4xl font-bold text-black dark:text-white">
      {{ $t("heading") }}
    </h1>

    <!-- Locale switcher -->
    <div class="grid max-w-sm mx-auto">
      <svg
        class="pointer-events-none relative right-1 z-10 col-start-1 row-start-1 h-4 w-4 self-center justify-self-end forced-colors:hidden dark:text-white"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <select
        v-model="$i18n.locale"
        class="col-start-1 row-start-1 appearance-none forced-colors:appearance-auto text-sm rounded-lg p-2.5 pr-10 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option
          v-for="locale in $i18n.availableLocales"
          :key="`locale-${locale}`"
          :value="locale"
        >
          {{ localeNames[locale] }}
        </option>
      </select>
    </div>

    <div
      class="w-full flex flex-col gap-y-4 items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <p class="font-normal text-gray-700 dark:text-gray-400">
        {{ $t("mode") }}:
      </p>
      <!-- Toggle for Numbers -->
      <ul class="flex flex-wrap items-center justify-center gap-4">
        <template v-for="(numSet, i) in numberSettings">
          <li class="flex flex-row items-center justify-center gap-x-2">
            <label
              class="p-2 rounded-lg text-gray-900 dark:text-white has-checked:bg-indigo-50 has-checked:text-indigo-900 has-checked:ring-indigo-200 dark:has-checked:bg-indigo-900 dark:has-checked:text-indigo-200 dark:has-checked:ring-indigo-900"
              :for="'numberSetting' + numSet.id"
            >
              <input
                type="radio"
                :id="'numberSetting' + numSet.id"
                name="numberSetting"
                :value="numSet.name"
                v-model="numberSetting"
                v-on:change="onChangeNumberSetting"
                :checked="numSet.name == numberSetting"
                class="w-4 h-4 bg-gray-100 checked:bg-indigo-500 border-gray-300 focus:ring-indigo-500 dark:focus:ring-indigo-600 checked:ring-indigo-500 dark:checked:ring-indigo-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 accent-indigo-600 dark:accent-indig-600"
              />
              {{ numSet.label }}
            </label>
          </li>
        </template>
      </ul>
      <!-- Toggle for Reverse Mode -->
      <div class="flex items-center justify-center">
        <label class="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            class="sr-only peer"
            v-model="isReverseMode"
          />
          <div
            class="relative w-11 h-6 bg-gray-200 dark:bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-600"
          ></div>
          <span class="ms-3 text-gray-900 dark:text-white">{{
            $t("inverse")
          }}</span>
        </label>
      </div>
    </div>

    <!-- Question -->
    <div
      class="w-full p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <p class="font-normal text-gray-700 dark:text-gray-400 mb-4">
        {{ isReverseMode ? $t("questionReverse") : $t("question") }}
      </p>
      <h2
        class="mb-2 text-xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ isReverseMode ? numberToSpanish(currentNumber) : currentNumber }}
      </h2>
    </div>

    <!-- Input Field -->
    <div
      class="w-full p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <p class="font-normal text-gray-700 dark:text-gray-400 mb-4">
        {{ isReverseMode ? $t("answerPromptReverse") : $t("answerPrompt") }}
      </p>

      <div class="flex flex-row w-full">
        <input
          v-model="userInput"
          type="text"
          :placeholder="showHint ? hint : getQuestionPlaceholder()"
          class="text-sm md:text-2xl w-3/5 p-2 border border-r-0 border-indigo-600 rounded-l-lg bg-none text-gray-900 dark:text-white tracking-tight focus:outline-none"
          @keyup.enter="checkAnswer"
          autofocus
        />
        <button
          @click="checkAnswer"
          class="text-sm md:text-xl w-2/5 p-2 border border-indigo-600 rounded-r-lg bg-indigo-800 text-white hover:bg-indigo-600"
        >
          <span class="font-bold">{{ $t("verify") }}</span>
          <span class="align-basline opacity-40 text-sm invisible md:visible"
            >(&#x23CE;)</span
          >
        </button>
      </div>
    </div>

    <div class="flex flex-row gap-x-4">
      <!-- Toggle Hint Button -->
      <button
        @click="toggleHint"
        class="p-2 border border-indigo-600 rounded-lg bg-indigo-800 text-white hover:bg-indigo-600"
      >
        {{ showHint ? $t("hintHide") : $t("hintShow") }}
      </button>

      <!-- Button to Open Modal -->
      <button
        @click="showModal = true"
        class="p-2 border border-indigo-600 rounded-lg bg-indigo-800 text-white hover:bg-indigo-600"
      >
        {{ $t("showNumberList") }}
      </button>
    </div>

    <!-- Streak Display -->
    <div class="text-center text-gray-700 dark:text-gray-300">
      <p class="text-lg font-bold">{{ $t("currentStreak") }}: {{ streak }}</p>
      <div class="flex items-center justify-center gap-1">
        <template
          v-for="n in Math.min(streak, 10)"
          :key="`red-${n}`"
          v-if="streak < 10"
        >
          <FireIcon class="w-6 h-6 fill-rose-400" />
        </template>
        <template v-if="streak >= 10 && streak < 100">
          <FireIcon class="w-10 h-10 fill-zinc-400" />
        </template>
        <template v-if="streak >= 100 && streak < 250">
          <FireIcon class="w-14 h-14 fill-amber-400" />
        </template>
        <template v-if="streak >= 250 && streak < 500">
          <FireIcon class="w-14 h-14 fill-emerald-400" />
        </template>
        <template v-if="streak >= 500 && streak < 1000">
          <FireIcon class="w-18 h-18 fill-sky-400" />
        </template>
        <template v-if="streak >= 1000">
          <FireIcon class="w-22 h-22 fill-fuchsia-400" />
        </template>
      </div>
    </div>

    <!-- Modal -->
    <Modal
      :show="showModal"
      :title="$t('numberListTitle')"
      @close="showModal = false"
    >
      <table class="w-full text-left text-gray-700 dark:text-gray-400">
        <tr
          v-for="(item, index) in numberList"
          :key="index"
          class="border-b dark:border-gray-700 border-gray-200 w-full"
        >
          <td class="p-4 w-1/2">{{ item.value }}</td>
          <td class="p-4 w-1/2">{{ item.name }}</td>
        </tr>
      </table>
    </Modal>

    <!-- Footer -->
    <div class="w-full p-4 text-center text-gray-500 dark:text-gray-400">
      <p class="text-xs">
        {{ $t("version") }}: {{ buildNumber }} - {{ $t("builtOn") }}:
        {{ buildTimestamp }}
      </p>
    </div>
    <Toast />
  </div>
</template>

<style scoped></style>
