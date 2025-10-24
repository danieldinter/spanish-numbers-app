export function numberToSpanish(n) {
  const units = [
    "cero",
    "uno",
    "dos",
    "tres",
    "cuatro",
    "cinco",
    "seis",
    "siete",
    "ocho",
    "nueve",
  ];
  const teens = [
    "diez",
    "once",
    "doce",
    "trece",
    "catorce",
    "quince",
    "dieciséis",
    "diecisiete",
    "dieciocho",
    "diecinueve",
  ];
  const tens = [
    "",
    "diez",
    "veinte",
    "treinta",
    "cuarenta",
    "cincuenta",
    "sesenta",
    "setenta",
    "ochenta",
    "noventa",
  ];
  const twenties = [
    "veinte",
    "veintiuno",
    "veintidós",
    "veintitrés",
    "veinticuatro",
    "veinticinco",
    "veintiséis",
    "veintisiete",
    "veintiocho",
    "veintinueve",
  ];
  const hundreds = [
    "cien",
    "doscientos",
    "trescientos",
    "cuatrocientos",
    "quinientos",
    "seiscientos",
    "setecientos",
    "ochocientos",
    "novecientos",
  ];

  if (n < 10) return units[n];
  if (n < 20) return teens[n - 10];
  if (n < 30) return twenties[n - 20];
  if (n < 100) {
    const t = Math.floor(n / 10);
    const u = n % 10;
    return u === 0 ? tens[t] : `${tens[t]} y ${units[u]}`;
  }
  if (n < 1000) {
    const h = Math.floor(n / 100);
    const remainder = n % 100;
    const hundredPart = h === 1 && remainder === 0 ? "cien" : hundreds[h - 1];
    return remainder === 0
      ? hundredPart
      : `${hundredPart} ${numberToSpanish(remainder)}`;
  }
}
