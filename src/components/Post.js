import { useEffect, useState } from "react"

export default function Post(props) {

    return (

        <div className = "post">


            <h2>{props.post.name}</h2>
            <p>Year: {props.post.year}</p>
            <p>Selling Price: ${props.post.selling_price}</p>
            <p>Km Driven: {props.post.km_driven} km</p>
            <p>Fuel Type: {props.post.fuel}</p>
            <p>Seller Type: {props.post.seller_type}</p>
            <p>Transmission: {props.post.transmission}</p>
            <p>Owner: {props.post.owner}</p>
            <p>Mileage: {props.post.mileage}</p>
            <p>Engine: {props.post.engine}</p>
            <p>Maximum Power: {props.post.max_power}</p>
            <p>Torque: {props.post.torque}</p>
            <p>Seats: {props.post.seats}</p>

            <p className = "Price">Market Value: ${props.post.selling_price}</p>
        </div>
        
    )
}