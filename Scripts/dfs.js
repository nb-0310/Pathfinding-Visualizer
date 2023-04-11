const dfs = async (graph, n, start, end) => {
    let visited = new Array(n)
    visited.fill(false)

    let distances = new Array(n)
    distances.fill(Number.POSITIVE_INFINITY)
    distances[start] = 0

    let prev = new Array(n)
    prev.fill(null)

    let s = []
    s.push([start, 0])

    while (s.length > 0) {
        let val = s.pop()
        let idx = val[0]
        let min = val[1]
        visited[idx] = true
        if (distances[idx] < min) continue

        if (idx === parseInt(end)) {
            break
        }

        console.log (graph[idx])

        for (let edge of graph[idx]) {

            if (visited[edge]) continue

            let newDist = distances[idx] + edge.weight

            if (newDist < distances[edge.id]) {
                prev[edge.id] = idx
                distances[edge.id] = newDist
                s.push([edge.id, newDist])
            }

            for (let a in graph[edge]) {
                document.getElementById(a).classList.toggle('current-node')
            }

            document.getElementById(edge.id).classList.toggle('current-node')
            highlight(edge.id);
            await new Promise(resolve => setTimeout(resolve, 3));

            if (edge.id === parseInt(end)) break

        }
    }

    // console.log (prev)

    return { distances, prev }
}

async function findPathDFS(graph, n, start, end) {
    let res = await dfs(graph, n, start, end, highlight)
    let distances = res.distances;
    let prev = res.prev;
    let path = [];

    if (distances[parseInt(end)] == Number.POSITIVE_INFINITY) return path;

    for (let i = end; i !== null; i = prev[i]) path.unshift(i)

    // console.log (path)

    return path
}

const visualizeDfs = async () => {
    const graph = {}
    const rows = 20
    const columns = 50
    let totalNodes = rows * columns

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let id = (i * 50) + j
            let neighbors = []

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

    console.log (graph)
    const startnid = parseInt(document.querySelector('.start-node').getAttribute('id'))
    const endnid = parseInt(document.querySelector('.end-node').getAttribute('id'))
    const path = await findPathDFS(graph, totalNodes, startnid, endnid);

    path.forEach((nodeId, index) => {
        const node = document.getElementById(nodeId);
        setTimeout(() => {
            node.classList.remove('visited');
            node.classList.remove('current-node');
        }, 25 * index);
    })

    let idx = 1

    for (let id in graph) {
        setTimeout(() => {
            const node = document.getElementById(id)
            node.classList.remove('current-node')
            idx++
        }, idx * 10)
    }


    path.forEach((nodeId, index) => {
        const node = document.getElementById(nodeId);
        setTimeout(() => {
            node.classList.add('shortest-path');
        }, 50 * index);
    })
}

const dfsBtn = document.getElementById('dfs')
dfsBtn.addEventListener('click', visualizeDfs)