export function generateRandomNumber(numberSetting = "upToThousand") {
  switch (numberSetting) {
    case "units":
      return Math.floor(Math.random() * 10);
    case "teens":
      return Math.floor(Math.random() * 10) + 10;
    case "twenties":
      return Math.floor(Math.random() * 10) + 20;
    case "tens":
      return Math.floor(Math.random() * 100);
    case "hundreds":
    default:
      break;
  }
  return Math.floor(Math.random() * 1000);
}
