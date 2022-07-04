leftShooter.addEventListener('click', shoot)
rightShooter.addEventListener('click', shoot)

function shoot (event) {

    let target = event.target

    let activeField, yourField, activeGameCells, activeLetter, activeNumber, activeConditionArray

    if (target.id === leftShooter) {
        activeField = rightField
        yourField = leftField
        activeGameCells = rightGameCells
        activeLetter = lettersToShoot[0]
        activeNumber = numbersToShoot[0]
        activeConditionArray = conditionOfRightTD
    } else {
        activeField = leftField
        yourField = rightField
        activeGameCells = leftGameCells
        activeLetter = lettersToShoot[1]
        activeNumber = numbersToShoot[1]
        activeConditionArray = conditionOfLeftTD
    }
    
    let shootCoords = []
    //vertical coordinate
    let charArray = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    for (let i = 0; i <= charArray.length; i++) {
        if (charArray[i] === activeLetter.toString()) {
            shootCoords[0] = i
        }
    }
    //horizontal coordinate
    shootCoords[1] = parseInt(activeNumber) + 1

    //search target cell in 
    let cellCounter = 0

    for (let cell of activeGameCells) {
        cellCounter++
        if (cell === target) {

            let conditionCounter = 0

            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    conditionCounter++
                    if (conditionCounter === cellCounter) {
                        if (activeConditionArray[i][j] === 1) {
                            activeConditionArray[i][j] === 0
                            cell.classList.add('blessed')
                            alert('SHOT DOWN enemy`s ship! You have another one shot.')
                            return
                        } else {
                            yourField.style.visibility = 'hidden'
                            setInterval(() => alert('MISSED! Now your enemy shoots.'), 200)
                            setInterval(() => activeField.style.visibility = 'visible', 300)
                            return
                        }   
                    }
                }
            }
        } 
    }
}