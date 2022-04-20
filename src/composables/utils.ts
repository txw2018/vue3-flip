export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const shuffle = (arr: any[]) => {
  const ret = arr.slice()
  for (let i = 0; i < ret.length; i++) {
    const j = getRandomInt(0, i)
    const t = ret[i]
    ret[i] = ret[j]
    ret[j] = t
  }
  return ret
}

export const preload = (imgs: any[]): Promise<void> => {
  return new Promise((resolve) => {
    if (!imgs.length)
      resolve()

    const length = imgs.length
    let count = 0

    const load = (src: string) => {
      const img = new Image()
      const checkIfFinished = () => {
        count++
        if (count === length)
          resolve()
      }

      img.onload = checkIfFinished
      img.onerror = checkIfFinished

      img.src = src
    }
    imgs.forEach(load)
  })
}
