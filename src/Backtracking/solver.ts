export interface Movement{
    ascend:boolean,
    row:number,
    col:number,
    value:number
}

export let visualization_array:Movement[] = []

export const solver = (sudoku:number[][])=>{
    const find:number[]|boolean = findEmpty(sudoku)
    let row=0
    let col=0

    if (!find){
        return true
    } else {
        row = find[0]
        col = find[1]
    }
    for (let i=1;i<10;i++){
        if (validPlacement(row, col, i, sudoku)){
            sudoku[row][col]=i
            visualization_array.push({ascend:true, row:row, col:col, value:i})
            if (solver(sudoku)){
                return true
            }
            visualization_array.push({ascend:false, row:row, col:col, value:0})
            sudoku[row][col]=0
        }
    }
    return false
}


const findEmpty = (grid:number[][]|string[][])=>{
    for (let i=0;i<grid.length;i++){
        for (let j=0;j<grid[i].length;j++){
            if (grid[i][j]===0 || grid[i][j]===""){
                return [i, j]
            } 
        }
    }
    return false
}

export const validPlacement = (row:number, col:number, num:number, grid:number[][]|string[][])=>{
    if (checkRow(row,col, num, grid) && checkCol(row,col, num, grid) && checkSubGrid(row,col, num, grid)){
        return true
    }
    return false
}

const checkRow = (row:number, col:number, num:number, grid:number[][]|string[][])=>{
    for (let i=0;i<grid.length;i++){
        if (i!==col && grid[row][i]===num){
            return false
        }
    }
    return true
}

const checkCol = (row:number, col:number, num:number, grid:number[][]|string[][])=>{
    for (let i=0;i<grid.length;i++){
        if (i!==row && grid[i][col]===num){
            return false
        }
    }
    return true
}


const checkSubGrid = (row:number, col:number, num:number, grid:number[][]|string[][])=>{
    let min_x = Math.floor(row/3)
    min_x = min_x*3
    let max_x = min_x+3
    let min_y = Math.floor(col/3)
    min_y = min_y*3
    let max_y = min_y+3

    for (let i=min_x;i<max_x;i++){
        for (let j=min_y;j<max_y;j++){
            if (i!==row && j!==col && grid[i][j]===num){
                return false
            }
        }
    }
    return true
}
            
