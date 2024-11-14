import {useState} from "react"
import api from "../api"
import {redirect, useNavigate} from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import "../styles/form.css"

function Form({ route, method}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register";
    const redirectName = method === "login" ? "Register" : "Login";
   // console.log(redirectName);

    const handleRedirect =(e) => {
        e.preventDefault();
        const page =  method === "login" ? "register" : "login";
        navigate(`/${page}`)
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, {username, password})
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else{
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } 
     finally {
        setLoading(false)
    }
    };


    return (
        <>
        <h1 
        style={{
        fontSize: "8vw", // Adjusts size relative to viewport width
        fontWeight: "bold", // Keeps the bold font weight
        textAlign: "center", // Centers the text without using flexbox
        margin: "20px 0", // Adds more vertical spacing
        letterSpacing: "2px", // Adds spacing between the letters for style
        color: "#333", // A standard color for the text
        lineHeight: "1.2", // Improves readability
        }}>
        Shelvd
        </h1>
        <div className="page">
            <form onSubmit={handleSubmit} className="form-container">
                <h1>{name}</h1>
                <input
                     className = "form-input"
                    type="text"
                    value = {username}
                    onChange = {(e) => setUsername(e.target.value)}
                    placeholder = "Username"
                />
                <input
                     className = "form-input"
                    type="password"
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                    placeholder = "Password"
                />
                <button className = "form-button" type="submit">
                 {name}
                </button>
            </form>
    
            <div className = "redirect-container">
                <button className ='redirect-button' onClick={handleRedirect}>
                 {redirectName}
                </button>
                <p>If you are not registered, sign up here.</p>
            </div>
        </div>
        </>
    );}
    
    export default Form;