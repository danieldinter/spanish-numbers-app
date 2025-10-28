import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createI18n } from "vue-i18n";

// Define translations
const messages = {
  en: {
    heading: "Practice Spanish Numbers",
    mode: "Mode",
    inverse: "inverse",
    questionReverse: "What number is this in digits?",
    question: "What number is this?",
    answerPromptReverse: "Type the number in digits:",
    answerPrompt: "Type the number in Spanish words:",
    verify: "Verify",
    hintHide: "Hide hint",
    hintShow: "Show hint",
    showNumberList: "View number list",
    numberListTitle: "Number list",
    currentStreak: "Current streak",
    version: "Version",
    builtOn: "Built on",
    feedbackTitleSuccess: "Correct!",
    feedbackMessageSuccess: "You answered correctly.",
    feedbackTitleError: "Incorrect!",
    feedbackMessageError: "Right answer is: {correctAnswer}",
    placeholderDigits: "e.g. 34",
    placeholderWords: "e.g. treinta y cuatro",
  },
  es: {
    heading: "Practicar los números en español",
    mode: "Modo",
    inverse: "inverso",
    questionReverse: "¿Qué número es este en cifras?",
    question: "¿Qué número es este?",
    answerPromptReverse: "Escribe el número en cifras:",
    answerPrompt: "Escribe el número con letras:",
    verify: "Verificar",
    hintHide: "Ocultar pista",
    hintShow: "Mostrar pista",
    showNumberList: "Ver lista de números",
    numberListTitle: "Lista de números",
    currentStreak: "Racha actual",
    version: "Versión",
    builtOn: "Construido el",
    feedbackTitleSuccess: "¡Correcto!",
    feedbackMessageSuccess: "¡Buen trabajo! 👏",
    feedbackTitleError: "¡Incorrecto!",
    feedbackMessageError: "Correcto es: {correctAnswer}",
    placeholderDigits: "p. ej. 34",
    placeholderWords: "p. ej. treinta y cuatro",
  },
  de: {
    heading: "Spanische Zahlen üben",
    mode: "Modus",
    inverse: "umgekehrt",
    questionReverse: "Welche Zahl ist das in Ziffern?",
    question: "Welche Zahl ist das?",
    answerPromptReverse: "Gib die Zahl in Ziffern ein:",
    answerPrompt: "Gib die Zahl in spanischen Worten ein:",
    verify: "Überprüfen",
    hintHide: "Tipp verbergen",
    hintShow: "Tipp anzeigen",
    showNumberList: "Alle Zahlen als Liste anzeigen",
    numberListTitle: "Zahlenliste",
    currentStreak: "Aktueller Streak",
    version: "Version",
    builtOn: "vom",
    feedbackTitleSuccess: "Richtig!",
    feedbackMessageSuccess: "Gut gemacht 👏",
    feedbackTitleError: "Falsch!",
    feedbackMessageError: "Die richtige Antwort ist: {correctAnswer}",
    placeholderDigits: "z.B. 34",
    placeholderWords: "z.B. treinta y cuatro",
  },
};

const i18n = createI18n({
  locale: "es",
  messages,
});

const app = createApp(App);
app.use(i18n);
app.mount("#app");
