import React, {useEffect, useState} from "react";

import "../css/ArtCard.css";

function ArtCard(prop) {

    const [tempValue, setTempValue] = useState(0);

    useEffect(() => {

    }, [tempValue])

    return (
        <div className = "artCardDiv"> 
            {
                prop.image.length <= 1?
                    <button style = {{backgroundColor: "transparent", borderWidth: "0px"}} onClick = {() => prop.viewFunction(prop.card)}>
                        <img className = "artCardImage" src = {prop.image[0]}/>
                    </button>
                :
                    <button style = {{backgroundColor: "transparent", borderWidth: "0px"}} onClick = {() => prop.viewFunction(prop.card)}>
                        <div className = "artCardImageMultiple">
                            <div className = " artCardImageMultipleOverlay">
                                <div className = "artCardImageMultipleOverlayText">+{prop.image.length - 1}</div>
                            </div>
                            <img className = "artCardImage" src = {prop.image[0]}/>
                        </div>
                    </button>
            }
        </div>
    )
}

export default ArtCard;