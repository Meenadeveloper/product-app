const DEFAULT_CURRENCY = "QAR";

const formatNumber = (num) => {
  if (num === null || num === undefined || Number.isNaN(num)) return "";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
    num
  );
};

const extractCurrency = (text) => {
  if (!text) return "";
  const match = String(text).match(/\b[A-Z]{3}\b/);
  return match ? match[0] : "";
};

export const formatPrice = (value, options = {}) => {
  const { currency = DEFAULT_CURRENCY, withCurrency = true } = options;

  if (value === null || value === undefined || value === "") return "";

  if (typeof value === "number") {
    const formatted = formatNumber(value);
    return withCurrency ? `${currency} ${formatted}` : formatted;
  }

  const text = String(value);
  const detectedCurrency = extractCurrency(text) || currency;
  const numbers = text.match(/\d+(?:,\d{3})*(?:\.\d+)?/g) || [];
  if (numbers.length === 0) return text;

  const formattedNumbers = numbers.map((numText) => {
    const normalized = numText.replace(/,/g, "");
    const parsed = Number(normalized);
    return formatNumber(parsed);
  });

  const formatted =
    formattedNumbers.length > 1
      ? formattedNumbers.join(" - ")
      : formattedNumbers[0];

  return withCurrency ? `${detectedCurrency} ${formatted}` : formatted;
};
