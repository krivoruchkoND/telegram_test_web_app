const middleTrim = (
  str: string,
  headCharsCount: number,
  tailCharsCount?: number,
  ellipsis = "...",
) => {
  if (str.length <= headCharsCount + (tailCharsCount || 0)) {
    return str;
  }
  const head = str.slice(0, headCharsCount);
  const tail = tailCharsCount ? str.slice(-tailCharsCount) : "";
  return `${head}${ellipsis}${tail}`;
};

export default middleTrim;
