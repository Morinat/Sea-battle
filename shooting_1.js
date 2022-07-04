function shoot (event) {
    let target = event.target
    if (target.tagName != 'TD') return

    let activeEnemyCells, activeField, yourField, activeGameCells, activeLetter, activeNumber, activeConditionArray, activeEnemyField, activeSide, notActiveSide

    if (target.classList.contains('left')) {
        console.log('active left')
        activeEnemyCells = document.getElementById('rightField').getElementsByClassName('gameCell right')
        activeField = rightField
        yourField = leftField
        activeGameCells = rightGameCells
        activeLetter = lettersToShoot[0]
        activeNumber = numbersToShoot[0]
        activeConditionArray = conditionOfRightTD
        activeEnemyField = leftEnemyField
        activeSide = inWraperLeft
        notActiveSide = inWraperRight
    } else {
        console.log('active right')
        activeEnemyCells = document.getElementById('leftField').getElementsByClassName('gameCell left')
        activeField = leftField
        yourField = rightField
        activeGameCells = leftGameCells
        activeLetter = lettersToShoot[1]
        activeNumber = numbersToShoot[1]
        activeConditionArray = conditionOfLeftTD
        activeEnemyField = rightEnemyField
        activeSide = inWraperRight
        notActiveSide = inWraperLeft
    }

    let cellCoords = target.classList[0]
    cellCoords.match(/\d+/g)

    let row = cellCoords[0]
    let c
    for (let i = 1; i < cellCoords.length; i++) {
        if (cellCoords[i] === '.') {
            c = i + 1
            break
        }
        row = row + `${cellCoords[i]}`
    }

    let column = cellCoords[c]
    for (let i = c + 1; i < cellCoords.length; i++) {
        column = column + `${cellCoords[i]}`
    }

    coords[0] = parseInt(row, 10)
    coords[1] = parseInt(column, 10)
    if (activeConditionArray[coords[0]][coords[1]] === 1) {
        target.classList.add('blessed')
        alert('SHOT down! You have another one shot.')
        for (let cell of activeEnemyCells) {
            if (cell.classList.contains(`${coords[0]}.${coords[1]}`)) {
                cell.classList.add('blessed')
            } 
        }
        return
    } else {
        target.classList.add('missed')
        activeSide.style.visibility = 'hidden'
        for (let cell of activeEnemyCells) {
            if (cell.classList.contains(`${coords[0]}.${coords[1]}`)) {
                cell.classList.add('missed')
            } 
        }
        alert('MISSED!')
        setTimeout(() => alert('Your enemy shoot`s turn.'), 200)
        setTimeout(() => notActiveSide.style.visibility = 'visible', 300)
        return
    }
}