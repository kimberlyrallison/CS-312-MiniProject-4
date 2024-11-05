import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import "./styles/register.css"

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate()

    function submitForm() {
      axios.post('/api/register',{
      username:username,
      password:password,
      })
      .then(()=>navigate("/login"))
      .catch(error=>setError(error.response.data))
    }

    return (
    <div className="editFormGrid">
        <div className="label">Register</div>
        <div className="form">
        <label>
          Username: 
          <input
            name="username"
            value={username}
            onChange={event => setUsername(event.target.value)}>
            </input>
        </label>
        <br />
        <label>
          Password: 
          <input
            name="password"
            value={password}
            onChange={event => setPassword(event.target.value)} />
        </label>
        {error}
        <br/>
        <button className="button" onClick={submitForm}>
        Submit
        </button>
        </div>
    </div>
);}
