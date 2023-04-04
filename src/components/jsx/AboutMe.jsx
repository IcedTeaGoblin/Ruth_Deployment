import React, {useEffect, useState} from "react";
import { Grid } from '@material-ui/core';
import {db} from "../../firebase-config"
import Modal from "react-modal";
import { ref, set, onValue } from "firebase/database";

 
import ArtCard from "./ArtCard.jsx";

import "../css/Home.css";

function AboutMe () {
    
    useEffect(() => {

       
    }, [])

    return (
        <div>Hello</div>
    )
}

export default AboutMe;