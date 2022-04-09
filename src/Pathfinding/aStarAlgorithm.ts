import { len } from "./ShortestPath"
import PriorityQueue from "./priorityQueue"
import { findPath, play, neighbors, distance, Position, checked, open, positionFormat } from "./algorithmUtils"

export default function aStar(start:string, end:string, grid_number:string, speed: number){
    const start_pos = positionFormat(start)
    const end_pos = positionFormat(end)
    let visualizer = [{
        element:{x:start_pos.x, y:start_pos.y},
        color:start
    }]
    let count = 0
    let open_set = new PriorityQueue()
    open_set.add(start_pos, {
        f_score: distance(start_pos, end_pos),
        count: count
    })
    let came_from:Position[][] = []
    for (let i=0;i<len;i++){
        came_from.push([])
        for (let j=0;j<len*2;j++){
            came_from[i].push({x:-1, y:-1})
        }
    }
    let g_score:number[][] = []
    for (let i=0;i<len;i++){
        g_score.push([])
        for (let j=0;j<len*2;j++){
            g_score[i].push(Infinity)
        }
    }
    g_score[start_pos.x][start_pos.y] = 0
    let f_score:number[][] = []
    for (let i=0;i<len;i++){
        f_score.push([])
        for (let j=0;j<len*2;j++){
            f_score[i].push(Infinity)
        }
    }
    f_score[start_pos.x][start_pos.y] = distance(start_pos, end_pos)
    let open_set_hash = [start_pos]

    while (!open_set.isEmpty()){
        let changed = false
        let current = open_set.front().element
        const index = open_set_hash.indexOf(current)
        open_set_hash.splice(index, 1)

        if (current.x === end_pos.x && current.y === end_pos.y){
            findPath(current, came_from, visualizer)
            play(visualizer, grid_number, speed)
            return true
        }

        const neighbors_array = neighbors(current, grid_number)

        for (let i=0;i<neighbors_array.length;i++) {
            let neighbor = neighbors_array[i]
            const temp_g_score = g_score[current.x][current.y] + 1

            if (temp_g_score < g_score[neighbor.x][neighbor.y]){
                changed = true
                came_from[neighbor.x][neighbor.y] = current
                g_score[neighbor.x][neighbor.y] = temp_g_score
                f_score[neighbor.x][neighbor.y] = distance(neighbor, end_pos) + temp_g_score
                if (open_set_hash.indexOf(neighbor) === -1){
                    count += 1
                    open_set.add(neighbor, {
                        f_score: f_score[neighbor.x][neighbor.y],
                        count: count
                    })
                    open_set_hash.push(neighbor)
                    visualizer.push({
                        element: neighbor,
                        color: open
                    })
                }
            }
        }
       
        visualizer.push({
            element: current,
            color: checked
        })
        if (!changed){
            open_set.remove()
        }
    }

    return false
}

