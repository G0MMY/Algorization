interface Prio{
    f_score: number,
    count: number
}
interface Queue{
    element:Position,
    priority:Prio
}
interface Position{
    x:number,
    y:number
}

export default class PriorityQueue{
    queue:Queue[]

    constructor(){
        this.queue = []
    }

    add(element:Position, priority:Prio){
        let added = false
        this.queue.forEach((elem)=>{
            if (!added){
                if (elem.priority.f_score >= priority.f_score){
                    if (elem.priority.f_score === priority.f_score){
                        if (elem.priority.count > priority.count){
                            const index = this.queue.indexOf(elem)
                            this.queue.splice(index, 0, {
                                element: element,
                                priority: priority
                            })
                            added = true
                        }
                    } else {
                        const index = this.queue.indexOf(elem)
                        this.queue.splice(index, 0, {
                            element: element,
                            priority: priority
                        })
                        added = true
                    }
                } 
            }
        })
        if (!added){
            this.queue.push({
                element: element,
                priority: priority
            })
        }
    }

    front(){
        return this.queue[0]
    }

    remove(){
        this.queue.splice(0, 1)
    }

    isEmpty(){
        if (this.queue.length === 0){
            return true
        }
        return false
    }

    getQueue(){
        return this.queue
    }
}