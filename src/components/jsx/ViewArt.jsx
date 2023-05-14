import React, {useEffect, useState} from "react";
import {db} from "../../firebase-config"
import { ref, set, onValue, get } from "firebase/database";
import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";


import "../css/ViewArt.css";

function ViewArt (props) {

    const [user, setUser] = useState(null);

    const [viewArt, setViewArt] = useState(null);
    const [viewArtInt, setViewArtInt] = useState(0);
    const prop = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        onValue(ref(db, "ArtCards"), snapshot =>
        {
            snapshot.forEach(n =>
            {
                if(n.val().name === prop.artName)
                {
                    setViewArt(n.val());
                }
            })
        })

        //Retrieve active user using local storage
        if(localStorage.getItem("LoggedInUser") !== null)
        {
            get(ref(db, "Users/" + JSON.parse(localStorage.getItem("LoggedInUser")))).then(snapshot =>
            {
                setUser(snapshot.val());
            })
        }
    }, [])

    async function removeArt()
    {
        try
        {
            await set(ref(db, "ArtCards/" + viewArt.name), null);
            prop.resetFunction(Math.random());
        }
        catch(err)
        {

        }
        finally
        {
            navigate("/home");
        }
    }

    function adjustNavigate(i)
    {
        setViewArtInt(viewArtInt + i)
    }


    return (
        <div>
            { viewArt === null?
                    <div>?</div>
                :
                    <div className = "viewContentDiv">
                        {user === null || user.admin === false?
                            <div className = "viewContentTitle">{viewArt.name}</div>
                        :
                            <div className = "viewContentTitle">
                                <div>{viewArt.name}</div>
                                <button className = "viewContentDelete" onClick = {removeArt} style = {{backgroundColor: "transparent", borderWidth: "0px"}}>
                                    <img className = "viewContentDeleteImage" src = {require("../Images/Remove.png")} alt = "Delete image"/>
                                </button>
                            </div>
                        }    

                        {viewArt.image.length === 1?
                                <div>
                                    <img className = "viewContentImage" src = {viewArt.image[0]} alt = {viewArt.name}/>
                                    <pre className = "viewContentDesc">{viewArt.description}</pre>
                                </div>
                            :
                                <div>
                                    <div className = "viewContentImageMultiple">
                                        <div className = "viewContentImageNavigate">
                                            {viewArtInt === 0?
                                                null
                                            :
                                                <button className = "viewContentNavigateLeft" style = {{borderWidth: "0px"}} onClick = {() => adjustNavigate(-1)}>&lt;</button>
                                            }
                                            
                                            {viewArtInt >= viewArt.image.length - 1?
                                                null
                                            :
                                                <button className = "viewContentNavigateRight" style = {{borderWidth: "0px"}} onClick = {() => adjustNavigate(1)}>&gt;</button>
                                            }
                                        </div>
                                        <img className = "viewContentImage" src = {viewArt.image[viewArtInt]} alt = {viewArt.name}/>
                                    </div>
                                    <pre className = "viewContentDesc">{viewArt.description}</pre>
                                </div>
                        } 
                    </div>

            }
        </div>
    )
}
///<img className = "footer" src = {require("../Images/Footer.jpg")} alt="Footer for the website"/>
export default ViewArt;