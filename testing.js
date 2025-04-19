colors = ["blue", "red", "green"]

const colorsMap = new Map([])

colors.forEach(color => {colorsMap.set(color, 1)})

console.log(colorsMap.get("blue"))
console.log(colors[0])
console.log(typeof colorsMap.get("blue"))
console.log(colorsMap.size)

const mapKeys = Array.from(colorsMap.keys()).join('');
console.log(mapKeys)

colorsMap.forEach((value, key) => {
  console.log(key)
})

let blue = "blue"
let red = "red"
let green = "green"

let blueredgreen = blue.concat(red, green)
console.log(blueredgreen);

// let string = "BlueRedGreen"

// if (string.includes("Blue")) {
//   console.log("Blue is in the string")
// }