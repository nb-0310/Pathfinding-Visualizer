// let graph = {
//     0: [
//         {
//             node: 1,
//             weight: 5
//         }
//     ],
//     1: [
//         {
//             node: 0,
//             weight: 5
//         },
//         {
//             node: 2,
//             weight: 10
//         },
//         {
//             node: 4,
//             weight: 20
//         }
//     ],

//     2: [
//         {
//             node: 1,
//             weight: 10
//         },
//         {
//             node: 5,
//             weight: 5
//         }
//     ],

//     4: [
//         {
//             node: 1,
//             weight: 20
//         },
//         {
//             node: 5,
//             weight: 30
//         }
//     ],

//     5: [
//         {
//             node: 2,
//             weight: 5
//         },
//         {
//             node: 4,
//             weight: 30
//         },
//         {
//             node: 3,
//             weight: 2
//         }
//     ],

//     3: [
//         {
//             node: 5,
//             weight: 2
//         }
//     ]
// }

class PriorityQueue {
    constructor() {
        this.items = []
    }

    enqueue(item, priority) {
        let added = false

        for (let i = 0; i < this.items.length; i++) {
            if (priority < this.items[i].priority) {
                this.items.splice(i, 0, { item, priority })
                added = true
                break
            }
        }

        if (!added) this.items.push({ item, priority })
    }

    dequeue() {
        if (this.isEmpty()) return null

        return this.items.shift()
    }

    isEmpty() {
        return this.items.length === 0
    }

    size() {
        return this.items.length
    }
}

function highlight(nodeId) {
    const node = document.getElementById(nodeId);
    node.classList.add('visited')
}

async function dijkstra(graph, n, start, end, highlight) {
    let visited = new Array(n)
    visited.fill(false)

    let distances = new Array(n)
    distances.fill(Number.POSITIVE_INFINITY)
    distances[start] = 0

    let prev = new Array(n)
    prev.fill(null)

    let pq = new PriorityQueue()
    pq.enqueue(start, 0)

    while (!pq.isEmpty()) {
        let val = pq.dequeue()
        let idx = val.item
        let min = val.priority
        visited[idx] = true
        if (distances[idx] < min) continue

        if (idx === parseInt(end)) {
            console.log(distances[idx])
            console.log(prev[idx])
            break
        }

        for (let edge of graph[idx]) {
            if (visited[edge]) continue

            let newDist = distances[idx] + edge.weight

            if (newDist < distances[edge.id]) {
                prev[edge.id] = idx
                distances[edge.id] = newDist
                pq.enqueue(edge.id, newDist)
            }

            if (edge.id === parseInt(end)) break

            if (highlight) {
                highlight(edge.id);
                document.getElementById(edge.id).classList.toggle ('current-node')
                await new Promise(resolve => setTimeout(resolve, 3));
            }

        }
    }

    return { distances, prev }
}


async function findShortestPath(graph, n, start, end) {
    let res = await dijkstra(graph, n, start, end, highlight)
    let distances = res.distances;
    let prev = res.prev;
    let path = [];

    if (distances[parseInt(end)] == Number.POSITIVE_INFINITY) return path;

    for (let i = end; i !== null; i = prev[i]) path.unshift(i)

    return path
}

let visualizeDijkstra = async function () {
    const graph = {}
    const rows = 20
    const columns = 50
    let totalNodes = rows * columns

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let id = (i * 50) + j
            let neighbors = []
            let node = document.getElementById(id)

            if (node.classList.contains('wall')) {
                totalNodes--
                continue
            }

            if (i > 0) {
                let northId = (i - 1) * 50 + j
                let northCell = document.getElementById(northId)

                if (northCell && !northCell.classList.contains('wall')) {
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
                let southId = (i + 1) * 50 + j
                let southCell = document.getElementById(southId)

                if (southCell && !southCell.classList.contains('wall')) {
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
                let westId = i * 50 + j - 1
                let westCell = document.getElementById(westId)

                if (westCell && !westCell.classList.contains('wall')) {
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
                let eastId = i * 50 + j + 1
                let eastCell = document.getElementById(eastId)

                if (eastCell && !eastCell.classList.contains('wall')) {
                    neighbors.push(
                        {
                            id: eastId,
                            node: eastCell,
                            weight: 1
                        }
                    )
                }
            }
            graph[id] = neighbors
        }
    }
    const startnid = parseInt(document.querySelector('.start-node').getAttribute('id'))
    const endnid = parseInt(document.querySelector('.end-node').getAttribute('id'))
    const path = await findShortestPath(graph, totalNodes, startnid, endnid);

    path.forEach((nodeId, index) => {
        const node = document.getElementById(nodeId);
        setTimeout(() => {
            node.classList.remove('visited');
            node.classList.remove('current-node');
        }, 25 * index);
    })

    path.forEach((nodeId, index) => {
        const node = document.getElementById(nodeId);
        setTimeout(() => {
            node.classList.add('shortest-path');
        }, 50 * index);
    })
}

const runBtn = document.getElementById('run');
runBtn.addEventListener('click', visualizeDijkstra)