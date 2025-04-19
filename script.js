function orderNumbers() { // Borde gå att make DRY

    // FIGHTERS

    // Create new output elements for valid results
    var individualsContainer = document.querySelector('.individuals-container');
    var outputs = individualsContainer.getElementsByTagName('output');
    var numbers = [];

    // Collect the numbers from the outputs
    for (var i = 0; i < outputs.length; i++) {
        var text = outputs[i].textContent;
        var number = parseInt(text.match(/\d+/)[0]); // Extract the number
        numbers.push({ model: text.replace(number, '').trim(), value: number });
    }

    // Sort the numbers in descending order
    numbers.sort(function(a, b) {
        return b.value - a.value;
    });

    // Clear previous results
    individualsContainer.innerHTML = '';

    // Append sorted outputs
    for (var i = 0; i < numbers.length; i++) {
        makeOutput(numbers[i].value, numbers[i].model, individualsContainer);
    }

    // COLOR //

    // Create new output elements for valid results
    resultContainer = document.querySelector('.result-category-color');
    outputs = resultContainer.getElementsByTagName('output');
    numbers = [];

    // Collect the numbers from the outputs
    for (var i = 0; i < outputs.length; i++) {
        var text = outputs[i].textContent;
        var number = parseInt(text.match(/\d+/)[0]); // Extract the number
        numbers.push({ model: text.replace(number, '').trim(), value: number });
    }

    // Sort the numbers in descending order
    numbers.sort(function(a, b) {
        return b.value - a.value;
    });

    // Clear previous results
    resultContainer.innerHTML = '';

    // Append sorted outputs
    for (var i = 0; i < numbers.length; i++) {
        makeOutput(numbers[i].value, numbers[i].model, resultContainer);
    }

    // Gör en array som bara består av numrena från numbers-arrayen
    values = numbers.map(function(element) {
        return element.value;
    });
    // Det högsta minus det minsta värdet gör variationsbredden på procenten för color
    var highestValue = Math.max(...values);
    var lowestValue = Math.min(...values);
    var procentWidth = highestValue - lowestValue;
    resultContainer = document.querySelector('#color-wide-id');
    resultContainer.innerHTML = '';
    makeOutput(procentWidth, "Bredd: ", document.querySelector('#color-wide-id'));

    // SHAPES

    // Create new output elements for valid results
    resultContainer = document.querySelector('.result-category-shape');
    outputs = resultContainer.getElementsByTagName('output');
    numbers = [];

    // Collect the numbers from the outputs
    for (var i = 0; i < outputs.length; i++) {
        var text = outputs[i].textContent;
        var number = parseInt(text.match(/\d+/)[0]); // Extract the number
        numbers.push({ model: text.replace(number, '').trim(), value: number });
    }

    // Sort the numbers in descending order
    numbers.sort(function(a, b) {
        return b.value - a.value;
    });

    // Clear previous results
    resultContainer.innerHTML = '';

    // Append sorted outputs
    for (var i = 0; i < numbers.length; i++) {
        makeOutput(numbers[i].value, numbers[i].model, resultContainer);
    }

    // Gör en array som bara består av numrena från numbers-arrayen
    values = numbers.map(function(element) {
        return element.value;
    });
    // Det högsta minus det minsta värdet gör variationsbredden på procenten för color
    highestValue = Math.max(...values);
    lowestValue = Math.min(...values);
    procentWidth = highestValue - lowestValue;
    resultContainer = document.querySelector('#shape-wide-id');
    resultContainer.innerHTML = '';
    makeOutput(procentWidth, "Bredd: ", document.querySelector('#shape-wide-id'));
    
}

function generateNumbers() {
    // Generate random numbers between 0 and 1000
    var randomBlueNumber = Math.floor(Math.random() * 1001);
    var randomRedNumber = Math.floor(Math.random() * 1001);
    var randomGreenNumber = Math.floor(Math.random() * 1001);
    var randomCircleNumber = Math.floor(Math.random() * 1001);
    var randomTriangleNumber = Math.floor(Math.random() * 1001);
    var randomSquareNumber = Math.floor(Math.random() * 1001);

    // Fill the input fields with the generated numbers
    document.getElementById('Blue').value = randomBlueNumber;
    document.getElementById('Red').value = randomRedNumber;
    document.getElementById('Green').value = randomGreenNumber;
    document.getElementById('Circle').value = randomCircleNumber;
    document.getElementById('Triangle').value = randomTriangleNumber;
    document.getElementById('Square').value = randomSquareNumber;

    // Lägger de slumpade numrena i en array
    const colorsArray = [randomBlueNumber, randomRedNumber, randomGreenNumber];
    const shapeArray = [randomCircleNumber, randomTriangleNumber, randomSquareNumber];

    document.getElementById('color-average-box').value = ((randomBlueNumber + randomRedNumber + randomGreenNumber) / 3).toFixed(0);
    document.getElementById('shape-average-box').value = ((randomCircleNumber + randomTriangleNumber + randomSquareNumber) / 3).toFixed(0);
    document.getElementById('color-wide-box').value = Math.max(...colorsArray)-Math.min(...colorsArray);
    document.getElementById('shape-wide-box').value = Math.max(...shapeArray)-Math.min(...shapeArray);
}

function calculateSum() {

    // Totala antalet matcher är antalet egenskaper som finns i varje kategori gånger varandra (=X) i kvadrat minus X
    // Exempel: det finns 2 färger och 3 former.
    // 2 * 3 = 6
    // 6 * 6 = 36
    // 36 - 6 = 30

    // The size of these maps is number of inputs filled in the each container. It is used for division later on.
    // The key/value-pairs are used as points variables.
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

    // Ta fram antalet kombinationer av egenskaper
    let totalIndividuals = mapOfIndividualsPoints.size; // Vad gör denna variabel matematiskt? // hette tidigare totalFeatures

    // Ta fram antal individuella möten. (Totalt antal matcher, typ)
    let totalIndividualMatches = (totalIndividuals * totalIndividuals) - totalIndividuals;

    // Ta fram hur många matcher varje egenskap har gått.
    let totalIndividualMatchesPerColor = totalIndividualMatches / colorsMap.size;
    let totalIndividualMatchesPerShape = totalIndividualMatches / shapesMap.size;
    let totalIndividualMatchesPerPattern = totalIndividualMatches / patternsMap.size;

    // Ta fram hur många gånger varje egenskap mött sig själv i motståndaren. (Tex BLÅ cirkel möter BLÅ kvadrat.)
    let numberOfDomesticMatchesColor = (colorsMap.size * colorsMap.size) - colorsMap.size;
    let numberOfDomesticMatchesShape = (shapesMap.size * shapesMap.size) - shapesMap.size;
    let numberOfDomesticMatchesPattern = (patternsMap.size * patternsMap.size) - patternsMap.size;
    
    // Ta fram hur många gånger en egenskap mött andra egenskaper i samma kategori.
    let numberOfForeignMatchesColor = totalIndividualMatchesPerColor - numberOfDomesticMatchesColor;
    let numberOfForeignMatchesShape = totalIndividualMatchesPerShape - numberOfDomesticMatchesShape;
    let numberOfForeignMatchesPattern = totalIndividualMatchesPerPattern - numberOfDomesticMatchesPattern;
    
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
    var individualsContainer = document.querySelector('.individuals-container');

    // Clear previous results
    individualsContainer.innerHTML = '';

    mapOfIndividualsWinRate.forEach((value, key) => {
        makeOutput(value, key, individualsContainer)
    })

    // Använd de maps som finns i arrayOfMaps.
    // Typ for each key som finns i varje map (tex colorsMap), ta alla poäng från keys i mapOfIndividualsPoints
    // som delar namn med aktuell key (.includes), addera ihop alla.
    // Sen dela summan med size för aktulle map.
    // Och den summan läggs som value i en ny map? Där key är namnet på den aktuella keyn från arrayOfMaps.
    // Ta fram den genomsnittliga poängen för alla fighters med en bestämd färg
    let blueAvgValue = getAvgValue(mapOfIndividualsPoints, "Blue", colorsMap.size);
    var redAvgValue = getAvgValue(mapOfIndividualsPoints, "Red", colorsMap.size);
    var greenAvgValue = getAvgValue(mapOfIndividualsPoints, "Green", colorsMap.size);

    // Ta fram poängsumman för alla color fighters
    var colorTotalValue = blueAvgValue + redAvgValue + greenAvgValue;

    // Ta fram den genomsnittliga poängen för alla fighters med en bestämd form
    var circleAvgValue = getAvgValue(mapOfIndividualsPoints, "Circle", shapesMap.size);
    var triangleAvgValue = getAvgValue(mapOfIndividualsPoints, "Triangle", shapesMap.size);
    var squareAvgValue = getAvgValue(mapOfIndividualsPoints, "Square", shapesMap.size);

    // Ta fram poängsumman för alla shape fighters
    var shapeTotalValue = circleAvgValue + triangleAvgValue + squareAvgValue;

    // console.log(colorTotalValue); // de är samma ju.
    // console.log(shapeTotalValue);

    ///////// FÄRGER //////////

    var finalBlueWinRate = getWinRate(numberOfDomesticMatchesColor, numberOfForeignMatchesColor, blueAvgValue, colorTotalValue, totalIndividualMatchesPerColor, colorsMap.size);

    var finalRedWinRate = getWinRate(numberOfDomesticMatchesColor, numberOfForeignMatchesColor, redAvgValue, colorTotalValue, totalIndividualMatchesPerColor, colorsMap.size);

    var finalGreenWinRate = getWinRate(numberOfDomesticMatchesColor, numberOfForeignMatchesColor, greenAvgValue, colorTotalValue, totalIndividualMatchesPerColor, colorsMap.size);

    //////// FORMER ///////////

    var finalCircleWinRate = getWinRate(numberOfDomesticMatchesShape, numberOfForeignMatchesShape, circleAvgValue, shapeTotalValue, totalIndividualMatchesPerShape, shapesMap.size);

    var finalTriangleWinRate = getWinRate(numberOfDomesticMatchesShape, numberOfForeignMatchesShape, triangleAvgValue, shapeTotalValue, totalIndividualMatchesPerShape, shapesMap.size);

    var finalSquareWinRate = getWinRate(numberOfDomesticMatchesShape, numberOfForeignMatchesShape, squareAvgValue, shapeTotalValue, totalIndividualMatchesPerShape, shapesMap.size);




    // Create new output elements for valid results
    var resultContainer = document.querySelector('.result-category-color');

    // Clear previous results
    resultContainer.innerHTML = '';

    // Append valid results to the result container
    makeOutput(finalBlueWinRate, "_____Blå: ", resultContainer);

    makeOutput(finalRedWinRate, "_____Röd: ", resultContainer);

    makeOutput(finalGreenWinRate, "____Grön: ", resultContainer);


    // Create new output elements for valid results
    var resultContainer = document.querySelector('.result-category-shape');

    // Clear previous results
    resultContainer.innerHTML = '';

    makeOutput(finalCircleWinRate, "__Cirkel: ", resultContainer);

    makeOutput(finalTriangleWinRate, "Triangel: ", resultContainer);

    makeOutput(finalSquareWinRate, "_Kvadrat: ", resultContainer);
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
                inputsMap.set(input.id, parseInt(input.value))
            }
        });
    });
    return inputsMap;
}

function combineMaps(arrayOfMaps) {
    const result = new Map();

    function recurse(index, currentKey, currentValue) {
        if (index === arrayOfMaps.length) {
            result.set(currentKey, currentValue);
            return;
        }

        const currentMap = arrayOfMaps[index];
        for (const [key, value] of currentMap) {
            recurse(index + 1, currentKey + key, currentValue + value);
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

function getWinRate(numberOfDomesticMatches, numberOfForeignMatches, myValue, categoryAvgValue, totalIndividualMatchesPerShape, categoryFilledInputs){

    var totalWinSumSquareDomesticMatches = numberOfDomesticMatches * 0.5;
    var totalWinSumSquareForeignMatches = numberOfForeignMatches * (myValue/(myValue + (categoryAvgValue-myValue)/(categoryFilledInputs-1)));
    var finalWinRate = (totalWinSumSquareDomesticMatches + totalWinSumSquareForeignMatches) / totalIndividualMatchesPerShape;
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

function makeOutput(numbers, model, resultContainer){
    const numbersForOutput = numbers.toFixed(5)
    if (!isNaN(numbersForOutput)) {
        var output = document.createElement('output');
        output.textContent = model + numbersForOutput;
        resultContainer.appendChild(output);
    }
}



// blå + röd totalWR blir inte 100%. varför? ok är det ok eller inte?

// ett lättare sätt att ta fram rätt win rate?:
// ta avg blå spelare poäng och avg röd spelares poäng, plussa, dela blå spelare med röd+blå spelare
// multiplicera med hur många matcher blå och röd mött varandra = X
// gör samma sak med blå matcherna (blir ju 50% gånger så många matcher de mötts) = Y
// sen ta X+Y delat på totalt antal matcher = WR för färgen

// avg blue = 77
// avg red = 57
// 77 + 57 = 134
// 77 / 134 = 0.5746
// 0.5746 * 9 = 5.17 (men hur ska jag veta hur många gåner en blå spelare mött en röd(/en spelare av en annan färg. Går det att använda avg av alla andra färger här?)?)
// Och hur räknar man ut hur många gånger blå har mött sig själv. ! SÅ MÅNGA former det finns i kvadrat minus så många former det finns.
// Så der behövs alltså här typ en siffra för hur många andra fält förutom färg det finns som är ifyllda. That is the number that needs to
// be squared and then minus it self.
// Att räkna ut hur många matcher en färg mött andra färger (räknar med endast en färg nu, kan va annorlunda med fler färger) är samma sak förutom minus-delen.
// Alltså antalet former i kvadrat bara.
// 0.5 * 6 = 3
// 5.17 + 3 = 8.17
// 8.17 / (9+6) = 0.5446

/*

Det totala antalet individuella möten är (antalet egenskaper multiplicerade med varandra) i kvadrat minus samma antal
alltså har jag 2 färger och 3 former så multiplicerar jag 3 och 2 = 6 (6 är antalet rader i tabellen, antalet kombinationer av egenskaper)
Så tar vi 6 i kvadrat = 36 och sen minus 6 = 30. 30 är antalet individuella matchups.
För att räkna ut hur totalt många möten en egenskap har tar du antalet egenskaper i den kategorin delat på totalt antal matcher.
Tex om vi vill se hur många matcher en form har gått så tar vi 30 / 3 = 10. En form har haft 10 möten.
Färg: 2 / 30, en färg har haft 15 möten.

För att räkna ut hur många gånger en form har mött sig själv:
Ta antalet andra egenskaper det finns i kvadrat minus samma antal.
För att räkna ut hur många gånger en form har mött andra former:
Ta detta antal och subtrahera från formens totala antal matcher.

*/
