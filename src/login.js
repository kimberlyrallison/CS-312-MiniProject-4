import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState} from "react";
import axios from "axios";
import "./styles/login.css"

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");   
    const navigate = useNavigate()

    function submitForm() {
      axios.post('/api/login',{
      username:username,
      password:password,
      })
      .then(()=>navigate("/"))
      .catch(error=>setError(error.response.data))
    }
    
    return (
        <>
        <div className="editFormGrid">
            <div className="label">
                Login
            </div>
            <div className="form">
            <label>Username: </label>
            <input
                name="username"
                value={username}
                onChange={event => setUsername(event.target.value)}/>
            <br/>
            <label>Password: </label>
            <input
                name="password"
                value={password}
                onChange={event => setPassword(event.target.value)} />
            {error}
            <br/>
            <button className="button" onClick={submitForm}>
                Login
            </button>
            <Link to="/register" class="button"> Register</Link>
            </div>
        </div>
        </>
    )
}