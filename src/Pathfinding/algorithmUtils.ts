import { len, wall } from './ShortestPath'

export interface Position{
    x:number,
    y:number
}
interface Visualizer{
    element: Position
    color: string
}

export const checked = 'red'
export const open = 'orange'
const path = 'purple'

export const findPath = (current:Position, came_from:Position[][], visualizer: Visualizer[]):boolean=>{
    if (came_from[current.x][current.y].x === -1 && came_from[current.x][current.y].y === -1){
        return true
    }
    visualizer.push({
        element: current,
        color: path
    })
    return findPath(came_from[current.x][current.y], came_from, visualizer)
}

export const play = (visualizer: Visualizer[], grid_number:string, speed: number)=>{
    let i = 0
    document.getElementById('app')!.style.pointerEvents = 'none'
    visualizer.forEach((elem)=>{
        i += 1
        setTimeout(()=>{
            document.getElementById(elem.element.x + ',' + elem.element.y + ' ' + grid_number)!.style.backgroundColor = elem.color
        }, i * (8 - speed))
    })
    const doc = document.getElementById('screen_pointers')!
    if (grid_number === '1' || grid_number === '2'){
        if (doc.textContent === null){
            doc.textContent = JSON.stringify(i)
        } else if (doc.textContent === '' || i > parseInt(doc.textContent)){
            doc.textContent = JSON.stringify(i)
        }
    }
  
    setTimeout(()=>{
        if (grid_number === '1' || grid_number === '2'){
            if (doc.textContent !== null && i === parseInt(doc.textContent)){
                document.getElementById('app')!.style.pointerEvents = 'auto'
                doc.textContent = '0'
            }
        } else {
            document.getElementById('app')!.style.pointerEvents = 'auto'
        }
    }, i * (8 - speed))
}

export const neighbors = (current:Position, grid_number:string)=>{
    let neighbors_array = []
    
    if (current.x > 0){
        if (document.getElementById((current.x - 1) + ',' + current.y + ' ' + grid_number)!.style.backgroundColor !== wall){
            neighbors_array.push({
                x: current.x - 1, 
                y: current.y
            })
        }
    } if (current.x < len - 1){
        if (document.getElementById((current.x + 1) + ',' + current.y + ' ' + grid_number)!.style.backgroundColor !== wall){
            neighbors_array.push({
                x: current.x + 1, 
                y: current.y
            })
        }
    } if (current.y > 0){
        if (document.getElementById(current.x + ',' + (current.y - 1) + ' ' + grid_number)!.style.backgroundColor !== wall){
            neighbors_array.push({
                x: current.x, 
                y: current.y - 1
            })
        }
    } if (current.y < len * 2 - 1 && grid_number === ''){
        if (document.getElementById(current.x + ',' + (current.y + 1) + ' ')!.style.backgroundColor !== wall){
            neighbors_array.push({
                x: current.x, 
                y: current.y + 1
            })
        }
    } if (current.y < len - 1 && grid_number !== ''){
        if (document.getElementById(current.x + ',' + (current.y + 1) + ' ' + grid_number)!.style.backgroundColor !== wall){
            neighbors_array.push({
                x: current.x, 
                y: current.y + 1
            })
        }
    }

    return neighbors_array
}

export const distance = (current:Position, end:Position)=>{
    return Math.abs(current.x - end.x) + Math.abs(current.y - end.y)
}

export const positionFormat = (position:string)=>{
    return {
        x: parseInt(position.split(',')[0]), 
        y: parseInt(position.split(',')[1])
    }
}