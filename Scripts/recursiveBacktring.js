const graph = {}
const rows = 20
const columns = 50
let totalNodes = rows * columns

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
        let id = (i * 50) + j
        const neighbors = []
        const node = document.getElementById(id)
        const northId = (i - 1) * 50 + j
        const southId = (i + 1) * 50 + j
        const westId = i * 50 + j - 1
        const eastId = i * 50 + j + 1

        if (i > 0) {
            let northCell = document.getElementById(northId)

            if (northCell) {
                neighbors.push(
                    {
                        id: northId,
                        node: northCell,
                        weight: 1
                    }
                )
            }
        }

        if (i < rows - 1) {
            let southCell = document.getElementById(southId)

            if (southCell) {
                neighbors.push(
                    {
                        id: southId,
                        node: southCell,
                        weight: 1
                    }
                )
            }
        }

        if (j > 0) {
            let westCell = document.getElementById(westId)

            if (westCell) {
                neighbors.push(
                    {
                        id: westId,
                        node: westCell,
                        weight: 1
                    }
                )
            }
        }

        if (j < columns - 1) {
            let eastCell = document.getElementById(eastId)

            if (eastCell) {
                neighbors.push(
                    {
                        id: eastId,
                        node: eastCell,
                        weight: 1
                    }
                )
            }
        }

        graph[id] = {
            neighbors,
            node,
            id,
            visited: false
        }
    }
}


let counter = 1

function createMaze(rowStart, rowEnd, colStart, colEnd, surroundingWalls, orientation, midDivision) {

    if (rowEnd < rowStart || colEnd < colStart) {
        // console.log(counter)
        return
    }

    if (!surroundingWalls) {
        const relevantIds = [graph[document.getElementsByClassName('start-node')[0].getAttribute('id')].node, graph[document.getElementsByClassName('end-node')[0].getAttribute('id')].node];

        Object.keys(graph).forEach((node) => {
            if (!relevantIds.includes(graph[node].node)) {
                graph[node].count = counter
                const r = parseInt(graph[node].id / 50);
                const c = graph[node].id % 50;
                if (r === 0 || c === 0 || r === 19 || c === 49) {
                    const currentHTMLNode = document.getElementById(graph[node].id);
                    if (!currentHTMLNode.classList.contains("start-node") && !currentHTMLNode.classList.contains("end-node") && !graph[node].visited) {
                        setTimeout(() => {
                            graph[node].node.classList.add('wall')
                            graph[node].visited = true
                        }, graph[node].count * 30)
                        counter++
                    }
                }
            }
        });

        surroundingWalls = true;
    }

    if (orientation === 'horizontal') {
        const possibleRows = []
        const possibleCols = []

        for (let i = rowStart; i <= rowEnd; i += 2) possibleRows.push(i)

        for (let i = colStart - 1; i <= colEnd + 1; i += 2) possibleCols.push(i)

        let rowIdx, colIdx

        if (midDivision) {
            rowIdx = Math.floor(possibleRows.length / 2)
            colIdx = Math.floor(possibleCols.length / 2)
            midDivision = false
        } else {
            rowIdx = Math.floor(Math.random() * possibleRows.length)
            colIdx = Math.floor(Math.random() * possibleCols.length)
        }

        const currentRow = possibleRows[rowIdx]
        const currentCol = possibleCols[colIdx]

        for (let i in graph) {
            const r = parseInt(graph[i].id / 50)
            const c = graph[i].id % 50

            if (r === currentRow && c !== currentCol && c >= colStart - 1 && c <= colEnd + 1) {
                const currentHTMLNode = document.getElementById(graph[i].id)
                if (!currentHTMLNode.classList.contains('start-node') && !currentHTMLNode.classList.contains('end-node')) {
                    graph[i].count = counter
                    setTimeout(() => {
                        currentHTMLNode.classList.add('wall')
                    }, graph[i].count * 30)

                    counter++
                }
            }
        }

        if (currentRow - rowStart - 2 > colEnd - colStart) {
            createMaze(rowStart, currentRow - 2, colStart, colEnd, surroundingWalls, orientation, midDivision)
        } else {
            createMaze(rowStart, currentRow - 2, colStart, colEnd, surroundingWalls, 'vertical', midDivision)
        }

        if (rowEnd - currentRow - 2 > colEnd - colStart) {
            createMaze(currentRow + 2, rowEnd, colStart, colEnd, surroundingWalls, orientation, midDivision)
        } else {
            createMaze(currentRow + 2, rowEnd, colStart, colEnd, surroundingWalls, 'vertical', midDivision)
        }
    } else {
        const possibleCols = []
        const possibleRows = []

        for (let i = colStart; i <= colEnd; i += 2) possibleCols.push(i)

        for (let i = rowStart - 1; i <= rowEnd + 1; i += 2) possibleRows.push(i)

        let rowIdx, colIdx

        if (midDivision) {
            rowIdx = Math.floor(possibleRows.length / 2)
            colIdx = Math.floor(possibleCols.length / 2)
            midDivision = false
        } else {
            rowIdx = Math.floor(Math.random() * possibleRows.length)
            colIdx = Math.floor(Math.random() * possibleCols.length)
        }

        const currentRow = possibleRows[rowIdx]
        const currentCol = possibleCols[colIdx]

        for (let i in graph) {
            const r = parseInt(graph[i].id / 50)
            const c = graph[i].id % 50

            if (c === currentCol && r !== currentRow && r >= rowStart - 1 && r <= rowEnd + 1) {
                const currentHTMLNode = document.getElementById(graph[i].id)
                if (!currentHTMLNode.classList.contains('start-node') && !currentHTMLNode.classList.contains('end-node')) {
                    graph[i].count = counter
                    setTimeout(() => {
                        currentHTMLNode.classList.add('wall')
                    }, graph[i].count * 30)

                    counter++
                }
            }
        }

        if (rowEnd - rowStart > currentCol - 2 - colStart) {
            createMaze(rowStart, rowEnd, colStart, currentCol - 2, surroundingWalls, 'horizontal', midDivision);
        } else {
            createMaze(rowStart, rowEnd, colStart, currentCol - 2, surroundingWalls, orientation, midDivision);
        }
        if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
            createMaze(rowStart, rowEnd, currentCol + 2, colEnd, surroundingWalls, 'horizontal', midDivision);
        } else {
            createMaze(rowStart, rowEnd, currentCol + 2, colEnd, surroundingWalls, orientation, midDivision);
        }
    }
}


const back = document.querySelector('#maze')
back.addEventListener('click', () => {
    createMaze(0, 19, 0, 49, false, 'horizontal', true)
})

// export default graph


// function generateMaze() {

//     for (let node in graph) {
//         graph[node].node.classList.add('wall')
//     }

//     // choose a random starting cell

//     const arr = []

//     for (let i in graph) arr.push(graph[i].node)

//     const half = Math.floor(arr.length / 2)

//     for (let i = 0; i < half; i++) {
//         let random = Math.floor(Math.random() * arr.length)
//         if (arr[random].classList.contains('wall')) arr[random].classList.remove('wall')
//     }
// }