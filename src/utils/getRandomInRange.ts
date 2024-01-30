function getRandomArbitrary(min: number, max: number, fixed = 2) {
  return (Math.random() * (max - min) + min).toFixed(fixed);
}

export default getRandomArbitrary;
