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