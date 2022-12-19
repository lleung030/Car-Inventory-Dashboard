import { useState } from 'react'
import { carList } from './data';

export default function Details() {
    const [index, setIndex] = useState(0);
    const [showMore, setShowMore] = useState(false)


function handleNextClick() {
    setIndex(index + 1)
}

function handleMoreClick() {
    setShowMore(!showMore);
}

let car = carList[index];
return (
    <>
        <button onClick={handleNextClick}>
            Next
        </button>
        <h2>
            <i>{car.name} </i>
            made by {car.make}
        </h2>
        <h3>
            ({index + 1} of {carList.length})
        </h3>
            <button onClick={handleMoreClick}>
                {showMore ? 'Hide' : 'Show'} details
            </button>
            {showMore && <p>{car.model}</p>}
        <img
            src={car.url}
            alt={car.alt}
        />
    </>
);
}