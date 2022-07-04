const n = 10
const wraper = document.getElementById('wraper')
const inWraperLeft = document.getElementById('inWraperLeft')
const inWraperRight = document.getElementById('inWraperRight')
const leftField = document.getElementById('leftField')
const rightField = document.getElementById('rightField')
const leftEnemyField = document.getElementById('leftEnemyField')
const rightEnemyField = document.getElementById('rightEnemyField')

function createFields (n, field) {
    const table = document.createElement('table')
    table.classList.add('table')
    
    let charArray = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    for (let row = 0; row <= n; row++) {
        let tr = document.createElement('tr')
        table.appendChild(tr)
        for (let cell = 0; cell <= n; cell++) {
            if (row === 0) {
                let th = document.createElement('th')
                th.innerHTML = charArray[cell]
                tr.appendChild(th)
            } else if (cell === 0) {
                let th = document.createElement('th')
                th.innerHTML = `${row}`
                tr.appendChild(th)
            } else {
                let td = document.createElement('td')
                td.classList.add(`${row}.${cell}`, 'gameCell')
                if (field === leftField || field === leftEnemyField) {
                    td.classList.add('left')
                } else if (field === rightField || field === rightEnemyField) {
                    td.classList.add('right')
                }
                tr.appendChild(td)
            }
        }
    }

    field.appendChild(table)
}

createFields(n, leftField)
createFields(n, rightField)

const conditionOfLeftTD = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const conditionOfRightTD = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]