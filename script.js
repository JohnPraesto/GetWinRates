function orderNumbers() {
    const containers = [
        {
            container: document.querySelector('.individual-results-grid'),
            widthContainer: null
        },
        {
            container: document.querySelector('.property-results-grid'),
            widthContainer: null
        }
    ];

    containers.forEach(({container}) => {
        if (!container) return;

        const pairs = [];
        const keySpans = container.querySelectorAll('.property-key');
        const valueSpans = container.querySelectorAll('.property-value');

        keySpans.forEach((keySpan, i) => {
            const value = parseFloat(valueSpans[i].textContent);
            pairs.push({
                key: keySpan.textContent,
                value: value
            });
        });

        pairs.sort((a, b) => b.value - a.value);

        container.innerHTML = '';

        pairs.forEach(pair => {
            makeOutput(pair.value, pair.key, container);
        });
    });
}

function generateNumbers() {
    var randomBlueNumber = Math.floor(Math.random() * 1001);
    var randomRedNumber = Math.floor(Math.random() * 1001);
    var randomGreenNumber = Math.floor(Math.random() * 1001);
    var randomCircleNumber = Math.floor(Math.random() * 1001);
    var randomTriangleNumber = Math.floor(Math.random() * 1001);
    var randomSquareNumber = Math.floor(Math.random() * 1001);
    var randomChequeredNumber = Math.floor(Math.random() * 1001);
    var randomStripedNumber = Math.floor(Math.random() * 1001);
    var randomDottedNumber = Math.floor(Math.random() * 1001);

    // Fill the input fields with the generated numbers
    document.getElementById('Blue').value = randomBlueNumber;
    document.getElementById('Red').value = randomRedNumber;
    document.getElementById('Green').value = randomGreenNumber;
    document.getElementById('Circle').value = randomCircleNumber;
    document.getElementById('Triangle').value = randomTriangleNumber;
    document.getElementById('Square').value = randomSquareNumber;
    document.getElementById('Chequered').value = randomChequeredNumber;
    document.getElementById('Striped').value = randomStripedNumber;
    document.getElementById('Dotted').value = randomDottedNumber;

    // Lägger de slumpade numrena i en array
    const colorsArray = [randomBlueNumber, randomRedNumber, randomGreenNumber];
    const shapeArray = [randomCircleNumber, randomTriangleNumber, randomSquareNumber];
    const patternsArray = [randomChequeredNumber, randomStripedNumber, randomDottedNumber];
    // Dessa sa la synas i textboxen när man trycker kör
    // kan det vara att bara flytta dessa till calculateSum()?
    document.getElementById('color-average-box').value = ((randomBlueNumber + randomRedNumber + randomGreenNumber) / 3).toFixed(0);
    document.getElementById('shape-average-box').value = ((randomCircleNumber + randomTriangleNumber + randomSquareNumber) / 3).toFixed(0);
    document.getElementById('pattern-average-box').value = ((randomChequeredNumber + randomStripedNumber + randomDottedNumber) / 3).toFixed(0);
    document.getElementById('color-wide-box').value = Math.max(...colorsArray)-Math.min(...colorsArray);
    document.getElementById('shape-wide-box').value = Math.max(...shapeArray)-Math.min(...shapeArray);
    document.getElementById('pattern-wide-box').value = Math.max(...patternsArray)-Math.min(...patternsArray);
}

function calculateSum() {

    // Totala antalet matcher är antalet egenskaper som finns i varje kategori gånger varandra (=X) i kvadrat minus X
    // Exempel: det finns 2 färger och 3 former.
    // 2 * 3 = 6
    // 6 * 6 = 36
    // 36 - 6 = 30

    // The size of these maps is number of inputs filled in the each container. It is used for division later on.
    // The key/value-pairs are used as points variables.
    // Göra så att varje map i arrayOfMaps, deras values är en lista istället för en int.
    // Key är The name of the Property
    // Value är en lista med [Propertyns poäng, totalIndividualMatches, numberOfDomesticMatches, numberOfForeignMatches, propertyns avg poäng]
    // Dessa variabler åker med och tar fram winraten, vilken appendas till listan.
    // Det blir som ett objekt nästan.
    const colorsMap = createInputMap('color-container');
    const shapesMap = createInputMap('shape-container');
    const patternsMap = createInputMap('pattern-container');

    arrayOfMaps = [];
    if (colorsMap.size > 0) arrayOfMaps.push(colorsMap);
    if (shapesMap.size > 0) arrayOfMaps.push(shapesMap);
    if (patternsMap.size > 0) arrayOfMaps.push(patternsMap);

    // Ta fram varje kombination av egenskapers (varje individs) poäng
    // This is a map of each individual. Each key is one individual.
    // The values are the added up properties that builds up that individual.
    // For example, one individual constitutes blue circle dotted.
    // The key name is blue-circle-dotted (kind of)
    // And the value is blue points plus circle points plus dotted points.
    const mapOfIndividualsPoints = combineMaps(arrayOfMaps);
    console.log(mapOfIndividualsPoints);

    // Ta fram antalet kombinationer av egenskaper
    let totalIndividuals = mapOfIndividualsPoints.size;

    // Ta fram antal individuella möten. (Totalt antal matcher, typ)
    let totalMatches = ((totalIndividuals * totalIndividuals) - totalIndividuals) / 2
    console.log("totalIndividualMatches: " + totalMatches);

    // Value är en lista med [Propertyns poäng, totalPropertyMatches, numberOfDomesticMatches, numberOfForeignMatches, avgPropertyPoints, categoryTotalValue, propertyns winrate]
    arrayOfMaps.forEach((map)=> {
        // Ta fram hur många matcher varje property har gått. (Tex hur ånga gånger har en blå egenskap vart med i en match)
        let totalPropertyMatches = (totalMatches*2) / map.size;
        console.log("totalPropertyMatches: " + totalPropertyMatches);
        // Ta fram hur många gånger varje egenskap mött sig själv i motståndaren. (Tex BLÅ cirkel möter BLÅ kvadrat.)
        let splits = totalIndividuals / map.size;
        let numberOfDomesticMatches = (splits * splits) - splits; 
        // Ta fram hur många gånger en egenskap mött andra egenskaper i samma kategori. (Mött inte sig själv)
        let numberOfForeignMatches = totalPropertyMatches - numberOfDomesticMatches;
        // let categoryTotalValue = 0;
        // map.forEach((value, key) => {
        //     categoryTotalValue += value[0];
        // })
        map.forEach((value, key) => {
            map.get(key).push(totalPropertyMatches);
            map.get(key).push(numberOfDomesticMatches);
            map.get(key).push(numberOfForeignMatches);
            // map.get(key).push(categoryTotalValue); // /map-size
        })
    })
    
    // Every individual is to be matched with every other individual.
    // The individuals win rate agains another individual is
    // this individuals points divided by this individuals points plus the other individuals points.
    // When doing this against all other individuals, and dividing by the number of other individuals,
    // you get the average win rate for this individual.
    const mapOfIndividualsWinRate = new Map([])
    mapOfIndividualsPoints.forEach((myPoints, myKey) => {
        let totalWinRate = 0;
        mapOfIndividualsPoints.forEach((opponentPoints, opponentKey) => {
            if (myKey !== opponentKey) {
                const winRate = myPoints / (myPoints + opponentPoints);
                totalWinRate += winRate;
            }
        });
        const averageWinRate = totalWinRate / (mapOfIndividualsPoints.size - 1);
        mapOfIndividualsWinRate.set(myKey, averageWinRate);
    });

    // Create new output elements for valid results
    // var individualsContainer = document.querySelector('.individuals-container');
    var individualsContainer = document.querySelector('.individual-results-grid');

    // Clear previous results
    individualsContainer.innerHTML = '';
    individualsContainer.scrollTop = 0;

    mapOfIndividualsWinRate.forEach((value, key) => {
        makeOutput(value, key, individualsContainer)
    })

    // For each map som finns i arrayOfMaps.
    // For each key som finns i varje map (tex colorsMap),
    // ta alla poäng från keys i mapOfIndividualsPoints
    // som delar namn med aktuell key (.includes), addera ihop alla.
    // Sen dela summan med size för aktulle map.
    // Och den summan läggs som value i en ny map? Där key är namnet på den aktuella keyn från arrayOfMaps.
    // Ta fram den genomsnittliga poängen för alla fighters med en bestämd färg
    // Value är en lista med [Propertyns poäng, totalPropertyMatches, numberOfDomesticMatches, numberOfForeignMatches, avgPropertyPoints, categoryTotalValue, propertyns winrate]
    arrayOfMaps.forEach((map) => {
        map.forEach((value, key) => {
            let points = 0;
            mapOfIndividualsPoints.forEach((pointsValue, pointsKey) => {
                if (pointsKey.includes(key)) {
                    points += pointsValue;
                }
            })
            let avgPropertyPoints = points / map.size;
            map.get(key).push(avgPropertyPoints);
        })
    });

    arrayOfMaps.forEach((map) => {
        let mapsum = 0;
        map.forEach((value, key) => {
            mapsum += value[4];
        })
        map.forEach((value, key) => {
            map.get(key).push(mapsum);
        })
    });

    console.log(arrayOfMaps);


// function getWinRate(numberOfDomesticMatches, numberOfForeignMatches, avgPropertyPoints, categoryTotalValue, totalIndividualMatchesPerShape, categoryFilledInputs)
// Value är en lista med [Propertyns poäng, totalPropertyMatches, numberOfDomesticMatches, numberOfForeignMatches, avgPropertyPoints, categoryTotalValue, propertyns winrate]
    arrayOfMaps.forEach((map) => {
        map.forEach((value,key) => {
            let winrate = getWinRate(value[2], value[3], value[4], value[5], value[1], map.size);
            map.get(key).push(winrate);
        })
    });

    // Create new output elements for valid results
    // var propertyContainer = document.querySelector('.property-results-names');
    var propertyContainer = document.querySelector('.property-results-grid');

    // Clear previous results
    propertyContainer.innerHTML = '';

    arrayOfMaps.forEach((map) => {
        map.forEach((value, key) => {
            makeOutput(value[6], key, propertyContainer)})
    })
}

// This function creates, for each container, a map where each key
// is the name of the id of the input field and the value is the value of that input field
function createInputMap(containerClass) {
    const containers = document.querySelectorAll('.' + containerClass);
    const inputsMap = new Map([])

    containers.forEach(container => {
        const inputs = container.querySelectorAll('input[type="number"]');

        inputs.forEach(input => {
            if (input.value.trim() !== '') {
                inputsMap.set(input.id, [parseInt(input.value)])
            }
        });
    });
    return inputsMap;
}

// Creates each individual (number of properties square. nej?)
// It combines each property with all other properties from other categories.
// Like BlueCircleDotted, BlueCircleStriped, etc.
function combineMaps(arrayOfMaps) {
    const result = new Map();

    function recurse(index, currentKey, currentValue) {
        if (index === arrayOfMaps.length) {
            result.set(currentKey, currentValue);
            return;
        }

        const currentMap = arrayOfMaps[index];
        for (const [key, value] of currentMap) {
            recurse(index + 1, currentKey + key, currentValue + value[0]);
        }
    }

    if (arrayOfMaps.length > 0) {
        recurse(0, '', 0);
    }

    return result;
}

function getAvgValue(mapOfIndividualsPoints, id, size){
    let avgValue = 0;
    mapOfIndividualsPoints.forEach((value, key) => {
        if (key.includes(id)){
            avgValue += value;
        }
    })
    return avgValue / size;
}

function getWinRate(numberOfDomesticMatches, numberOfForeignMatches, avgPropertyPoints, categoryAvgValue, totalIndividualMatchesPerType, categoryFilledInputs){

    let totalWinSumSquareDomesticMatches = numberOfDomesticMatches * 0.5;
    let totalWinSumSquareForeignMatches = numberOfForeignMatches * (avgPropertyPoints/(avgPropertyPoints + (categoryAvgValue-avgPropertyPoints)/(categoryFilledInputs-1)));
    let finalWinRate = (totalWinSumSquareDomesticMatches + totalWinSumSquareForeignMatches) / totalIndividualMatchesPerType;
    return finalWinRate;
}

function getIndividualWinRateOld(pointsArray, individualPoints){
    let sum = 0;
    let individualIndex = pointsArray.indexOf(individualPoints);
    pointsArray.forEach((element, index) => {
        if(index != individualIndex){
            sum += individualPoints / (element + individualPoints);
        };
    });
    let dividedSum = sum / (pointsArray.length - 1);
    return dividedSum;
}

// function makeOutput(numbers, model, resultContainer){
//     const numbersForOutput = numbers.toFixed(5)
//     if (!isNaN(numbersForOutput)) {
//         var output = document.createElement('output');
//         output.textContent = model + numbersForOutput;
//         resultContainer.appendChild(output);
//     }
// }

function makeOutput(numbers, model, resultContainer) {
    const numbersForOutput = numbers.toFixed(5);
    if (!isNaN(numbersForOutput)) {
        const keySpan = document.createElement('span');
        keySpan.className = 'property-key';
        keySpan.textContent = model;
        
        const valueSpan = document.createElement('span');
        valueSpan.className = 'property-value';
        valueSpan.textContent = numbersForOutput;
        
        resultContainer.appendChild(keySpan);
        resultContainer.appendChild(valueSpan);
    }
}


// ett lättare sätt att ta fram rätt win rate?:
// ta avg blå spelare poäng och avg röd spelares poäng, plussa, dela blå spelare med röd+blå spelare
// multiplicera med hur många matcher blå och röd mött varandra = X
// gör samma sak med blå matcherna (blir ju 50% gånger så många matcher de mötts) = Y
// sen ta X+Y delat på totalt antal matcher = WR för färgen

// avg blue = 77
// avg red = 57
// 77 + 57 = 134
// 77 / 134 = 0.5746
// 0.5746 * 9 = 5.17 (men hur ska jag veta hur många gåner en blå spelare mött en röd(/en spelare av en annan färg. 
// Går det att använda avg av alla andra färger här?)?)
// Och hur räknar man ut hur många gånger blå har mött sig själv. 
// ! SÅ MÅNGA former det finns i kvadrat minus så många former det finns.
// Så det behövs alltså här typ en siffra för hur många andra fält förutom färg det finns som är ifyllda. 
// That is the number that needs to be squared and then minus it self.
// Att räkna ut hur många matcher en färg mött andra färger 
// (räknar med endast en färg nu, kan va annorlunda med fler färger) 
// är samma sak förutom minus-delen.
// Alltså antalet former i kvadrat bara.
// 0.5 * 6 = 3
// 5.17 + 3 = 8.17
// 8.17 / (9+6) = 0.5446

/*

Det totala antalet individuella möten är (antalet egenskaper multiplicerade med varandra) i kvadrat minus samma antal
alltså har jag 2 färger och 3 former så multiplicerar jag 3 och 2 = 6 
(6 är antalet rader i tabellen, antalet kombinationer av egenskaper)
Så tar vi 6 i kvadrat = 36 och sen minus 6 = 30. 30 är antalet individuella matchups.
För att räkna ut hur totalt många möten en egenskap har tar du antalet egenskaper i den kategorin delat på totalt antal matcher.
Tex om vi vill se hur många matcher en form har gått så tar vi 30 / 3 = 10. En form har haft 10 möten.
Färg: 2 / 30, en färg har haft 15 möten.

För att räkna ut hur många gånger en form har mött sig själv:
Ta antalet andra egenskaper det finns i kvadrat minus samma antal.
För att räkna ut hur många gånger en form har mött andra former:
Ta detta antal och subtrahera från formens totala antal matcher.

*/
