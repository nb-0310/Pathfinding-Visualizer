const gridContainer = document.querySelector("#grid-container")
const gridRows = 20
const gridColumns = 50
let isMouseDown = false
let startNode = null
let endNode = null
let isDraggingStartNode = false
let isDraggingEndNode = false

function generateRandom () {
    const random = (Math.floor (Math.random() * gridColumns * gridRows)) - 1
    return random
}

for (let i = 0; i < gridRows; i++) {
  for (let j = 0; j < gridColumns; j++) {
    const cell = document.createElement("div")
    cell.classList.add("cell")
    cell.setAttribute ('id', i * 50 + j)
    gridContainer.appendChild(cell)
  }
}

const cells = document.querySelectorAll(".cell");
cells.forEach (cell => {
    cell.addEventListener ('mousedown', () => {
        if (cell.classList.contains ('start-node')) {
            cell.classList.add ('dragging')
            isDraggingStartNode = true
            startNode = cell
        } else if (cell.classList.contains ('end-node')) {
            cell.classList.add ('dragging')
            isDraggingEndNode = true
            endNode = cell
        } else if (!cell.classList.contains ('start-node') && !cell.classList.contains ('end-node')){
            // cell.style.background = '#151515'
            // cell.style.animation = 'cell-in 0.2s ease forwards'
            cell.classList.add ('wall')
            isMouseDown = true
        }
    })

    cell.addEventListener ('mouseover', () => {
        if (isDraggingStartNode) {
            startNode.classList.remove ('start-node')
            cell.classList.add ('start-node')
            startNode = cell
        } else if (isDraggingEndNode) {
            endNode.classList.remove ('end-node')
            cell.classList.add ('end-node')
            endNode = cell
        } else if (isMouseDown && !cell.classList.contains ('start-node') && !cell.classList.contains ('end-node')) {
            // cell.style.background = '#151515'
            // cell.style.animation = 'cell-in 0.2s ease forwards'
            cell.classList.add ('wall')
        }
    })

    cell.addEventListener ('mouseup', () => {
        isMouseDown = false
        isDraggingEndNode = false
        isDraggingStartNode = false
        cells.forEach(c => c.classList.remove ('dragging'))
    })
})

cells[generateRandom()].classList.add ('start-node')
startNode = document.querySelector ('.start-node')
cells[generateRandom()].classList.add ('end-node')
endNode = document.querySelector ('.end-node')