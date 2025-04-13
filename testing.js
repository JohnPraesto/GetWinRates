colors = ["blue", "red", "green"]

const colorsMap = new Map([])

colors.forEach(color => {colorsMap.set(color, 1)})

console.log(colorsMap.get("blue"))
console.log(typeof colorsMap.get("blue"))
console.log(colorsMap.size)