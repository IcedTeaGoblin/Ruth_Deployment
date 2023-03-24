import React, {useEffect, useState} from "react";
import {collection, getDocs, addDoc} from "firebase/firestore"
import "../css/Navbar.css";
import Logo from "../Images/Logo.png";
import Background from "../Images/Background.jpg";
import { requirePropFactory } from "@material-ui/core";
import {db} from "../../firebase-config"
import Modal from "react-modal";
import { getDatabase, ref, set, onValue } from "firebase/database";


function Navbar() {

    const [user, setUser] = useState([]);

    const [users, setUsers] = useState([]);
    //const userCollection = collection(db, "Users");
    const userCollection = null;

    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const [loggingInName, setLoggingInName] = useState(null);
    const [loggingInPassword, setLoggingInPassword] = useState(null);

    const [loggingInValid, setLoggingInValid] = useState(true);

    const [tempValue, setTempValue] = useState(0);

    useEffect(() => {

        const getUsers = async() => {
            const data = await getDocs(userCollection);

            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }


        if(loggingInName != "" && loggingInPassword != null)
        {
            setLoggingInValid(false);
        }

        set(ref(db, "Users/" + "Logan"), {name: "Logan", password: "Itisataco1"});
        //console.log(localStorage.getItem("LoggedInUser"));
        setUser(JSON.parse(localStorage.getItem("LoggedInUser")));

        onValue(ref(db, "Users"), snapshot =>
        {
            var tempUser = [];
            snapshot.forEach(n =>
            {
                tempUser.push(n.val());
            })
            setUsers(tempUser);
        })
        //getUsers();
    }, [loggingInName, loggingInPassword])

    const openLoggingIn = () => 
    {
        setIsLoggingIn(true);
    }

    const closeLoggingIn = () => 
    {
        setIsLoggingIn(false);
        setLoggingInName(null);
        setLoggingInPassword(null);
    }

    const attemptLogin = () => 
    {
        users.forEach((checkUser) => 
        {
            if(checkUser.name == loggingInName && checkUser.password == loggingInPassword)
            {
                //console.log(checkUser);
                localStorage.setItem("LoggedInUser", JSON.stringify(checkUser));
                //console.log(JSON.parse(localStorage.getItem("LoggedInUser")));
                window.location.reload(false);
            }
        })
    }

    const logOut = () =>
    {
        localStorage.setItem("LoggedInUser", JSON.stringify(null));
        setUser(null);
        window.location.reload(false);
    }

    const addModalStyle = {
        content: {
            display: "inline",
            position: "initial",

            margin: "auto",
            marginTop: "200px",

            width: "fit-content",
            display: "flex",
            minWidth: "500px",
            backgroundColor: "#f8cde1",

            overflow: "auto",

            border: "3px solid rgb(176,84,117)"
        }
    }

    return (
        <div>
            <img className = "header" src = {require("../Images/Header.jpg")} alt="Header image for the website"/>
            <div className = "mainNavBar">
                <div className = "LogoTitle">
                    <img className = "Logo" src = {Logo} alt="Website logo"/>
                    <h1 className = "Title">Ruth's Art Portfolio</h1>
                </div>
                {
                    user === null ?
                        <div className = "loginHeader">
                            <button className = "logoutButtonB" onClick = {openLoggingIn}>Login</button>
                        </div>
                    :
                        <div className = "loginHeader">
                            <h1 className = "logoutText">{user.name}</h1>
                            <button className = "logoutButtonB" onClick = {logOut}>Log out</button>
                        </div>
                }
            </div>

            <Modal style={addModalStyle} isOpen = {isLoggingIn} onRequestClose = {closeLoggingIn} ariaHideApp={false}>
                <div>
                    <h1 className = "loginTitle">Login</h1>
                    <div><input placeholder = "name..." onChange = {(event) => {(setLoggingInName(event.target.value))}}/></div>
                    <div><input placeholder = "password..." onChange = {(event) => {(setLoggingInPassword(event.target.value))}}/></div>
                    <div><button onClick = {attemptLogin} disabled = {loggingInValid}>Submit</button></div>
                </div>
            </Modal>
        </div>
    )
}

export default Navbar;