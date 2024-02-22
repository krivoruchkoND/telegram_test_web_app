const formatBugNumbers = (value: number) => {
  const absValue = Math.abs(value);

  if (absValue === 0) {
    return 0;
  }

  if (absValue < 0.0001) {
    return value.toFixed(8);
  }

  if (absValue < 0.001) {
    return value.toFixed(6);
  }

  if (absValue < 1000) {
    return value.toFixed(3);
  }

  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};

export default formatBugNumbers;
