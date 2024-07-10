import React, { useState } from 'react'
import axios from 'axios';

import "./register.css"
export default function Register() {
    const [name, setName] = useState("");
    const [password, setPassord] = useState("");
    const [email, setEmail] = useState("");
    const [rpassword, setrpassword] = useState("");
    const [Accept, setAccept] = useState(false);
    // const [flag,setFlag]=useState(false);
    const[statusError,setStatusError]=useState("");
  
    let flag=true
    async function submit(e) {
      e.preventDefault();
      setAccept(true);
      if(name===''||password.length<8||rpassword!==password){
          flag=false;
      }else{
        flag=true;
      }
     try{
      if(flag){
      let res=await axios.post(`http://127.0.0.1:8000/api/register`,{
        name:name,
        email:email,
        password:password,
        password_confirmation:rpassword
        });
        setStatusError(res.status);
        console.log(res);
        if(res.status===200||res.status===201){
           window.localStorage.setItem("email",email);
          window.location.pathname="/home";
        }
    }
       }catch(error){
        setStatusError(error.response.status)
     }
    }
  return (
    <>
        <form action=""  onSubmit={submit} className="form-group ">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                placeholder="Name..."
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              {name===""&&Accept&&<p className="error" >
                UserName is Required
                
                </p>}
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                placeholder="Email..."
                id="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {Accept&&statusError===400&&<p className="alert alert-danger">this email has been taken</p>}
              {Accept&&statusError===201&&<p className="alert alert-success">plz check your mail for verification</p>}
              <label htmlFor="password">password:</label>
              <input
                type="password"
                placeholder="Password..."
                id="password"
                value={password}
                onChange={(e) => {
                  setPassord(e.target.value);
                }}
              />
              {password.length<8 && Accept && <p className=" error">
                Password must be more than 8 characters
              </p>}
              <label htmlFor="repassword">repassword:</label>
             
              <input
                type="password"
                placeholder="repassword..."
                id="repassword"
                value={rpassword}
                onChange={(e) => {
                  setrpassword(e.target.value);
                }}
              />
               {rpassword!==password&&Accept&&<p className="error" >
                password DoesNot Mached
                </p>}
              <div className="text-center">
              {statusError===200&&<p className="alert alert-success">Create Account Successfuly</p>}
                <button className=" button" type="submit">
                  register
                </button>
              </div>
            </form>
    </>
  )
}
