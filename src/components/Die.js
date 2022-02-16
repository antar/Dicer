import React from 'react'
import '../index.css'

export default function Die(props) {
    const styles = {
        backgroundColor: props.isSelected ? "#8660FF" : "white"
    }
    return (
        <div onClick={props.toggleDie} style={styles} className="die-face">
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}