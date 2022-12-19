import { useState } from 'react'



function Welcome(props) {
    return <h1>Hello, how is your day {props.name}?</h1>
}

export default function Inventory() {
    return (
        <div>
            <Welcome name="Christina" />
            <img className="Car"
            src="https://images.squarespace-cdn.com/content/5fe4caeadae61a2f19719512/1612723433454-0TWNOA9DD33M2OSGHHH0/2021-02-07+19_34_51-.jpg?format=1500w&content-type=image%2Fjpeg"
            alt="props.name"
            />            
        </div>
    )
}

