class PriorityQueue {
    constructor () {
        this.items = []
    }

    enqueue (item, priority) {
        let added = false

        for (let i = 0; i < this.items.length; i++) {
            if (priority < this.items[i].priority) {
                this.items.splice (i, 0, {item, priority})
                added = true
                break
            }
        }

        if (!added) this.items.push ({item, priority})
    }

    dequeue () {
        if (this.isEmpty()) return null

        return this.items.shift()
    }

    isEmpty () {
        return this.items.length === 0
    }

    size () {
        return this.items.length
    }
}

export default PriorityQueue