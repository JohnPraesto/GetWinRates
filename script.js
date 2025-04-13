function orderNumbers() { // Borde gå att make DRY

    // FIGHTERS

    // Create new output elements for valid results
    var resultContainer2 = document.querySelector('.result-container2');
    var outputs = resultContainer2.getElementsByTagName('output');
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
    resultContainer2.innerHTML = '';

    // Append sorted outputs
    for (var i = 0; i < numbers.length; i++) {
        makeOutput(numbers[i].value, numbers[i].model, resultContainer2);
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
    document.getElementById('blue-points').value = randomBlueNumber;
    document.getElementById('red-points').value = randomRedNumber;
    document.getElementById('green-points').value = randomGreenNumber;
    document.getElementById('circle-points').value = randomCircleNumber;
    document.getElementById('triangle-points').value = randomTriangleNumber;
    document.getElementById('square-points').value = randomSquareNumber;

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
    // Behöver hämta in hur många fält som är ifyllda i varje kategori.

    // The size of these maps is number of inputs filled in the each container. It is used for division later on.
    // The key/value-pairs are used as points variables.
    const colorsMap = createInputMap('color-container');
    const shapesMap = createInputMap('shape-container');
    const patternsMap = createInputMap('pattern-container');

    arrayOfMaps = [colorsMap, shapesMap, patternsMap];

    // Ta fram antalet kombinationer av egenskaper
    let totalFeatures = 1; // Vad gör denna variabel matematiskt?
    arrayOfMaps.forEach(map => {
        if (map.size > 0){
            totalFeatures *= map.size;
            }
        }
    )
    console.log(totalFeatures);

    // Ta fram antal individuella möten. (Totalt antal matcher, typ)
    var totalIndividualMatches = (totalFeatures * totalFeatures) - totalFeatures;

    // Ta fram hur många matcher varje egenskap har gått.
    var totalIndividualMatchesPerColor = totalIndividualMatches / colorsMap.size;
    var totalIndividualMatchesPerShape = totalIndividualMatches / shapesMap.size;
    // var totalIndividualMatchesPerPattern = totalIndividualMatches / patternFilledInputs;

    // Ta fram hur många gånger varje egenskap mött sin egen egenskap i motståndaren. (Tex Blå cirkel möter Blå kvadrat.)
    var numberOfDomesticMatchesColor = (colorsMap.size * colorsMap.size) - colorsMap.size;
    var numberOfDomesticMatchesShape = (shapesMap.size * shapesMap.size) - shapesMap.size;
    // var numberOfDomesticMatchesPattern = (patternFilledInputs * patternFilledInputs) - patternFilledInputs;
    
    // Ta fram hur många gånger en egenskap mött andra egenskaper i samma kategori.
    var numberOfForeignMatchesColor = totalIndividualMatchesPerColor - numberOfDomesticMatchesColor;
    var numberOfForeignMatchesShape = totalIndividualMatchesPerShape - numberOfDomesticMatchesShape;
    // var numberOfForeignMatchesPattern = totalIndividualMatchesPerPattern - numberOfDomesticMatchesPattern;

    // Ta fram varje kombination av egenskapers poäng (måste göras till nån sorts array tillslut tror jag)
    var blueCirclePoints = colorsMap.get("blue-points") + shapesMap.get("circle-points");
    var blueTrianglePoints = colorsMap.get("blue-points") + shapesMap.get("triangle-points");
    var blueSquarePoints = colorsMap.get("blue-points") + shapesMap.get("square-points");

    var redCirclePoints = colorsMap.get("red-points") + shapesMap.get("circle-points");
    var redTrianglePoints = colorsMap.get("red-points") + shapesMap.get("triangle-points");
    var redSquarePoints = colorsMap.get("red-points") + shapesMap.get("square-points");

    var greenCirclePoints = colorsMap.get("green-points") + shapesMap.get("circle-points");
    var greenTrianglePoints = colorsMap.get("green-points") + shapesMap.get("triangle-points");
    var greenSquarePoints = colorsMap.get("green-points") + shapesMap.get("square-points");

    var pointsArray = [
        blueCirclePoints, blueTrianglePoints, blueSquarePoints,
        redCirclePoints, redTrianglePoints, redSquarePoints,
        greenCirclePoints, greenTrianglePoints, greenSquarePoints
    ];

    var blueCircleWinRate = getFighterWinRate(pointsArray, blueCirclePoints).toFixed(5)
    var blueTriangleWinRate = getFighterWinRate(pointsArray, blueTrianglePoints).toFixed(5)
    var blueSquareWinRate = getFighterWinRate(pointsArray, blueSquarePoints).toFixed(5)

    var redCircleWinRate = getFighterWinRate(pointsArray, redCirclePoints).toFixed(5)
    var redTriangleWinRate = getFighterWinRate(pointsArray, redTrianglePoints).toFixed(5)
    var redSquareWinRate = getFighterWinRate(pointsArray, redSquarePoints).toFixed(5)

    var greenCircleWinRate = getFighterWinRate(pointsArray, greenCirclePoints).toFixed(5)
    var greenTriangleWinRate = getFighterWinRate(pointsArray, greenTrianglePoints).toFixed(5)
    var greenSquareWinRate = getFighterWinRate(pointsArray, greenSquarePoints).toFixed(5)

    // Create new output elements for valid results
    var resultContainer2 = document.querySelector('.result-container2');

    // Clear previous results
    resultContainer2.innerHTML = '';

    makeOutput(blueCircleWinRate, "Blå cirkel: ", resultContainer2)
    makeOutput(blueTriangleWinRate, "Blå tringl: ", resultContainer2)
    makeOutput(blueSquareWinRate, "Blå kvdrat: ", resultContainer2)
    makeOutput(redCircleWinRate, "Röd cirkel: ", resultContainer2)
    makeOutput(redTriangleWinRate, "Röd tringl: ", resultContainer2)
    makeOutput(redSquareWinRate, "Röd kvdrat: ", resultContainer2)
    makeOutput(greenCircleWinRate, "Grn cirkel: ", resultContainer2)
    makeOutput(greenTriangleWinRate, "Grn tringl: ", resultContainer2)
    makeOutput(greenSquareWinRate, "Grn kvdrat: ", resultContainer2)

    // Ta fram den genomsnittliga poängen för alla fighters med en bestämd färg
    var blueAvgValue = (blueCirclePoints + blueTrianglePoints + blueSquarePoints) / colorsMap.size;
    var redAvgValue = (redCirclePoints + redTrianglePoints + redSquarePoints) / colorsMap.size;
    var greenAvgValue = (greenCirclePoints + greenTrianglePoints + greenSquarePoints) / colorsMap.size;

    // Ta fram poängsumman för alla color fighters
    var colorTotalValue = blueAvgValue + redAvgValue + greenAvgValue;

    // Ta fram den genomsnittliga poängen för alla fighters med en bestämd form
    var circleAvgValue = (blueCirclePoints + redCirclePoints + greenCirclePoints) / shapesMap.size;
    var triangleAvgValue = (blueTrianglePoints + redTrianglePoints + greenTrianglePoints) / shapesMap.size;
    var squareAvgValue = (blueSquarePoints + redSquarePoints + greenSquarePoints) / shapesMap.size;

    // Ta fram poängsumman för alla shape fighters
    var shapeTotalValue = circleAvgValue + triangleAvgValue + squareAvgValue;

    // console.log(colorTotalValue); // de är samma ju.
    // console.log(shapeTotalValue);

    ///////// FÄRGER //////////

    var finalBlueWinRate = getWinRate(numberOfDomesticMatchesColor, numberOfForeignMatchesColor, blueAvgValue, colorTotalValue, totalIndividualMatchesPerColor, colorsMap.size).toFixed(5);

    var finalRedWinRate = getWinRate(numberOfDomesticMatchesColor, numberOfForeignMatchesColor, redAvgValue, colorTotalValue, totalIndividualMatchesPerColor, colorsMap.size).toFixed(5);

    var finalGreenWinRate = getWinRate(numberOfDomesticMatchesColor, numberOfForeignMatchesColor, greenAvgValue, colorTotalValue, totalIndividualMatchesPerColor, colorsMap.size).toFixed(5);

    //////// FORMER ///////////

    var finalCircleWinRate = getWinRate(numberOfDomesticMatchesShape, numberOfForeignMatchesShape, circleAvgValue, shapeTotalValue, totalIndividualMatchesPerShape, shapesMap.size).toFixed(5);

    var finalTriangleWinRate = getWinRate(numberOfDomesticMatchesShape, numberOfForeignMatchesShape, triangleAvgValue, shapeTotalValue, totalIndividualMatchesPerShape, shapesMap.size).toFixed(5);

    var finalSquareWinRate = getWinRate(numberOfDomesticMatchesShape, numberOfForeignMatchesShape, squareAvgValue, shapeTotalValue, totalIndividualMatchesPerShape, shapesMap.size).toFixed(5);




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
    // console.log(inputsMap.size);
    return inputsMap;
}

function getWinRate(numberOfDomesticMatches, numberOfForeignMatches, myValue, categoryAvgValue, totalIndividualMatchesPerShape, categoryFilledInputs){

    var totalWinSumSquareDomesticMatches = numberOfDomesticMatches * 0.5;
    var totalWinSumSquareForeignMatches = numberOfForeignMatches * (myValue/(myValue + (categoryAvgValue-myValue)/(categoryFilledInputs-1)));
    var finalWinRate = (totalWinSumSquareDomesticMatches + totalWinSumSquareForeignMatches) / totalIndividualMatchesPerShape;

    return finalWinRate;
}

function getFighterWinRate(pointsArray, fighterPoints){
    var sum = 0;
    var fighterIndex = pointsArray.indexOf(fighterPoints);
    pointsArray.forEach((element, index) => {
        if(index != fighterIndex){
            sum += fighterPoints / (element + fighterPoints);
        };
    });
    var dividedSum = sum / (pointsArray.length - 1);
    return dividedSum;
}

function makeOutput(numbers, model, resultContainer){
    if (!isNaN(numbers)) {
        var output = document.createElement('output');
        output.textContent = model + numbers;
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
