const DEFAULT_BACE_SPACE = 0.1
const DEFAULT_MAX_SPACE = 100
const generateDefaultSpaceValues = (baseSpace: number, max: number) => {
  const spaceObj: { [key: number]: string } = {}
  for (let i = 0; i <= max; i += 1) {
    spaceObj[i] = `${Math.round(i * baseSpace * 10) / 10}rem`
  }
  return spaceObj
}

export const customSpaceOptions = {
  space: generateDefaultSpaceValues(DEFAULT_BACE_SPACE, DEFAULT_MAX_SPACE),
}
