export function getRandom(range = 10, canBeNegative = true) {
  let negativeMulti = 1
  if (canBeNegative) {
    negativeMulti = Math.random() > 0.5 ? -1 : 1
  }
  const finalAdd = range * Math.random() * negativeMulti

  // console.log('--  finalAdd: ', finalAdd)
  return finalAdd
}
