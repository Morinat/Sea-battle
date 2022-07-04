const hint = document.getElementById('hint')
const leftCleaner = document.getElementById('left')
const rightCleaner = document.getElementById('right')
const fields = document.getElementsByTagName('table')
const leftGameCells = document.getElementsByClassName('gameCell left')
const rightGameCells = document.getElementsByClassName('gameCell right')
const lettersToShoot = document.getElementsByClassName('letter')
const numbersToShoot = document.getElementsByClassName('number')

let coords = []
let nextStepVar = []
let counter = 0
let deck = 4
let quantity = 0

leftField.addEventListener('click', placeShip)
leftCleaner.addEventListener('click', cleanField)
rightCleaner.addEventListener('click', cleanField)

// Initial
setTimeout(() => alert('LEFT player begins!'), 500)
setTimeout(() => inWraperRight.style.visibility = 'hidden', 500)
setTimeout(() => alert('Place 4-deck ship.'), 600)

// ONE CELL marker
function markOneCell (event) {
    let target = event.target
    if (target.tagName != 'TD') return

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

    if (target.classList.contains('left')) {
        conditionOfLeftTD[coords[0]][coords[1]] = 1
    } else if (target.classList.contains('right')) {
        conditionOfRightTD[coords[0]][coords[1]] = 1
    } else {
        alert('Error of marking')
        return
    }
    
    target.classList.add('selected')

    nextStepVar = [
        `${coords[0]}.${coords[1] - 1}`,
        `${coords[0]}.${coords[1] + 1}`,
        `${coords[0] - 1}.${coords[1]}`,
        `${coords[0] + 1}.${coords[1]}`
    ]

    return target.classList.contains('left')
}

function highlightCells (activeGameCells) {
    for (let i = 0; i < nextStepVar.length; i++) {

        for (let j = 0; j < activeGameCells.length; j++) {

            if (activeGameCells[j].classList.contains(nextStepVar[i])) {

                if (!activeGameCells[j].classList.contains('selected')) {
                    activeGameCells[j].style.cursor = 'pointer'
                    activeGameCells[j].addEventListener('click', placeShip)
                    activeGameCells[j].classList.add('highlighted')
                }
            }
        }
    }
}

// 'PLACER' of every ship
function placeShip (event) {

    let target = event.target
    if (target.tagName != 'TD') return

    let activeField, activeGameCells, activeSide

    if (markOneCell(event)) {
        activeField = leftField
        activeGameCells = leftGameCells
        activeSide = fields[0]
    } else {
        activeField = rightField
        activeGameCells = rightGameCells
        activeSide = fields[1]
    }

    if (counter === 0) {
        activeField.removeEventListener('click', placeShip)
    }
    counter++

    for (let cell of activeGameCells) {
        cell.style.cursor = 'text'
        if (cell.classList.contains('highlighted')) {
            cell.classList.remove('highlighted')
        }
    }

    if (counter === deck) {
        activeSide.replaceWith(activeSide.cloneNode(true))
        counter = 0
        quantity++

        for (let cell of activeGameCells) {
            cell.style.cursor = 'pointer'
            if (cell.classList.contains('highlighted')) {
                cell.classList.remove('highlighted')
            }
        }

        if (quantity === 1) {
            setTimeout(() => alert('Place 3-deck ship.'), 200)
            deck--
        } else if (quantity === 2) {
            setTimeout(() => alert('Place 3-deck ship.'), 200)
        } else if (quantity === 3) {
            setTimeout(() => alert('Place 2-deck ship.'), 200)
            deck--
        } else if (quantity === 4) {
            setTimeout(() => alert('Place 2-deck ship.'), 200)
        } else if (quantity === 5) {
            setTimeout(() => alert('Place 2-deck ship.'), 200)
        } else if (quantity === 6) {
            setTimeout(() => alert('Place 1-deck ship.'), 200)
            deck--
        } else if (quantity === 7) {
            setTimeout(() => alert('Place 1-deck ship.'), 200)
        } else if (quantity === 8) {
            setTimeout(() => alert('Place 1-deck ship.'), 200)
        } else if (quantity === 9) {
            setTimeout(() => alert('Place 1-deck ship.'), 200)
        } else {

            if (activeField === rightField) {
                leftField.removeEventListener('click', placeShip)
                rightField.removeEventListener('click', placeShip)

                const cleaner = document.getElementsByClassName('cleaner')
                for (let i = 0; i < cleaner.length; i++) {
                    cleaner[i].style.display = 'none'
                }
                for (let i = 0; i < leftGameCells.length; i++) {
                    leftGameCells[i].style.cursor = 'default'
                    rightGameCells[i].style.cursor = 'default'
                }
                createFields(n, leftEnemyField)
                createFields(n, rightEnemyField)
                inWraperRight.style.visibility = 'hidden'

                setTimeout(() => alert('Both fleets are now ready to fight!'), 200)
                setTimeout(() => {
                    alert('LEFT player begins!'),
                    inWraperLeft.style.visibility = 'visible',
                    leftEnemyField.style.display = 'block'
                    rightEnemyField.style.display = 'block'
                    leftEnemyField.addEventListener('click', shoot)
                    rightEnemyField.addEventListener('click', shoot)
                }, 300)
                return
            }

            setTimeout(() => inWraperLeft.style.visibility = 'hidden', 100)
            setTimeout(() => alert('RIGHT player`s turn!'), 200)
            
            counter = 0
            quantity = 0
            deck = 4
            setTimeout(() => inWraperRight.style.visibility = 'visible', 300)
            setTimeout(() => rightField.addEventListener('click', placeShip), 500)
        }
        setTimeout(() => activeField.addEventListener('click', placeShip), 500)
        return
    }

    highlightCells(activeGameCells)
}

// CLEAN selected field
function cleanField (event) {
    let button = event.target

    if (button.id === 'left') {  
 
        for (let cell of leftGameCells) {
            cell.style.cursor = 'cursor'
        }     
        fields[0].remove()
        createFields(n, leftField)
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                conditionOfRightTD[i][j] = 0
            }
        }
        setTimeout(() => leftField.addEventListener('click', placeShip), 1000)
    } else if (button.id === 'right') {
        for (let cell of rightGameCells) {
            cell.style.cursor = 'cursor'
        } 
        fields[1].remove()
        createFields(n, rightField)
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                conditionOfRightTD[i][j] = 0
            }
        }
        setTimeout(() => rightField.addEventListener('click', placeShip), 1000)       
    }
        deck = 4
        counter = 0
        quantity = 0
        alert('Let`s start again with 4-deck ship!') 
}