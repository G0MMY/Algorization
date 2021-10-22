import React, { useEffect, useState } from 'react'

interface Props{
    grid: JSX.Element[]
    id:string
}

export default function Grid(props:Props){

    return (
        <table id={props.id} >
            <tbody>
                {props.grid}
            </tbody>
        </table>
    )
}