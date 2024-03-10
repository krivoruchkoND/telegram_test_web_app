const toFixed = (value: number, fraction: number) => {
  if (Number.isInteger(value)) {
    return value.toFixed(0);
  }

  return Number(value.toFixed(fraction)) / 1;
};

const formatNumber = (
  num: number,
  precision: number,
  maximumFractionDigits = 1,
) => {
  const absValue = Math.abs(num);

  if (absValue > 10000) {
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits,
    }).format(num);
  }

  return toFixed(num, precision);
};

export default formatNumber;
