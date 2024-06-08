function generateNumbers() {
    // Generate random numbers between 0 and 1000
    var randomBlueNumber = Math.floor(Math.random() * 1001);
    var randomRedNumber = Math.floor(Math.random() * 1001);
    var randomGreenNumber = Math.floor(Math.random() * 1001);
    var randomCircleNumber = Math.floor(Math.random() * 1001);
    var randomTriangleNumber = Math.floor(Math.random() * 1001);
    var randomSquareNumber = Math.floor(Math.random() * 1001);

    // Fill the input fields with the generated numbers
    document.getElementById('blue-input').value = randomBlueNumber;
    document.getElementById('red-input').value = randomRedNumber;
    document.getElementById('green-input').value = randomGreenNumber;
    document.getElementById('circle-input').value = randomCircleNumber;
    document.getElementById('triangle-input').value = randomTriangleNumber;
    document.getElementById('square-input').value = randomSquareNumber;
}

function calculateSum() {
    // Get the values entered by the user
    var blueValue = parseInt(document.getElementById("blue-input").value);
    var redValue = parseInt(document.getElementById("red-input").value);
    var greenValue = parseInt(document.getElementById("green-input").value);
    var circleValue = parseInt(document.getElementById("circle-input").value);
    var triangleValue = parseInt(document.getElementById("triangle-input").value);
    var squareValue = parseInt(document.getElementById("square-input").value);
    var chequeredValue = parseInt(document.getElementById("chequered-input").value);

    // Totala antalet matcher är antalet egenskaper som finns i varje kategori gånger varandra (=X) i kvadrat minus X
    // Exempel: det finns 2 färger och 3 former.
    // 2 * 3 = 6
    // 6 * 6 = 36
    // 36 - 6 = 30
    // Behöver hämta in hur många fält som är ifyllda i varje kategori.

    // Ta fram antalet egenskaper för varje kategori
    const colorFilledInputs = countFilledInputs('color-container');
    const shapeFilledInputs = countFilledInputs('shape-container');
    const patternFilledInputs = countFilledInputs('pattern-container');

    // Ta fram antalet kombinationer av egenskaper
    var totalFeatures = colorFilledInputs * shapeFilledInputs /** patternFilledInputs*/;

    // Ta fram antal individuella möten. (Totalt antal matcher, typ)
    var totalIndividualMatches = (totalFeatures * totalFeatures) - totalFeatures;

    // Ta fram hur många matcher varje egenskap har gått.
    var totalIndividualMatchesPerColor = totalIndividualMatches / colorFilledInputs;
    var totalIndividualMatchesPerShape = totalIndividualMatches / shapeFilledInputs;
    // var totalIndividualMatchesPerPattern = totalIndividualMatches / patternFilledInputs;

    // Ta fram hur många gånger varje egenskap mött sin egen egenskap i motståndaren. (Tex Blå cirkel möter Blå kvadrat.)
    var numberOfDomesticMatchesColor = (shapeFilledInputs * shapeFilledInputs) - shapeFilledInputs;
    var numberOfDomesticMatchesShape = (colorFilledInputs * colorFilledInputs) - colorFilledInputs;
    // var numberOfDomesticMatchesPattern = (patternFilledInputs * patternFilledInputs) - patternFilledInputs;
    
    // Ta fram hur många gånger en egenskap mött andra egenskaper i samma kategori.
    var numberOfForeignMatchesColor = totalIndividualMatchesPerColor - numberOfDomesticMatchesColor;
    var numberOfForeignMatchesShape = totalIndividualMatchesPerShape - numberOfDomesticMatchesShape;
    // var numberOfForeignMatchesPattern = totalIndividualMatchesPerPattern - numberOfDomesticMatchesPattern;

    // Ta fram varje kombination av egenskapers poäng (måste göras till nån sorts array tillslut tror jag)
    var blueCirclePoints = blueValue + circleValue;
    var blueTrianglePoints = blueValue + triangleValue;
    var blueSquarePoints = blueValue + squareValue;

    var redCirclePoints = redValue + circleValue;
    var redTrianglePoints = redValue + triangleValue;
    var redSquarePoints = redValue + squareValue;

    var greenCirclePoints = greenValue + circleValue;
    var greenTrianglePoints = greenValue + triangleValue;
    var greenSquarePoints = greenValue + squareValue;

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
    makeOutput(blueTriangleWinRate, "Blå triangel: ", resultContainer2)
    makeOutput(blueSquareWinRate, "Blå kvadrat: ", resultContainer2)
    makeOutput(redCircleWinRate, "Röd cirkel: ", resultContainer2)
    makeOutput(redTriangleWinRate, "Röd triangel: ", resultContainer2)
    makeOutput(redSquareWinRate, "Röd kvadrat: ", resultContainer2)
    makeOutput(greenCircleWinRate, "Grön cirkel: ", resultContainer2)
    makeOutput(greenTriangleWinRate, "Grön triangel: ", resultContainer2)
    makeOutput(greenSquareWinRate, "Grön kvadrat: ", resultContainer2)

    // Ta fram den genomsnittliga poängen för alla fighters med en bestämd färg
    var blueAvgValue = (blueCirclePoints + blueTrianglePoints + blueSquarePoints) / colorFilledInputs;
    var redAvgValue = (redCirclePoints + redTrianglePoints + redSquarePoints) / colorFilledInputs;
    var greenAvgValue = (greenCirclePoints + greenTrianglePoints + greenSquarePoints) / colorFilledInputs;

    // Ta fram poängsumman för alla color fighters
    var colorTotalValue = blueAvgValue + redAvgValue + greenAvgValue;

    // Ta fram den genomsnittliga poängen för alla fighters med en bestämd form
    var circleAvgValue = (blueCirclePoints + redCirclePoints + greenCirclePoints) / shapeFilledInputs;
    var triangleAvgValue = (blueTrianglePoints + redTrianglePoints + greenTrianglePoints) / shapeFilledInputs;
    var squareAvgValue = (blueSquarePoints + redSquarePoints + greenSquarePoints) / shapeFilledInputs;

    // Ta fram poängsumman för alla shape fighters
    var shapeTotalValue = circleAvgValue + triangleAvgValue + squareAvgValue;

    // console.log(colorTotalValue); // de är samma ju.
    // console.log(shapeTotalValue);

    ///////// FÄRGER //////////

    var finalBlueWinRate = getWinRate(numberOfDomesticMatchesColor, numberOfForeignMatchesColor, blueAvgValue, colorTotalValue, totalIndividualMatchesPerColor, colorFilledInputs).toFixed(5);

    var finalRedWinRate = getWinRate(numberOfDomesticMatchesColor, numberOfForeignMatchesColor, redAvgValue, colorTotalValue, totalIndividualMatchesPerColor, colorFilledInputs).toFixed(5);

    var finalGreenWinRate = getWinRate(numberOfDomesticMatchesColor, numberOfForeignMatchesColor, greenAvgValue, colorTotalValue, totalIndividualMatchesPerColor, colorFilledInputs).toFixed(5);

    //////// FORMER ///////////

    var finalCircleWinRate = getWinRate(numberOfDomesticMatchesShape, numberOfForeignMatchesShape, circleAvgValue, shapeTotalValue, totalIndividualMatchesPerShape, shapeFilledInputs).toFixed(5);

    var finalTriangleWinRate = getWinRate(numberOfDomesticMatchesShape, numberOfForeignMatchesShape, triangleAvgValue, shapeTotalValue, totalIndividualMatchesPerShape, shapeFilledInputs).toFixed(5);

    var finalSquareWinRate = getWinRate(numberOfDomesticMatchesShape, numberOfForeignMatchesShape, squareAvgValue, shapeTotalValue, totalIndividualMatchesPerShape, shapeFilledInputs).toFixed(5);




    // Create new output elements for valid results
    var resultContainer = document.querySelector('.result-container');

    // Clear previous results
    resultContainer.innerHTML = '';

    // Append valid results to the result container
    makeOutput(finalBlueWinRate, "Blå: ", resultContainer);

    makeOutput(finalRedWinRate, "Röd: ", resultContainer);

    makeOutput(finalGreenWinRate, "Grön: ", resultContainer);

    makeOutput(finalCircleWinRate, "Cirkel: ", resultContainer);

    makeOutput(finalTriangleWinRate, "Triangel: ", resultContainer);

    makeOutput(finalSquareWinRate, "Kvadrat: ", resultContainer);
}

// Denna function tar fram, för varje container, antalet ifyllda input-fält
function countFilledInputs(containerClass) {
    const containers = document.querySelectorAll('.' + containerClass);
    const filledCounts = [];

    containers.forEach(container => {
        const inputs = container.querySelectorAll('input[type="number"]');
        let filledInputCount = 0;

        inputs.forEach(input => {
            if (input.value.trim() !== '') {
                filledInputCount++;
            }
        });

        filledCounts.push(filledInputCount);
    });

    return filledCounts;
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
