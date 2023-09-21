import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credential,setCredential] = useState({email:"",password:""})
    let history = useNavigate();
    const handleSubmit = async (e)=>{
        console.log("Mihir")
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email:credential.email,password:credential.password})
            });
        const json = await response.json();
        console.log(json)
        if(json.success){
         localStorage.setItem("token",json.justData)
         props.showAlert("Logged In Successfully","success")
         history("/")
        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })// Here spread operator is used so every value is same as usual only value is updated as name or changes in name will be equal to value 
    }
    return (
        <div className='mt-2'>
        <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-4">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credential.email} onChange={onChange} aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name ="password" value={credential.password} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
